import type { HomeAssistant, LirumActionConfig, LirumBaseConfig } from './hass';
import { domainOf } from './hass';

export type GestureType = 'tap' | 'hold' | 'double_tap';

const HOLD_MS = 500;
const DOUBLE_TAP_MS = 300;

interface GestureState {
  downAt: number;
  holdTimer?: number;
  lastTap: number;
}

const DEFAULT_TAP_TOGGLE = new Set([
  'light',
  'switch',
  'fan',
  'input_boolean',
  'automation',
  'remote',
  'siren',
]);

const SVC_FOR_TOGGLE: Record<string, { domain: string; service: string }> = {
  light: { domain: 'light', service: 'toggle' },
  switch: { domain: 'switch', service: 'toggle' },
  fan: { domain: 'fan', service: 'toggle' },
  input_boolean: { domain: 'input_boolean', service: 'toggle' },
  automation: { domain: 'automation', service: 'toggle' },
  remote: { domain: 'remote', service: 'toggle' },
  cover: { domain: 'cover', service: 'toggle' },
  humidifier: { domain: 'humidifier', service: 'toggle' },
  climate: { domain: 'climate', service: 'toggle' },
  media_player: { domain: 'media_player', service: 'media_play_pause' },
  siren: { domain: 'siren', service: 'toggle' },
};

export function defaultActionFor(entity: string | undefined, gesture: GestureType): LirumActionConfig {
  if (gesture === 'tap') {
    if (!entity) return { action: 'none' };
    const d = domainOf(entity);
    if (DEFAULT_TAP_TOGGLE.has(d)) return { action: 'toggle' };
    return { action: 'more-info' };
  }
  return { action: 'more-info' };
}

export function handleLirumAction(
  element: HTMLElement,
  hass: HomeAssistant,
  config: LirumBaseConfig,
  gesture: GestureType,
): void {
  const cfgAction =
    gesture === 'hold' ? config.hold_action :
    gesture === 'double_tap' ? config.double_tap_action :
    config.tap_action;
  const action: LirumActionConfig = cfgAction ?? defaultActionFor(config.entity, gesture);
  performAction(element, hass, config.entity, action);
}

function fireMoreInfo(element: HTMLElement, entityId: string): void {
  element.dispatchEvent(
    new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }),
  );
}

function performAction(
  element: HTMLElement,
  hass: HomeAssistant,
  entity: string | undefined,
  action: LirumActionConfig,
): void {
  switch (action.action) {
    case 'none':
      return;
    case 'more-info': {
      if (!entity) return;
      fireMoreInfo(element, entity);
      return;
    }
    case 'toggle': {
      if (!entity) return;
      const d = domainOf(entity);
      const svc = SVC_FOR_TOGGLE[d];
      if (svc) hass.callService(svc.domain, svc.service, { entity_id: entity });
      else fireMoreInfo(element, entity);
      return;
    }
    case 'call-service': {
      const [domain, service] = action.service.split('.');
      if (!domain || !service) return;
      const data = { ...(action.service_data ?? {}) };
      hass.callService(domain, service, data, action.target);
      return;
    }
    case 'navigate':
      window.history.pushState(null, '', action.navigation_path);
      window.dispatchEvent(new Event('location-changed'));
      return;
    case 'url':
      window.open(action.url_path, '_blank', 'noopener,noreferrer');
      return;
    case 'assist':
      element.dispatchEvent(
        new CustomEvent('hass-action', {
          bubbles: true,
          composed: true,
          detail: { config: action, action: 'assist' },
        }),
      );
      return;
  }
}

export function bindGestures(
  el: HTMLElement,
  invoke: (gesture: GestureType) => void,
): () => void {
  const state: GestureState = { downAt: 0, lastTap: 0 };

  const onDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    state.downAt = performance.now();
    state.holdTimer = window.setTimeout(() => {
      state.holdTimer = undefined;
      invoke('hold');
      state.downAt = 0;
    }, HOLD_MS);
  };

  const onUp = (): void => {
    if (state.holdTimer) {
      window.clearTimeout(state.holdTimer);
      state.holdTimer = undefined;
    }
    if (state.downAt === 0) return;
    const elapsed = performance.now() - state.downAt;
    state.downAt = 0;
    if (elapsed >= HOLD_MS) return;
    const now = performance.now();
    if (now - state.lastTap <= DOUBLE_TAP_MS) {
      state.lastTap = 0;
      invoke('double_tap');
    } else {
      state.lastTap = now;
      window.setTimeout(() => {
        if (state.lastTap !== 0 && performance.now() - state.lastTap >= DOUBLE_TAP_MS) {
          state.lastTap = 0;
          invoke('tap');
        }
      }, DOUBLE_TAP_MS + 10);
    }
  };

  const onCancel = (): void => {
    if (state.holdTimer) window.clearTimeout(state.holdTimer);
    state.holdTimer = undefined;
    state.downAt = 0;
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onCancel);
  el.addEventListener('pointerleave', onCancel);

  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onCancel);
    el.removeEventListener('pointerleave', onCancel);
  };
}
