export interface SchemaItem {
  name: string;
  type?: 'grid' | 'expandable';
  title?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  schema?: SchemaItem[];
  icon?: string;
}

const actionSchema = (name: string, title: string): SchemaItem => ({
  name: '',
  type: 'expandable',
  title,
  schema: [
    {
      name,
      selector: {
        ui_action: {
          actions: ['more-info', 'toggle', 'navigate', 'url', 'call-service', 'assist', 'none'],
        },
      },
    },
  ],
});

export const ICON_COLOR_OPTIONS = [
  { value: 'cool', label: 'Cool (cyan→blue)' },
  { value: 'warm', label: 'Warm (orange)' },
  { value: 'energy', label: 'Energy (green)' },
  { value: 'alert', label: 'Alert (red)' },
  { value: 'rose', label: 'Rose (pink)' },
  { value: 'amber', label: 'Amber (yellow)' },
  { value: 'neutral', label: 'Neutral' },
];

export function appearanceGroup(): SchemaItem {
  return {
    name: '',
    type: 'expandable',
    title: 'Appearance',
    schema: [
      {
        name: '',
        type: 'grid',
        schema: [
          {
            name: 'layout',
            selector: { select: { mode: 'dropdown', options: [
              { value: 'default', label: 'Default' },
              { value: 'horizontal', label: 'Horizontal' },
              { value: 'vertical', label: 'Vertical' },
            ]}},
          },
          { name: 'fill_container', selector: { boolean: {} } },
        ],
      },
      {
        name: '',
        type: 'grid',
        schema: [
          {
            name: 'icon_color',
            selector: { select: { mode: 'dropdown', custom_value: true, options: ICON_COLOR_OPTIONS } },
          },
          { name: 'background', selector: { text: {} } },
        ],
      },
    ],
  };
}

export function interactionGroup(): SchemaItem {
  return {
    name: '',
    type: 'expandable',
    title: 'Interactions',
    schema: [
      actionSchema('tap_action', 'Tap behavior'),
      actionSchema('hold_action', 'Hold behavior'),
      actionSchema('double_tap_action', 'Double-tap behavior'),
    ],
  };
}

export const COMMON_LABELS: Record<string, string> = {
  entity: 'Entity',
  name: 'Custom name',
  icon: 'Icon (mdi:…)',
  icon_color: 'Icon color',
  layout: 'Layout',
  fill_container: 'Fill container',
  background: 'Background (CSS / "transparent")',
  tap_action: 'Tap action',
  hold_action: 'Hold action',
  double_tap_action: 'Double-tap action',
  title: 'Title',
  subtitle: 'Subtitle',
  alignment: 'Alignment',
};

export function entityHead(domains: string[]): SchemaItem[] {
  const entitySelector = domains.length > 0
    ? { entity: { domain: domains } }
    : { entity: {} };
  return [
    { name: 'entity', required: true, selector: entitySelector },
    {
      name: '',
      type: 'grid',
      schema: [
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
      ],
    },
  ];
}
