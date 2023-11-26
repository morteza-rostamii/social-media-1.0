
export function truncateText(text, maxChars=100) {

  if (text.length <= maxChars) return text;

  const truncated = text.substring(0, maxChars - 3);
  return truncated + '...';
}