import DOMPurify from 'dompurify';

// Links from the store description open in a new tab
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

// The description is HTML written by the store owner, so clean it before showing it
export function cleanDescription(html: string): string {
  const safeHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'h4'],
    ALLOWED_ATTR: ['href'],
  });

  // The editor adds many empty lines like <p><br></p>
  return safeHtml.replace(/<p>(\s|<br>)*<\/p>/g, '').trim();
}
