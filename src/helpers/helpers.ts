export function firstLetterUppercase(str: string) {
    const input = str.toLowerCase();

    // Get the first convert to uppercase and add it to the other part sliced from index 1
    // Use backticks to combine both together instead of a + symbol
    return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
}
