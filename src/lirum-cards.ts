import { VERSION, CARDS } from './const';

import './cards/entity/entity-card';
import './cards/switch/switch-card';
import './cards/light/light-card';
import './cards/number/number-card';
import './cards/sensor/sensor-card';
import './cards/slider/slider-card';
import './cards/cover/cover-card';
import './cards/climate/climate-card';
import './cards/fan/fan-card';
import './cards/media/media-card';
import './cards/lock/lock-card';
import './cards/person/person-card';
import './cards/select/select-card';
import './cards/vacuum/vacuum-card';
import './cards/update/update-card';
import './cards/humidifier/humidifier-card';
import './cards/alarm/alarm-card';
import './cards/button/button-card';
import './cards/chips/chips-card';
import './cards/title/title-card';
import './cards/template/template-card';
import './cards/scene/scene-card';
import './cards/script/script-card';

const count = Object.keys(CARDS).length;
const ramp = ['#1ee0ff', '#2a7bff', '#0a3aa0'];
console.info(
  `%c LIRUM %c v${VERSION} %c ${count} cards `,
  `background:${ramp[2]};color:white;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600`,
  `background:${ramp[1]};color:white;padding:2px 6px`,
  `background:${ramp[0]};color:#001020;padding:2px 6px;border-radius:0 3px 3px 0`,
);
