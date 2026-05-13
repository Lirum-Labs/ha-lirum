import { customElement, state } from 'lit/decorators.js';
import { html, nothing, type TemplateResult } from 'lit';
import { LirumCardBase } from '../../core/lirum-base';
import { CARDS } from '../../const';
import type { LirumBaseConfig } from '../../core/hass';
import '../../core/chip';
import './alarm-keypad';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description?: string; preview?: boolean; documentationURL?: string }>;
  }
}

type AlarmArmMode = 'armed_home' | 'armed_away' | 'armed_night' | 'armed_vacation';

export interface AlarmConfig extends LirumBaseConfig {
  entity: string;
  states?: Array<AlarmArmMode>;
  show_keypad?: boolean;
}

const FEATURE = {
  ARM_HOME: 1,
  ARM_AWAY: 2,
  ARM_NIGHT: 4,
  ARM_VACATION: 32,
} as const;

interface ModeDef {
  state: AlarmArmMode;
  suffix: 'home' | 'away' | 'night' | 'vacation';
  feature: number;
  icon: string;
  label: string;
}

const ALL_MODES: ModeDef[] = [
  { state: 'armed_home',     suffix: 'home',     feature: FEATURE.ARM_HOME,     icon: 'mdi:shield-home',     label: 'Home' },
  { state: 'armed_away',     suffix: 'away',     feature: FEATURE.ARM_AWAY,     icon: 'mdi:shield-lock',     label: 'Away' },
  { state: 'armed_night',    suffix: 'night',    feature: FEATURE.ARM_NIGHT,    icon: 'mdi:shield-moon',     label: 'Night' },
  { state: 'armed_vacation', suffix: 'vacation', feature: FEATURE.ARM_VACATION, icon: 'mdi:shield-airplane', label: 'Vacation' },
];

(window.customCards = window.customCards ?? []).push({
  type: CARDS.alarm.tag,
  name: CARDS.alarm.name,
  description: CARDS.alarm.desc,
  preview: true,
  documentationURL: 'https://github.com/Lirum-Labs/ha-lirum',
});

@customElement(CARDS.alarm.tag)
export class LirumAlarmCard extends LirumCardBase<AlarmConfig> {
  @state() private _pendingCode = '';

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./alarm-editor');
    return document.createElement(CARDS.alarm.editor);
  }

  public static getStubConfig(): Partial<AlarmConfig> {
    return { type: `custom:${CARDS.alarm.tag}`, entity: '' };
  }

  public setConfig(config: AlarmConfig): void {
    if (!config.entity) throw new Error('You need to define an entity');
    const next: AlarmConfig = { ...config };
    if (!next.tap_action) {
      next.tap_action = { action: 'more-info' };
    }
    super.setConfig(next);
  }

  public render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const state = this._stateObj();
    if (!state) return this._renderError(`Entity not found: ${this._config.entity}`);

    const s = state.state;
    const supported = typeof state.attributes.supported_features === 'number' ? state.attributes.supported_features : 0;
    const unavailable = this._isUnavailable();

    const iconColor =
      s === 'disarmed' ? 'neutral'
      : s === 'triggered' ? 'alert'
      : s.startsWith('armed') ? 'energy'
      : 'amber';
    const iconActive = s !== 'disarmed' && s !== 'unavailable';
    const iconPulse = s === 'pending' || s === 'arming' || s === 'triggered';

    const configStates = this._config.states;
    const modes = ALL_MODES.filter((m) => (supported & m.feature) !== 0)
      .filter((m) => !configStates || configStates.includes(m.state));

    const modeChips = modes.map((m) => html`
      <lirum-chip
        icon=${m.icon}
        label=${m.label}
        colorRamp="energy"
        ?active=${s === m.state}
        ?disabled=${unavailable}
        @click=${(): void => this._arm(m.suffix)}
      ></lirum-chip>
    `);

    const disarmChip = html`
      <lirum-chip
        icon="mdi:shield-off"
        label="Disarm"
        colorRamp="neutral"
        ?active=${s === 'disarmed'}
        ?disabled=${unavailable}
        @click=${this._disarm}
      ></lirum-chip>
    `;

    const keypad = this._config.show_keypad
      ? html`<lirum-alarm-keypad
          codeFormat="number"
          @submit=${this._onKeypadSubmit}
        ></lirum-alarm-keypad>`
      : nothing;

    const controls = html`
      <div class="lirum-chip-row">${modeChips}${disarmChip}</div>
      ${keypad}
    `;

    return this._renderTile({
      icon: this._defaultIcon(),
      iconColor,
      iconActive,
      iconPulse,
      iconUnavailable: unavailable,
      primary: this._defaultPrimary(),
      secondary: this._formattedState(),
      controls,
    });
  }

  private _onKeypadSubmit = (e: Event): void => {
    const detail = (e as CustomEvent<{ code: string }>).detail;
    this._pendingCode = detail?.code ?? '';
  };

  private _arm(suffix: 'home' | 'away' | 'night' | 'vacation'): void {
    if (!this.hass || !this._config?.entity) return;
    const data: Record<string, unknown> = { entity_id: this._config.entity };
    if (this._pendingCode) data.code = this._pendingCode;
    this.hass.callService('alarm_control_panel', `alarm_arm_${suffix}`, data);
  }

  private _disarm = (): void => {
    if (!this.hass || !this._config?.entity) return;
    const data: Record<string, unknown> = { entity_id: this._config.entity };
    if (this._pendingCode) data.code = this._pendingCode;
    this.hass.callService('alarm_control_panel', 'alarm_disarm', data);
  };
}
