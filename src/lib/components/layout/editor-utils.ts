export function getCaretOffset(element: HTMLElement): number {
	let caretOffset = 0;
	const doc = element.ownerDocument;
	const win = doc.defaultView;
	const sel = win?.getSelection();
	if (sel && sel.rangeCount > 0) {
		const range = sel.getRangeAt(0);
		const preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
	}
	return caretOffset;
}

export function setCaretOffset(element: HTMLElement, offset: number) {
	let currentOffset = 0;
	let found = false;

	function traverseNodes(node: Node) {
		if (found) return;
		if (node.nodeType === Node.TEXT_NODE) {
			const len = node.nodeValue?.length || 0;
			if (currentOffset + len >= offset) {
				const range = document.createRange();
				// Special behavior for final trailing line break:
				range.setStart(node, Math.min(offset - currentOffset, len));
				range.collapse(true);
				const sel = window.getSelection();
				sel?.removeAllRanges();
				sel?.addRange(range);
				found = true;
			} else {
				currentOffset += len;
			}
		} else {
			for (let i = 0; i < node.childNodes.length; i++) {
				traverseNodes(node.childNodes[i]);
				if (found) break;
			}
		}
	}
	traverseNodes(element);
	
	// If it reached the end without finding (e.g. trailing newlines inside empty elements)
	if (!found) {
		const sel = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(element);
		range.collapse(false);
		sel?.removeAllRanges();
		sel?.addRange(range);
	}
}

export function highlightText(text: string): string {
    // Escape HTML 
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // We style properties. Note: we don't want to replace inside already parsed HTML so we do it in a specific order, 
    // or we assume keywords are quite unique.
    
    // Comments
    const commentRgx = /(\/\/[^\n]*)/g;
    // Keywords
    const keywordRgx = /^(Presentation|Slide):[^\n]*/gm;
    // Objects
    const objectRgx = /^(Rectangle|Circle|Text)s?$/gm;
    // Properties
    const propertyRgx = /^(Id|X|Y|Color|Background|Align|Width|Height|Radius|Size|Content|Weight):/gm;

    html = html.replace(keywordRgx, '<span class="text-primary font-extrabold">$&</span>');
    html = html.replace(objectRgx, '<span class="text-secondary font-bold">$&</span>');
    html = html.replace(propertyRgx, '<span class="text-info font-bold">$&</span>');
    
    // It's a bit naive. To prevent clashing, this relies on ^ regex which matches lines correctly 
    // because we have white-space: pre-wrap in the div!
    
    // Add an invisible break if it ends with exactly a newline so that caret can be placed there
    if (html.endsWith("\n")) {
         html += "<br>";
    }
    
    return html;
}

export function getCursorCoordinates() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right };
}
