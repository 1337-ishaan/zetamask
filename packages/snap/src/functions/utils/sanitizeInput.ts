
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (inputText: string): string => {
  return DOMPurify.sanitize(inputText);
};
