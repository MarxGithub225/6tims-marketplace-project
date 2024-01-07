
export function removeUnnecessaryHTMLStuff(text: string): string {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    return doc.body.textContent || "";
}

export const config = {
    default_auth_pic: require('../assets/images/avt-1.jpg')
}