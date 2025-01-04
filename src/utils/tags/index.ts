import { extractKeywords } from './keywords';
import { normalizeTag } from './normalize';

export function extractTags(content: string): string[] {
  // Extract hashtags from content
  const hashtagPattern = /#[\w\u0590-\u05ff]+/g;
  const hashtags = content.match(hashtagPattern) || [];
  
  // Extract keywords that could be tags
  const keywords = extractKeywords(content);
  
  // Combine and normalize tags
  const combinedTags = [...hashtags, ...keywords]
    .map(tag => normalizeTag(tag))
    .filter(Boolean);
  
  // Remove duplicates
  return [...new Set(combinedTags)];
}