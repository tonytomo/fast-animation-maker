<script lang="ts">
	import {
		code,
		codeEditor,
		loadFromLocalStorage,
		saveToLocalStorage
	} from '$lib/stores/code.store';
	import { workspace } from '$lib/stores/workspace.store';
	import { onMount } from 'svelte';
	import FileCode from '@lucide/svelte/icons/file-code';
	import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
	import PanelLeftOpen from '@lucide/svelte/icons/panel-left-open';
	import { getCaretOffset, setCaretOffset, highlightText, getCursorCoordinates } from './editor-utils';

	let show = $state(true);
	let debounce: NodeJS.Timeout;

	// IntelliSense State
	let showAutocomplete = $state(false);
	let autocompleteX = $state(0);
	let autocompleteY = $state(0);
	let autocompleteIndex = $state(0);
	let autocompleteSearch = $state("");

	const ALL_SUGGESTIONS = [
		'Id:', 'X:', 'Y:', 'Color:', 'Background:', 'Align:', 'Width:', 'Height:', 'Radius:', 'Size:', 'Content:', 'Weight:'
	];
	let filteredSuggestions = $state(ALL_SUGGESTIONS);

	onMount(() => {
		const storedCode = loadFromLocalStorage();
        updateEditorContent(storedCode);
		code.set(storedCode);
	});
    
    function updateEditorContent(text: string) {
        if ($codeEditor) {
            $codeEditor.innerHTML = highlightText(text);
        }
    }

	function onkeydown(event: KeyboardEvent) {
		const isInput = event.target instanceof HTMLElement && (event.target.isContentEditable || event.target.tagName === 'INPUT');

		// Toggle handler
		if (event.key === '\\') {
			if (event.ctrlKey || event.metaKey || !isInput) {
				event.preventDefault();
				toggle();
                return;
			}
		}
        
        // Autocomplete interactions
        if (showAutocomplete) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                autocompleteIndex = (autocompleteIndex + 1) % filteredSuggestions.length;
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                autocompleteIndex = (autocompleteIndex - 1 + filteredSuggestions.length) % filteredSuggestions.length;
                return;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                event.preventDefault();
                applyAutocomplete(filteredSuggestions[autocompleteIndex]);
                return;
            }
            if (event.key === 'Escape') {
                showAutocomplete = false;
                return;
            }
        }
        
        // Prevent native Enter behavior and insert standard linebreak
        if (event.key === 'Enter' && !showAutocomplete && $codeEditor && document.activeElement === $codeEditor) {
            event.preventDefault();
            document.execCommand('insertLineBreak');
        }
	}

	function oninput(e: Event) {
		clearTimeout(debounce);
        
        const target = e.target as HTMLElement;
        const text = target.innerText;

        // IntelliSense Context Check
        handleIntellisense(target);

		debounce = setTimeout(() => {
			code.set(text);
			saveToLocalStorage(text);
            
            // Format
            const caret = getCaretOffset(target);
            updateEditorContent(text);
            setCaretOffset(target, caret);
		}, 300);
	}
    
    function handleIntellisense(el: HTMLElement) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            showAutocomplete = false;
            return;
        }

        const offset = getCaretOffset(el);
        const text = el.innerText;
        
        // Find current word under cursor looking backwards
        const textBeforeCaret = text.substring(0, offset);
        const lastNewLine = textBeforeCaret.lastIndexOf('\n');
        const currentLine = textBeforeCaret.substring(lastNewLine + 1);
        
        const wordMatch = currentLine.match(/([a-zA-Z]*)$/);
        const currentWord = wordMatch ? wordMatch[1] : "";
        
        if (currentWord.length > 0) {
            // Check if matches our suggestions
            filteredSuggestions = ALL_SUGGESTIONS.filter(s => s.toLowerCase().startsWith(currentWord.toLowerCase()));
            
            // If the only suggestion is already typed exactly, hide
            if (filteredSuggestions.length === 1 && filteredSuggestions[0].toLowerCase() === currentWord.toLowerCase() + ":") {
                 showAutocomplete = false;
                 return;
            }

            if (filteredSuggestions.length > 0) {
                autocompleteSearch = currentWord;
                autocompleteIndex = 0;
                showAutocomplete = true;
                
                const coords = getCursorCoordinates();
                if (coords) {
                    autocompleteX = coords.left;
                    autocompleteY = coords.bottom + 4;
                }
            } else {
                showAutocomplete = false;
            }
        } else {
            showAutocomplete = false;
        }
    }
    
    function applyAutocomplete(suggestion: string) {
        if (!$codeEditor) return;
        showAutocomplete = false;
        
        const offset = getCaretOffset($codeEditor);
        const text = $codeEditor.innerText;
        
        const textBefore = text.substring(0, offset - autocompleteSearch.length);
        const textAfter = text.substring(offset);
        
        const newText = textBefore + suggestion + " " + textAfter;
        const targetOffset = offset - autocompleteSearch.length + suggestion.length + 1;
        
        code.set(newText);
        saveToLocalStorage(newText);
        updateEditorContent(newText);
        setCaretOffset($codeEditor, targetOffset);
    }

	function toggle() {
		show = !show;

		if (show) {
			setTimeout(() => {
				if ($codeEditor) $codeEditor.focus();
			}, 10);
		}
	}
    
    function handlePaste(e: ClipboardEvent) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertText', false, text);
    }

</script>

<svelte:window {onkeydown} />

{#if !$workspace.fullscreen}
	<div
		class="relative z-10 flex h-full flex-col border-r border-base-300 bg-base-100 transition-all duration-300 ease-in-out"
		class:w-full={show}
		class:w-0={!show}
		class:md:max-w-md={show}
		class:overflow-hidden={!show}
	>
		<!-- Header -->
		<div
			class="flex h-12 w-full items-center justify-between border-b border-base-300 bg-base-100 px-4"
			class:opacity-0={!show}
		>
			<div class="flex items-center gap-2 text-sm font-bold text-base-content/70">
				<FileCode size={16} />
				<span>SCRIPT</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd font-mono text-xs kbd-sm">Ctrl + \</kbd>
				<button class="btn btn-square btn-ghost btn-xs" onclick={toggle}>
					<PanelLeftClose size={16} />
				</button>
			</div>
		</div>

		<!-- Editor Area -->
		<div class="relative flex-1 bg-base-100 p-0 overflow-auto">
			<div class="absolute min-h-full w-full">
				<div
                    contenteditable={show ? "true" : "false"}
					bind:this={$codeEditor}
					{oninput}
                    onpaste={handlePaste}
					class="size-full bg-transparent p-4 font-mono text-sm leading-6 focus:outline-none whitespace-pre-wrap outline-none"
					spellcheck="false"
				></div>
			</div>
		</div>
	</div>

	<!-- Collapsed Toggle Button -->
	{#if !show}
		<button
			onclick={toggle}
			class="btn absolute top-3 left-4 z-50 btn-circle shadow-lg btn-sm btn-primary"
			title="Open Editor (Ctrl + \)"
		>
			<PanelLeftOpen size={16} />
		</button>
	{/if}
{/if}

{#if showAutocomplete && show}
    <ul
        class="fixed z-50 menu bg-base-200 w-56 rounded-box shadow-xl border border-base-300 py-2 top-0 left-0"
        style="transform: translate({autocompleteX}px, {autocompleteY}px);"
    >
        {#each filteredSuggestions as suggestion, i}
             <li>
                 <button 
                     class:active={i === autocompleteIndex} 
                     onclick={(e) => { e.preventDefault(); applyAutocomplete(suggestion); }}
                 >
                     {suggestion}
                 </button>
             </li>
        {/each}
    </ul>
{/if}
