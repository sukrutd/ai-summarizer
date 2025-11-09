export function formatFileNameAsTitle(fileName: string): string {
    // without extension
    const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

    // replace hyphens and underscores with spaces
    const withSpaces = withoutExtension.replace(/[-_]+/g, ' ');

    // capitalize first letter of each word
    const title = withSpaces.replace(/\b\w/g, (char) => char.toUpperCase()).trim();

    return title;
}
