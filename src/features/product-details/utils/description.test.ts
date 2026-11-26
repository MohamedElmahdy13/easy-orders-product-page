import { describe, expect, it } from 'vitest';
import { cleanDescription } from './description';

describe('cleanDescription', () => {
  it('removes scripts and event handlers', () => {
    const html = '<p onclick="alert(1)">Hello</p><script>alert(1)</script><img src="x" onerror="alert(1)">';
    expect(cleanDescription(html)).toBe('<p>Hello</p>');
  });

  it('removes javascript links', () => {
    expect(cleanDescription('<a href="javascript:alert(1)">click</a>')).not.toContain('javascript:');
  });

  it('keeps basic formatting and lists', () => {
    const html = '<ul><li>Leather</li></ul><p><strong>Shipping</strong></p>';
    expect(cleanDescription(html)).toBe(html);
  });

  it('removes empty paragraphs', () => {
    expect(cleanDescription('<p>One</p><p><br></p><p><br></p><p>Two</p>')).toBe('<p>One</p><p>Two</p>');
  });

  it('opens links in a new tab safely', () => {
    const result = cleanDescription('<a href="https://example.com">link</a>');
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it('returns an empty string for an empty description', () => {
    expect(cleanDescription('<p><br></p>')).toBe('');
  });
});
