export function normalizeTag(tag: string): string {
  // Remove # if present
  tag = tag.replace(/^#/, '');
  
  // Convert to lowercase
  tag = tag.toLowerCase();
  
  // Remove special characters and spaces
  tag = tag.replace(/[^\w\u0590-\u05ff]/g, '');
  
  // Ensure tag is not empty and has minimum length
  return tag.length >= 2 ? tag : '';
}