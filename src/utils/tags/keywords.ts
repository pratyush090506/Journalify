// Common emotional and mental health related keywords
const commonKeywords = [
  'anxiety',
  'depression',
  'stress',
  'meditation',
  'exercise',
  'therapy',
  'sleep',
  'work',
  'family',
  'relationships'
];

export function extractKeywords(content: string): string[] {
  return commonKeywords.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  );
}