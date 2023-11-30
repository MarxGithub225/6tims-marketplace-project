
export function removeUnnecessaryHTMLStuff(text: string): string {
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");
    return doc.body.textContent || "";
}

export const config = {
    default_auth_pic: require('../assets/images/avt-1.jpg'),
    terms_and_conditions: require('../assets/docs/terms-and-conditions.pdf'),
    shipping_and_returns: require('../assets/docs/shipping-and-retourns.pdf'),
    cookies: require('../assets/docs/cookies.pdf'),
    terms_of_sale: require('../assets/docs/terms-of-sale.pdf')
}