export function escapedString(originalString?: string) {
    return originalString?.trim().replace(/[.*+?^${}()"|]/g, '\\$&')
}