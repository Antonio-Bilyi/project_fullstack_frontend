export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  // Стрілка зелена, текст жовтий
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

/**
 * Truncates a string to a maximum length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 143)
 * @returns Truncated string with "..." appended if it exceeds maxLength
 */
export function truncateText(text: string, maxLength: number = 143): string {
    if (text.length <= maxLength) {
        return text;
    }

    return text.slice(0, maxLength) + '...';
}
