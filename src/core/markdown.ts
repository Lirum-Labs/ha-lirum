import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * Minimal markdown renderer. Supports headings, bold/italic, inline code,
 * code blocks, lists, links, and paragraphs. Strict whitelist — does NOT
 * permit raw HTML. Returns HTML for use with `unsafeHTML` directive.
 *
 * This is intentionally tiny; if richer markdown is needed later, swap in
 * `marked` or `markdown-it` and gate behind dynamic import to keep the bundle
 * small for users who don't use markdown.
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(line: string): string {
  // Escape first, then re-apply our limited inline markers.
  let s = escapeHtml(line);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|\W)\*([^*]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}

export function renderMarkdown(src: string): string {
  const lines = src.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let inUL = false;
  let inOL = false;
  let paragraph: string[] = [];

  const flushParagraph = (): void => {
    if (paragraph.length > 0) {
      out.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const closeLists = (): void => {
    if (inUL) { out.push('</ul>'); inUL = false; }
    if (inOL) { out.push('</ol>'); inOL = false; }
  };

  for (const line of lines) {
    if (line.match(/^```/)) {
      flushParagraph();
      closeLists();
      if (!inCode) {
        inCode = true;
        codeBuf = [];
      } else {
        out.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
        inCode = false;
      }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushParagraph();
      closeLists();
      const n = h[1].length;
      out.push(`<h${n}>${renderInline(h[2])}</h${n}>`);
      continue;
    }
    const ul = line.match(/^\s*[-*]\s+(.+)$/);
    if (ul) {
      flushParagraph();
      if (inOL) { out.push('</ol>'); inOL = false; }
      if (!inUL) { out.push('<ul>'); inUL = true; }
      out.push(`<li>${renderInline(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ol) {
      flushParagraph();
      if (inUL) { out.push('</ul>'); inUL = false; }
      if (!inOL) { out.push('<ol>'); inOL = true; }
      out.push(`<li>${renderInline(ol[1])}</li>`);
      continue;
    }
    if (line.trim() === '') {
      flushParagraph();
      closeLists();
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  closeLists();
  if (inCode) {
    out.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
  }
  return out.join('');
}

@customElement('lirum-markdown')
export class LirumMarkdown extends LitElement {
  @property() content = '';

  protected render(): TemplateResult {
    return html`<div class="md">${unsafeHTML(renderMarkdown(this.content))}</div>`;
  }

  static styles = css`
    :host { display: block; }
    .md {
      color: var(--lirum-text, #eef3ff);
      font-size: 13px;
      line-height: 1.55;
    }
    .md h1, .md h2, .md h3, .md h4 {
      margin: 0.6em 0 0.3em;
      font-weight: 600;
      letter-spacing: -0.3px;
      background: linear-gradient(90deg, #1ee0ff, #2a7bff);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .md h1 { font-size: 18px; }
    .md h2 { font-size: 16px; }
    .md h3 { font-size: 14px; }
    .md h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
    .md p { margin: 0.4em 0; }
    .md ul, .md ol { margin: 0.4em 0; padding-left: 1.4em; }
    .md li { margin: 0.15em 0; }
    .md a {
      color: var(--lirum-c1, #1ee0ff);
      text-decoration: none;
      border-bottom: 1px dashed color-mix(in oklab, currentColor 30%, transparent);
    }
    .md a:hover { border-bottom-style: solid; }
    .md code {
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
      font-size: 12px;
      background: rgba(127, 127, 127, 0.14);
      padding: 1px 5px;
      border-radius: 4px;
    }
    .md pre {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      border-radius: 8px;
      padding: 8px 10px;
      overflow-x: auto;
    }
    .md pre code {
      background: transparent;
      padding: 0;
      font-size: 11.5px;
    }
    .md strong { color: var(--lirum-text, #eef3ff); }
    .md em { color: color-mix(in oklab, currentColor 80%, transparent); font-style: italic; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-markdown': LirumMarkdown;
  }
}
