import { LitElement, html, nothing, type TemplateResult, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HomeAssistant, LirumBaseConfig, HassEntity } from './hass';
import { entityName, entityIcon, isUnavailable, stateActive } from './hass';
import { defaultIconFor } from './icons';
import { backgroundVars, rampVars } from './tokens';
import { bindGestures, handleLirumAction, type GestureType } from './actions';
import { lirumCardFrame, lirumLayouts, lirumKeyframes } from './styles';
import './icon-display';

export abstract class LirumCardBase<TConfig extends LirumBaseConfig = LirumBaseConfig> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: TConfig;
  private _unbindGestures?: () => void;
  private _gestureRoot?: HTMLElement;

  public setConfig(config: TConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unbindGestures?.();
    this._unbindGestures = undefined;
    this._gestureRoot = undefined;
  }

  protected updated(_changed: PropertyValues): void {
    const root = this.renderRoot.querySelector<HTMLElement>('.lirum-gesture-root');
    if (root && root !== this._gestureRoot) {
      this._unbindGestures?.();
      this._gestureRoot = root;
      this._unbindGestures = bindGestures(root, (g) => this._invokeAction(g));
    }
  }

  private _invokeAction(gesture: GestureType): void {
    if (!this.hass || !this._config) return;
    handleLirumAction(this, this.hass, this._config, gesture);
  }

  protected _stateObj(entity?: string): HassEntity | undefined {
    const id = entity ?? this._config?.entity;
    if (!id || !this.hass) return undefined;
    return this.hass.states[id];
  }

  protected _renderError(msg: string): TemplateResult {
    return html`<ha-card><div class="error">${msg}</div></ha-card>`;
  }

  /**
   * Standard tile layout: icon + name + secondary. Subclasses pass any
   * trailing widget (slider, chip row) via `controls` to render below the
   * tile, separated by a divider.
   */
  protected _renderTile(opts: {
    icon?: string;
    iconColor?: string;
    iconActive?: boolean;
    iconUnavailable?: boolean;
    iconPulse?: boolean;
    iconSpin?: boolean;
    iconSpinDuration?: number;
    iconPicture?: string;
    primary: string;
    secondary?: string;
    trailing?: TemplateResult;
    controls?: TemplateResult;
  }): TemplateResult {
    const layout = this._config?.layout ?? 'default';
    const fill = this._config?.fill_container ? 'fill' : '';
    const effectiveRamp = opts.iconColor ?? this._config?.icon_color ?? 'cool';
    const cssVars = { ...backgroundVars(this._config?.background), ...rampVars(effectiveRamp) };
    return html`
      <ha-card style=${styleMap(cssVars)}>
        <div class="lirum-gesture-root ${fill}">
          <div class="lirum-tile ${layout}">
            ${opts.icon || opts.iconPicture
              ? html`<lirum-icon
                  class="icon"
                  .icon=${opts.icon ?? ''}
                  .picture=${opts.iconPicture ?? ''}
                  .colorRamp=${opts.iconColor ?? this._config?.icon_color ?? 'cool'}
                  .active=${opts.iconActive ?? false}
                  .unavailable=${opts.iconUnavailable ?? false}
                  .pulse=${opts.iconPulse ?? false}
                  .spin=${opts.iconSpin ?? false}
                  .spinDuration=${opts.iconSpinDuration ?? 2}
                ></lirum-icon>`
              : nothing}
            <div class="label lirum-name">${opts.primary}</div>
            ${opts.secondary
              ? html`<div class="secondary lirum-state">${opts.secondary}</div>`
              : nothing}
            ${opts.trailing ? html`<div class="trailing">${opts.trailing}</div>` : nothing}
            ${opts.controls ? html`<div class="lirum-controls">${opts.controls}</div>` : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  protected _defaultPrimary(): string {
    if (!this._config) return '';
    return entityName(this._config.entity ?? '', this._stateObj(), this._config.name);
  }

  protected _defaultIcon(): string {
    return entityIcon(this._stateObj(), this._config?.icon) ?? defaultIconFor(this._stateObj(), this._config?.entity);
  }

  protected _isActive(): boolean {
    return stateActive(this._stateObj());
  }

  protected _isUnavailable(): boolean {
    return isUnavailable(this._stateObj());
  }

  protected _formattedState(): string {
    const s = this._stateObj();
    if (!s) return '';
    if (this.hass?.formatEntityState) return this.hass.formatEntityState(s);
    return s.state;
  }

  abstract render(): TemplateResult | typeof nothing;

  static styles = [lirumCardFrame, lirumLayouts, lirumKeyframes];
}
