
export function removeUnnecessaryHTMLStuff(text: string): string {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    return doc.body.textContent || "";
}