import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type Key = { value: string; kind: 'digit' | 'backspace' | 'submit' };

const KEYS: Key[] = [
  { value: '1', kind: 'digit' },
  { value: '2', kind: 'digit' },
  { value: '3', kind: 'digit' },
  { value: '4', kind: 'digit' },
  { value: '5', kind: 'digit' },
  { value: '6', kind: 'digit' },
  { value: '7', kind: 'digit' },
  { value: '8', kind: 'digit' },
  { value: '9', kind: 'digit' },
  { value: 'backspace', kind: 'backspace' },
  { value: '0', kind: 'digit' },
  { value: 'submit', kind: 'submit' },
];

const MAX_LEN = 8;

@customElement('lirum-alarm-keypad')
export class LirumAlarmKeypad extends LitElement {
  @property() codeFormat: 'number' | 'text' = 'number';
  @state() private _code = '';

  protected render(): TemplateResult {
    const masked = '•'.repeat(this._code.length);
    return html`
      <div class="display" aria-live="polite">${masked || html`<span class="placeholder">enter code</span>`}</div>
      <div class="grid">
        ${KEYS.map((k) => this._renderKey(k))}
      </div>
    `;
  }

  private _renderKey(k: Key): TemplateResult {
    if (k.kind === 'backspace') {
      return html`<button class="key glyph" @click=${this._onBackspace} aria-label="Backspace">
        <ha-icon icon="mdi:backspace-outline"></ha-icon>
      </button>`;
    }
    if (k.kind === 'submit') {
      return html`<button class="key glyph submit" @click=${this._onSubmit} aria-label="Submit">
        <ha-icon icon="mdi:check"></ha-icon>
      </button>`;
    }
    return html`<button class="key" @click=${(): void => this._onDigit(k.value)}>${k.value}</button>`;
  }

  private _onDigit(d: string): void {
    if (this._code.length >= MAX_LEN) return;
    this._code = this._code + d;
  }

  private _onBackspace = (): void => {
    if (!this._code) return;
    this._code = this._code.slice(0, -1);
  };

  private _onSubmit = (): void => {
    const code = this._code;
    this.dispatchEvent(
      new CustomEvent('submit', { detail: { code }, bubbles: true, composed: true }),
    );
    this._code = '';
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .display {
      min-height: 28px;
      padding: 8px 12px;
      margin-bottom: 8px;
      border-radius: 10px;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      color: var(--lirum-text, #eef3ff);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 18px;
      letter-spacing: 4px;
      text-align: center;
    }
    .display .placeholder {
      color: color-mix(in oklab, currentColor 50%, transparent);
      letter-spacing: normal;
      font-size: 13px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .key {
      appearance: none;
      border: 1px solid color-mix(in oklab, currentColor 12%, transparent);
      background: linear-gradient(135deg,
        color-mix(in oklab, #1ee0ff 8%, transparent),
        color-mix(in oklab, #2a7bff 6%, transparent));
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 18px;
      font-weight: 600;
      height: 44px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s, transform 0.05s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .key:hover {
      background: linear-gradient(135deg,
        color-mix(in oklab, #1ee0ff 16%, transparent),
        color-mix(in oklab, #2a7bff 12%, transparent));
      box-shadow: 0 0 0 1px color-mix(in oklab, #1ee0ff 30%, transparent),
        0 0 12px color-mix(in oklab, #1ee0ff 18%, transparent);
    }
    .key:active {
      transform: translateY(1px);
    }
    .key.glyph ha-icon {
      --mdc-icon-size: 22px;
    }
    .key.submit {
      background: linear-gradient(135deg,
        color-mix(in oklab, #1eeb8f 22%, transparent),
        color-mix(in oklab, #00ad5b 16%, transparent));
      border-color: color-mix(in oklab, #1eeb8f 45%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, #1eeb8f 30%, transparent),
        0 0 14px color-mix(in oklab, #1eeb8f 22%, transparent);
    }
    .key.submit:hover {
      box-shadow: 0 0 0 1px color-mix(in oklab, #1eeb8f 50%, transparent),
        0 0 18px color-mix(in oklab, #1eeb8f 30%, transparent);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'lirum-alarm-keypad': LirumAlarmKeypad;
  }
}
