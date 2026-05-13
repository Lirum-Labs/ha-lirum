!function(){"use strict";const t={entity:{tag:"lirum-entity-card",editor:"lirum-entity-card-editor",name:"Lirum Entity",desc:"Universal entity card."},switch:{tag:"lirum-switch-card",editor:"lirum-switch-card-editor",name:"Lirum Switch",desc:"Toggleable switch / boolean."},light:{tag:"lirum-light-card",editor:"lirum-light-card-editor",name:"Lirum Light",desc:"Brightness, color temp, and color control."},number:{tag:"lirum-number-card",editor:"lirum-number-card-editor",name:"Lirum Number",desc:"input_number / number slider."},sensor:{tag:"lirum-sensor-card",editor:"lirum-sensor-card-editor",name:"Lirum Sensor",desc:"Sensor / binary_sensor with device-class formatting and optional sparkline."},slider:{tag:"lirum-slider-card",editor:"lirum-slider-card-editor",name:"Lirum Slider",desc:"Generic value slider."},cover:{tag:"lirum-cover-card",editor:"lirum-cover-card-editor",name:"Lirum Cover",desc:"Blinds, garage doors, shades."},climate:{tag:"lirum-climate-card",editor:"lirum-climate-card-editor",name:"Lirum Climate",desc:"Thermostat / HVAC."},fan:{tag:"lirum-fan-card",editor:"lirum-fan-card-editor",name:"Lirum Fan",desc:"Fan speed and oscillation."},media:{tag:"lirum-media-card",editor:"lirum-media-card-editor",name:"Lirum Media",desc:"Media player."},lock:{tag:"lirum-lock-card",editor:"lirum-lock-card-editor",name:"Lirum Lock",desc:"Locks and unlock."},person:{tag:"lirum-person-card",editor:"lirum-person-card-editor",name:"Lirum Person",desc:"Person presence."},select:{tag:"lirum-select-card",editor:"lirum-select-card-editor",name:"Lirum Select",desc:"select / input_select."},vacuum:{tag:"lirum-vacuum-card",editor:"lirum-vacuum-card-editor",name:"Lirum Vacuum",desc:"Vacuum cleaner."},update:{tag:"lirum-update-card",editor:"lirum-update-card-editor",name:"Lirum Update",desc:"Available updates."},humidifier:{tag:"lirum-humidifier-card",editor:"lirum-humidifier-card-editor",name:"Lirum Humidifier",desc:"Humidity control."},alarm:{tag:"lirum-alarm-card",editor:"lirum-alarm-card-editor",name:"Lirum Alarm",desc:"Alarm panel with keypad."},button:{tag:"lirum-button-card",editor:"lirum-button-card-editor",name:"Lirum Button",desc:"Single-press button entity or custom action."},chips:{tag:"lirum-chips-card",editor:"lirum-chips-card-editor",name:"Lirum Chips",desc:"Pill row of mini-entities."},title:{tag:"lirum-title-card",editor:"lirum-title-card-editor",name:"Lirum Title",desc:"Section header."},template:{tag:"lirum-template-card",editor:"lirum-template-card-editor",name:"Lirum Template",desc:"Free-form template card."},scene:{tag:"lirum-scene-card",editor:"lirum-scene-card-editor",name:"Lirum Scene",desc:"One-tap scene activation tile."},script:{tag:"lirum-script-card",editor:"lirum-script-card-editor",name:"Lirum Script",desc:"Run a script with running-state feedback."},camera:{tag:"lirum-camera-card",editor:"lirum-camera-card-editor",name:"Lirum Camera",desc:"Camera snapshot with glow frame."},weather:{tag:"lirum-weather-card",editor:"lirum-weather-card-editor",name:"Lirum Weather",desc:"Current conditions plus forecast strip."},gauge:{tag:"lirum-gauge-card",editor:"lirum-gauge-card-editor",name:"Lirum Gauge",desc:"Radial gauge for any numeric sensor."},tile:{tag:"lirum-tile-card",editor:"lirum-tile-card-editor",name:"Lirum Tile",desc:"Compact KPI tile with big number and label."},stack:{tag:"lirum-stack-card",editor:"lirum-stack-card-editor",name:"Lirum Stack",desc:"Vertical or horizontal stack of cards."},grid:{tag:"lirum-grid-card",editor:"lirum-grid-card-editor",name:"Lirum Grid",desc:"Uniform-column grid of cards."},conditional:{tag:"lirum-conditional-card",editor:"lirum-conditional-card-editor",name:"Lirum Conditional",desc:"Show inner cards only when conditions match."},markdown:{tag:"lirum-markdown-card",editor:"lirum-markdown-card-editor",name:"Lirum Markdown",desc:"Rendered markdown content (headings, lists, links, code)."}};function e(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const i=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},o=globalThis,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new a(i,t,n)},l=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,b=_?_.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!d(t,e),x={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=o.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const n=r.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const n=this.constructor;if(!1===o&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[y("elementProperties")]=new Map,k[y("finalized")]=new Map,v?.({ReactiveElement:k}),(f.reactiveElementVersions??=[]).push("2.1.2");const C={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},E=(t=C,e,i)=>{const{kind:o,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function L(t){return(e,i)=>"object"==typeof i?E(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function S(t){return L({...t,state:!0,attribute:!1})}const A=globalThis,P=t=>t,z=A.trustedTypes,T=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,R="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+U,O=`<${M}>`,j=document,N=()=>j.createComment(""),B=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,D="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,V=/>/g,W=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,q=/"/g,G=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),J=K(1),Z=K(2),X=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),tt=new WeakMap,et=j.createTreeWalker(j,129);function it(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const ot=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(s.lastIndex=d,c=s.exec(i),null!==c);)d=s.lastIndex,s===H?"!--"===c[1]?s=F:void 0!==c[1]?s=V:void 0!==c[2]?(G.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=W):void 0!==c[3]&&(s=W):s===W?">"===c[0]?(s=r??H,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?W:'"'===c[3]?q:Y):s===q||s===Y?s=W:s===F||s===V?s=H:(s=W,r=void 0);const h=s===W&&t[e+1].startsWith("/>")?" ":"";n+=s===H?i+O:l>=0?(o.push(a),i.slice(0,l)+R+i.slice(l)+U+h):i+U+(-2===l?e:h)}return[it(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class rt{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,a=this.parts,[c,l]=ot(t,e);if(this.el=rt.createElement(c,i),et.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=et.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(R)){const e=l[n++],i=o.getAttribute(t).split(U),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?lt:"?"===s[1]?dt:"@"===s[1]?ht:ct}),o.removeAttribute(t)}else t.startsWith(U)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(G.test(o.tagName)){const t=o.textContent.split(U),e=t.length-1;if(e>0){o.textContent=z?z.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],N()),et.nextNode(),a.push({type:2,index:++r});o.append(t[e],N())}}}else if(8===o.nodeType)if(o.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(U,t+1));)a.push({type:7,index:r}),t+=U.length-1}r++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function nt(t,e,i=t,o){if(e===X)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const n=B(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=nt(t,r._$AS(t,e.values),r,o)),e}class st{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??j).importNode(e,!0);et.currentNode=o;let r=et.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new at(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ut(r,this,t)),this._$AV.push(e),a=i[++s]}n!==a?.index&&(r=et.nextNode(),n++)}return et.currentNode=j,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class at{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),B(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==X&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=rt.createElement(it(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new st(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=tt.get(t.strings);return void 0===e&&tt.set(t.strings,e=new rt(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new at(this.O(N()),this.O(N()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=P(t).nextSibling;P(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ct{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=nt(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==X,n&&(this._$AH=t);else{const o=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=nt(this,o[i+s],e,s),a===X&&(a=this._$AH[s]),n||=!B(a)||a!==this._$AH[s],a===Q?t=Q:t!==Q&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}n&&!o&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class lt extends ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class dt extends ct{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class ht extends ct{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??Q)===X)return;const i=this._$AH,o=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Q&&(i===Q||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ut{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const pt=A.litHtmlPolyfillSupport;pt?.(rt,at),(A.litHtmlVersions??=[]).push("3.3.2");const mt=globalThis;let gt=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new at(e.insertBefore(N(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return X}};gt._$litElement$=!0,gt.finalized=!0,mt.litElementHydrateSupport?.({LitElement:gt});const ft=mt.litElementPolyfillSupport;ft?.({LitElement:gt}),(mt.litElementVersions??=[]).push("4.2.2");const _t=1,bt=2,vt=t=>(...e)=>({_$litDirective$:t,values:e});let yt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const $t="important",wt=" !"+$t,xt=vt(class extends yt{constructor(t){if(super(t),t.type!==_t||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return null==o?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const o=e[t];if(null!=o){this.ft.add(t);const e="string"==typeof o&&o.endsWith(wt);t.includes("-")||e?i.setProperty(t,e?o.slice(0,-11):o,e?$t:""):i[t]=o}}return X}});function kt(t){return t.split(".")[0]??""}function Ct(t){if(!t)return!1;const e=t.state;if("unavailable"===e||"unknown"===e)return!1;switch(kt(t.entity_id)){case"climate":return"off"!==e;case"cover":return"open"===e||"opening"===e||"closing"===e;case"media_player":return"off"!==e&&"idle"!==e&&"standby"!==e;case"vacuum":return"docked"!==e&&"off"!==e;case"plant":return"problem"===e;case"lock":return"locked"!==e;case"alarm_control_panel":return"disarmed"!==e;case"person":case"device_tracker":return"home"===e;case"humidifier":case"fan":case"light":case"switch":case"input_boolean":case"binary_sensor":case"automation":case"group":case"remote":case"siren":case"water_heater":return"on"===e||"home"===e||"open"===e||"true"===e;default:return"off"!==e&&"closed"!==e&&"no"!==e&&"false"!==e}}function Et(t,e){const i=t?.attributes.supported_features;return"number"==typeof i&&0!==(i&e)}function Lt(t,e){return"transparent"!==t&&"theme"!==t||"string"!=typeof e.type?e:e.type.startsWith("custom:lirum-")?void 0!==e.background?e:{...e,background:t}:e}const St={alarm_control_panel:"mdi:shield-home",automation:"mdi:robot",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",camera:"mdi:video",climate:"mdi:thermostat",cover:"mdi:window-shutter",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",humidifier:"mdi:air-humidifier",input_boolean:"mdi:toggle-switch",input_button:"mdi:gesture-tap-button",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",light:"mdi:lightbulb",lock:"mdi:lock",media_player:"mdi:cast",number:"mdi:ray-vertex",person:"mdi:account",plant:"mdi:flower",remote:"mdi:remote",scene:"mdi:palette",script:"mdi:script-text",select:"mdi:format-list-bulleted",sensor:"mdi:eye",siren:"mdi:bullhorn",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer-outline",update:"mdi:package-down",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weather:"mdi:weather-partly-cloudy",zone:"mdi:map-marker-radius"};function At(t,e){if(!t&&!e)return"mdi:bookmark-outline";const i=kt(t?.entity_id??e);return function(t,e){const i=e?.state;switch(t){case"cover":return"closed"===i?"mdi:window-shutter":"opening"===i?"mdi:arrow-up-box":"closing"===i?"mdi:arrow-down-box":"mdi:window-shutter-open";case"lock":return"locked"===i?"mdi:lock":"mdi:lock-open-variant";case"alarm_control_panel":switch(i){case"disarmed":return"mdi:shield-off";case"armed_home":return"mdi:shield-home";case"armed_away":return"mdi:shield-lock";case"armed_night":return"mdi:shield-moon";case"armed_vacation":return"mdi:shield-airplane";case"pending":case"arming":return"mdi:shield-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:shield"}case"media_player":return"playing"===i?"mdi:play":"paused"===i?"mdi:pause":"idle"===i||"standby"===i?"mdi:speaker":"off"===i?"mdi:speaker-off":"mdi:cast";case"vacuum":return"cleaning"===i?"mdi:robot-vacuum-variant":"returning"===i?"mdi:home-import-outline":"docked"===i?"mdi:robot-vacuum":"mdi:robot-vacuum-alert";case"switch":return Ct(e)?"mdi:flash":"mdi:flash-off";case"light":return Ct(e)?"mdi:lightbulb-on":"mdi:lightbulb-outline";case"fan":return Ct(e)?"mdi:fan":"mdi:fan-off";case"humidifier":return Ct(e)?"mdi:air-humidifier":"mdi:air-humidifier-off"}}(i,t)??St[i]??"mdi:bookmark-outline"}const Pt={cool:{c1:"#1ee0ff",c2:"#2a7bff",c3:"#0a3aa0"},warm:{c1:"#ff8a3d",c2:"#ff6b1c",c3:"#c44a05"},energy:{c1:"#3df0a8",c2:"#16c47e",c3:"#0a7d4f"},alert:{c1:"#ff5670",c2:"#e11d48",c3:"#7a0a1f"},rose:{c1:"#ff9ae0",c2:"#ec4899",c3:"#831843"},amber:{c1:"#ffc83d",c2:"#f59e0b",c3:"#b45309"},neutral:{c1:"#94a3b8",c2:"#64748b",c3:"#1e293b"}},zt="radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%), linear-gradient(180deg, #0b1326, #060a14)";function Tt(t){return t?t in Pt?Pt[t]:{c1:t,c2:t,c3:t}:Pt.cool}function Rt(t){const e=(t??"").trim(),i=0===e.length?zt:e,o="transparent"===i.toLowerCase()||"theme"===i.toLowerCase();return{"--lirum-bg":o?"transparent":i,"--lirum-text":o?"var(--primary-text-color, #eef3ff)":"#eef3ff","--lirum-muted":o?"var(--secondary-text-color, #6b7894)":"#6b7894","--lirum-card-border":o?"var(--ha-card-border-color, var(--divider-color, rgba(0,0,0,0.12)))":"color-mix(in oklab, currentColor 12%, transparent)"}}function Ut(t){const e=Tt(t);return{"--lirum-c1":e.c1,"--lirum-c2":e.c2,"--lirum-c3":e.c3}}const Mt=new Set(["light","switch","fan","input_boolean","automation","remote","siren"]),Ot={light:{domain:"light",service:"toggle"},switch:{domain:"switch",service:"toggle"},fan:{domain:"fan",service:"toggle"},input_boolean:{domain:"input_boolean",service:"toggle"},automation:{domain:"automation",service:"toggle"},remote:{domain:"remote",service:"toggle"},cover:{domain:"cover",service:"toggle"},humidifier:{domain:"humidifier",service:"toggle"},climate:{domain:"climate",service:"toggle"},media_player:{domain:"media_player",service:"media_play_pause"},siren:{domain:"siren",service:"toggle"}};function jt(t,e,i,o){const r=("hold"===o?i.hold_action:"double_tap"===o?i.double_tap_action:i.tap_action)??function(t,e){if("tap"===e){if(!t)return{action:"none"};const e=kt(t);return Mt.has(e)?{action:"toggle"}:{action:"more-info"}}return{action:"more-info"}}(i.entity,o);!function(t,e,i,o){switch(o.action){case"none":return;case"more-info":if(!i)return;return void Nt(t,i);case"toggle":{if(!i)return;const o=kt(i),r=Ot[o];return void(r?e.callService(r.domain,r.service,{entity_id:i}):Nt(t,i))}case"call-service":{const[t,i]=o.service.split(".");if(!t||!i)return;const r={...o.service_data??{}};return void e.callService(t,i,r,o.target)}case"navigate":return window.history.pushState(null,"",o.navigation_path),void window.dispatchEvent(new Event("location-changed"));case"url":return void window.open(o.url_path,"_blank","noopener,noreferrer");case"assist":t.dispatchEvent(new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:o,action:"assist"}}))}}(t,e,i.entity,r)}function Nt(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}const Bt=c`
  :host {
    --lirum-bg: radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%),
      linear-gradient(180deg, #0b1326, #060a14);
    --lirum-text: #eef3ff;
    --lirum-muted: #6b7894;
    --lirum-card-border: color-mix(in oklab, currentColor 12%, transparent);
    --lirum-radius: var(--ha-card-border-radius, 16px);
    --lirum-c1: #1ee0ff;
    --lirum-c2: #2a7bff;
    --lirum-c3: #0a3aa0;
    display: block;
  }

  ha-card {
    /* "Instrument panel" card frame:
       1. Vertical surface wash (lighter navy → deeper navy)
       2. Layered shadows: inner top highlight, hairline border, ambient drop, tight contact
       3. ::before — faint ramp-tinted backdrop (top-right + bottom-left radial)
       4. ::after — top accent hairline that fades in from both sides */
    background: var(--lirum-bg);
    color: var(--lirum-text);
    border-radius: var(--lirum-radius);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.04) inset,
      0 0 0 1px var(--lirum-card-border),
      0 20px 50px -20px rgba(0, 0, 0, 0.7),
      0 2px 10px -2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    position: relative;
    isolation: isolate;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  /* Hover lift — translateY + ramp-tinted halo. Disabled in reduced-motion. */
  ha-card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 0 0 1px color-mix(in oklab, var(--lirum-c1) 22%, transparent),
      0 30px 60px -22px rgba(0, 0, 0, 0.75),
      0 0 40px -16px color-mix(in oklab, var(--lirum-c1) 42%, transparent);
  }

  /* ::before — device-class tint backdrop. Top-right wash + bottom-left bloom. */
  ha-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(120% 80% at 100% 0%,
        color-mix(in oklab, var(--lirum-c1) 6%, transparent),
        transparent 55%),
      radial-gradient(60% 100% at 0% 100%,
        color-mix(in oklab, var(--lirum-c2) 5%, transparent),
        transparent 60%);
  }

  /* ::after — top accent hairline that softly fades in from the edges */
  ha-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 14px;
    right: 14px;
    height: 1px;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(90deg,
      transparent,
      color-mix(in oklab, var(--lirum-c1) 50%, transparent),
      transparent);
  }

  /* Direct content sits above the backdrop / hairline */
  ha-card > * {
    position: relative;
    z-index: 2;
  }

  .error {
    padding: 14px 16px;
    color: var(--error-color, #db4437);
    font-size: 13px;
  }

  .lirum-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--lirum-text);
    letter-spacing: -0.2px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lirum-state {
    font-size: 12px;
    color: var(--lirum-muted);
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .lirum-anim {
      animation: none !important;
      transition: none !important;
    }
    ha-card {
      transition: none !important;
    }
    ha-card:hover {
      transform: none !important;
    }
  }
`,It=c`
  .lirum-tile {
    padding: 12px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 6px;
    align-items: center;
  }

  .lirum-tile .icon {
    grid-row: 1 / span 2;
    align-self: center;
  }

  .lirum-tile .label {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
  }

  .lirum-tile .secondary {
    grid-column: 2;
    grid-row: 2;
    min-width: 0;
  }

  .lirum-tile .trailing {
    grid-column: 3;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .lirum-tile.horizontal {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: start;
    text-align: left;
  }

  .lirum-tile.horizontal .icon {
    grid-row: 1;
    grid-column: 1;
    margin-bottom: 4px;
  }

  .lirum-tile.horizontal .label,
  .lirum-tile.horizontal .secondary {
    grid-column: 1;
  }

  .lirum-tile.vertical {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    justify-items: center;
    text-align: center;
  }

  .lirum-tile.vertical .icon {
    grid-row: 1;
    grid-column: 1;
  }

  .lirum-tile.vertical .label {
    grid-column: 1;
    grid-row: 2;
  }

  .lirum-tile.vertical .secondary {
    grid-column: 1;
    grid-row: 3;
  }

  .lirum-controls {
    grid-column: 1 / -1;
    padding: 8px 12px 12px;
    border-top: 1px solid color-mix(in oklab, currentColor 6%, transparent);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lirum-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
`,Dt=c`
  @keyframes lirum-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.5; transform: scale(0.85); }
  }
  @keyframes lirum-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes lirum-shimmer {
    0%, 100% { opacity: 0.85; }
    50%      { opacity: 1; }
  }
  @keyframes lirum-glow-pulse {
    0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1, #1ee0ff) 50%, transparent)); }
    50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1, #1ee0ff) 80%, transparent)); }
  }
`;let Ht=class extends gt{constructor(){super(...arguments),this.icon="mdi:bookmark-outline",this.colorRamp="cool",this.active=!1,this.unavailable=!1,this.pulse=!1,this.spin=!1,this.spinDuration=2,this.intensity=1,this.picture=""}render(){const t=Tt(this.colorRamp),e=Math.max(0,Math.min(1,this.intensity)),i=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};--halo:${e};--spin-dur:${this.spinDuration}s`;return J`
      <div
        class="wrap ${this.active?"active":""} ${this.unavailable?"unavail":""} ${this.pulse?"pulse lirum-anim":""} ${this.spin?"spin lirum-anim":""}"
        style=${i}
      >
        <div class="glow"></div>
        ${this.picture?J`<img src=${this.picture} alt="" />`:J`<ha-icon icon=${this.icon}></ha-icon>`}
      </div>
    `}static{this.styles=c`
    :host {
      display: inline-block;
      --size: 40px;
    }
    .wrap {
      position: relative;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 8%, transparent);
      transition: background 0.4s, border-color 0.4s;
      overflow: hidden;
    }
    .wrap.active {
      background: linear-gradient(
        135deg,
        color-mix(in oklab, var(--c1) 25%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 35%, transparent);
    }
    .wrap.unavail {
      opacity: 0.5;
      border-style: dashed;
    }
    .glow {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        color-mix(in oklab, var(--c1) calc(70% * var(--halo, 1)), transparent) 0%,
        color-mix(in oklab, var(--c2) calc(40% * var(--halo, 1)), transparent) 45%,
        transparent 80%
      );
      filter: blur(4px);
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
    }
    .wrap.active .glow {
      opacity: 1;
    }
    ha-icon {
      --mdc-icon-size: calc(var(--size) * 0.55);
      color: var(--lirum-text, #eef3ff);
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 50%, transparent));
      transition: color 0.4s, filter 0.4s;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .wrap.unavail ha-icon {
      filter: none;
      color: var(--lirum-muted, #6b7894);
    }
    .pulse ha-icon {
      animation: lirum-glow-pulse 2.4s ease-in-out infinite;
    }
    .spin ha-icon {
      animation: lirum-icon-spin var(--spin-dur, 2s) linear infinite;
      transform-origin: 50% 50%;
    }
    @keyframes lirum-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1) 50%, transparent)); }
      50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1) 80%, transparent)); }
    }
    @keyframes lirum-icon-spin {
      to { transform: rotate(360deg); }
    }
  `}};e([L()],Ht.prototype,"icon",void 0),e([L()],Ht.prototype,"colorRamp",void 0),e([L({type:Boolean})],Ht.prototype,"active",void 0),e([L({type:Boolean})],Ht.prototype,"unavailable",void 0),e([L({type:Boolean})],Ht.prototype,"pulse",void 0),e([L({type:Boolean})],Ht.prototype,"spin",void 0),e([L({type:Number})],Ht.prototype,"spinDuration",void 0),e([L({type:Number})],Ht.prototype,"intensity",void 0),e([L()],Ht.prototype,"picture",void 0),Ht=e([i("lirum-icon")],Ht);class Ft extends gt{setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t}getCardSize(){return 1}disconnectedCallback(){super.disconnectedCallback(),this._unbindGestures?.(),this._unbindGestures=void 0,this._gestureRoot=void 0}updated(t){const e=this.renderRoot.querySelector(".lirum-gesture-root");e&&e!==this._gestureRoot&&(this._unbindGestures?.(),this._gestureRoot=e,this._unbindGestures=function(t,e){const i={downAt:0,lastTap:0},o=t=>{0!==t.button&&"mouse"===t.pointerType||(i.downAt=performance.now(),i.holdTimer=window.setTimeout(()=>{i.holdTimer=void 0,e("hold"),i.downAt=0},500))},r=()=>{if(i.holdTimer&&(window.clearTimeout(i.holdTimer),i.holdTimer=void 0),0===i.downAt)return;const t=performance.now()-i.downAt;if(i.downAt=0,t>=500)return;const o=performance.now();o-i.lastTap<=300?(i.lastTap=0,e("double_tap")):(i.lastTap=o,window.setTimeout(()=>{0!==i.lastTap&&performance.now()-i.lastTap>=300&&(i.lastTap=0,e("tap"))},310))},n=()=>{i.holdTimer&&window.clearTimeout(i.holdTimer),i.holdTimer=void 0,i.downAt=0};return t.addEventListener("pointerdown",o),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",n),t.addEventListener("pointerleave",n),()=>{t.removeEventListener("pointerdown",o),t.removeEventListener("pointerup",r),t.removeEventListener("pointercancel",n),t.removeEventListener("pointerleave",n)}}(e,t=>this._invokeAction(t)))}_invokeAction(t){this.hass&&this._config&&jt(this,this.hass,this._config,t)}_stateObj(t){const e=t??this._config?.entity;if(e&&this.hass)return this.hass.states[e]}_renderError(t){return J`<ha-card><div class="error">${t}</div></ha-card>`}_renderTile(t){const e=this._config?.layout??"default",i=this._config?.fill_container?"fill":"",o=t.iconColor??this._config?.icon_color??"cool",r={...Rt(this._config?.background),...Ut(o)};return J`
      <ha-card style=${xt(r)}>
        <div class="lirum-gesture-root ${i}">
          <div class="lirum-tile ${e}">
            ${t.icon||t.iconPicture?J`<lirum-icon
                  class="icon"
                  .icon=${t.icon??""}
                  .picture=${t.iconPicture??""}
                  .colorRamp=${t.iconColor??this._config?.icon_color??"cool"}
                  .active=${t.iconActive??!1}
                  .unavailable=${t.iconUnavailable??!1}
                  .pulse=${t.iconPulse??!1}
                  .spin=${t.iconSpin??!1}
                  .spinDuration=${t.iconSpinDuration??2}
                ></lirum-icon>`:Q}
            <div class="label lirum-name">${t.primary}</div>
            ${t.secondary?J`<div class="secondary lirum-state">${t.secondary}</div>`:Q}
            ${t.trailing?J`<div class="trailing">${t.trailing}</div>`:Q}
            ${t.controls?J`<div class="lirum-controls">${t.controls}</div>`:Q}
          </div>
        </div>
      </ha-card>
    `}_defaultPrimary(){return this._config?(t=this._config.entity??"",e=this._stateObj(),this._config.name||e?.attributes.friendly_name||t):"";var t,e}_defaultIcon(){return t=this._stateObj(),e=this._config?.icon,e??t?.attributes.icon??At(this._stateObj(),this._config?.entity);var t,e}_isActive(){return Ct(this._stateObj())}_isUnavailable(){return!(t=this._stateObj())||"unavailable"===t.state||"unknown"===t.state;var t}_formattedState(){const t=this._stateObj();return t?this.hass?.formatEntityState?this.hass.formatEntityState(t):t.state:""}static{this.styles=[Bt,It,Dt]}}e([L({attribute:!1})],Ft.prototype,"hass",void 0),e([S()],Ft.prototype,"_config",void 0),(window.customCards=window.customCards??[]).push({type:t.entity.tag,name:t.entity.name,description:t.entity.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Vt=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return _i}),document.createElement(t.entity.editor)}static getStubConfig(){return{type:`custom:${t.entity.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;return this._stateObj()?this._renderTile({icon:this._defaultIcon(),iconActive:this._isActive(),iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:this._formattedState()}):this._renderError(`Entity not found: ${this._config.entity}`)}};Vt=e([i(t.entity.tag)],Vt),(window.customCards=window.customCards??[]).push({type:t.switch.tag,name:t.switch.name,description:t.switch.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Wt=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return yi}),document.createElement(t.switch.editor)}static getStubConfig(){return{type:`custom:${t.switch.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;if(!this._stateObj())return this._renderError(`Entity not found: ${this._config.entity}`);const t=this._isActive();return this._renderTile({icon:this._defaultIcon(),iconColor:t?"amber":"neutral",iconActive:t,iconUnavailable:this._isUnavailable(),iconPulse:t,primary:this._defaultPrimary(),secondary:this._formattedState()})}};Wt=e([i(t.switch.tag)],Wt);let Yt=class extends gt{constructor(){super(...arguments),this.icon="",this.label="",this.colorRamp="cool",this.active=!1,this.disabled=!1}render(){const t=Tt(this.colorRamp),e=`--c1:${t.c1};--c2:${t.c2}`;return J`
      <button
        class="chip ${this.active?"active":""}"
        ?disabled=${this.disabled}
        style=${e}
      >
        ${this.icon?J`<ha-icon icon=${this.icon}></ha-icon>`:""}
        ${this.label?J`<span>${this.label}</span>`:""}
      </button>
    `}static{this.styles=c`
    :host { display: inline-block; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 6%, transparent);
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .chip:hover:not(:disabled) {
      background: color-mix(in oklab, currentColor 10%, transparent);
    }
    .chip.active {
      background: linear-gradient(135deg,
        color-mix(in oklab, var(--c1) 22%, transparent),
        color-mix(in oklab, var(--c2) 18%, transparent));
      border-color: color-mix(in oklab, var(--c1) 50%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, var(--c1) 30%, transparent),
        0 0 12px color-mix(in oklab, var(--c1) 25%, transparent);
      color: white;
    }
    .chip:disabled { opacity: 0.5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 16px; }
  `}};e([L()],Yt.prototype,"icon",void 0),e([L()],Yt.prototype,"label",void 0),e([L()],Yt.prototype,"colorRamp",void 0),e([L({type:Boolean})],Yt.prototype,"active",void 0),e([L({type:Boolean})],Yt.prototype,"disabled",void 0),Yt=e([i("lirum-chip")],Yt);const qt=(t,e,i)=>Math.max(e,Math.min(i,t));function Gt(t,e,i,o){const r=(o-90)*Math.PI/180;return[t+i*Math.cos(r),e+i*Math.sin(r)]}function Kt(t,e,i,o,r){const[n,s]=Gt(t,e,i,o),[a,c]=Gt(t,e,i,r);return`M ${n} ${s} A ${i} ${i} 0 ${r-o>180?1:0} 1 ${a} ${c}`}let Jt=class extends gt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.colorRamp="cool",this.disabled=!1,this.showValue=!1,this.unit="",this._dragging=!1,this._displayValue=0}updated(){this._dragging||(this._displayValue=this.value)}render(){const t=Tt(this.colorRamp),e=Math.max(1,this.max-this.min),i=this._dragging?this._displayValue:this.value,o=qt((i-this.min)/e,0,1),r=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};--pct:${o}`;return J`
      <div class="root ${this.disabled?"disabled":""}" style=${r}>
        <div
          class="track"
          @pointerdown=${this._down}
          @pointermove=${this._move}
          @pointerup=${this._up}
          @pointercancel=${this._up}
        >
          <div class="fill"></div>
          <div class="cap"></div>
        </div>
        ${this.showValue?J`<div class="value">${this._format(o*e+this.min)}<span class="unit">${this.unit}</span></div>`:""}
      </div>
    `}_format(t){if(this.step>=1)return Math.round(t).toLocaleString();const e=Math.max(0,Math.min(4,Math.ceil(-Math.log10(this.step))));return t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}_down(t){if(this.disabled)return;t.preventDefault();const e=t.currentTarget;this._trackEl=e,e.setPointerCapture(t.pointerId),this._dragging=!0,this._updateFromEvent(t)}_move(t){this._dragging&&this._updateFromEvent(t)}_up(t){if(!this._dragging)return;this._dragging=!1;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this.dispatchEvent(new CustomEvent("change",{detail:{value:this._displayValue},bubbles:!0,composed:!0}))}_updateFromEvent(t){if(!this._trackEl)return;const e=this._trackEl.getBoundingClientRect(),i=qt((t.clientX-e.left)/e.width,0,1),o=this.min+i*(this.max-this.min),r=Math.round(o/this.step)*this.step;this._displayValue=qt(r,this.min,this.max),this.dispatchEvent(new CustomEvent("input",{detail:{value:this._displayValue},bubbles:!0,composed:!0}))}static{this.styles=c`
    :host { display: block; }
    .root { display: flex; align-items: center; gap: 12px; }
    .root.disabled { opacity: 0.5; pointer-events: none; }
    .track {
      position: relative;
      flex: 1;
      height: 10px;
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 10%, transparent);
      overflow: hidden;
      touch-action: none;
      cursor: pointer;
    }
    .fill {
      position: absolute;
      inset: 0;
      width: calc(var(--pct, 0) * 100%);
      background: linear-gradient(90deg, var(--c1), var(--c2));
      border-radius: 999px;
      box-shadow:
        0 0 8px color-mix(in oklab, var(--c1) 60%, transparent),
        0 0 16px color-mix(in oklab, var(--c2) 35%, transparent);
      transition: width 0.05s linear;
    }
    .cap {
      position: absolute;
      left: calc(var(--pct, 0) * 100%);
      top: 50%;
      width: 14px;
      height: 14px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--c1);
      border: 2px solid rgba(0,0,0,0.5);
      box-shadow: 0 0 10px var(--c1);
    }
    .value {
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      min-width: 3.5em;
      text-align: right;
    }
    .value .unit {
      font-size: 11px;
      margin-left: 2px;
      color: color-mix(in oklab, currentColor 60%, transparent);
    }
  `}};e([L({type:Number})],Jt.prototype,"value",void 0),e([L({type:Number})],Jt.prototype,"min",void 0),e([L({type:Number})],Jt.prototype,"max",void 0),e([L({type:Number})],Jt.prototype,"step",void 0),e([L()],Jt.prototype,"colorRamp",void 0),e([L({type:Boolean})],Jt.prototype,"disabled",void 0),e([L({type:Boolean})],Jt.prototype,"showValue",void 0),e([L()],Jt.prototype,"unit",void 0),e([S()],Jt.prototype,"_dragging",void 0),e([S()],Jt.prototype,"_displayValue",void 0),Jt=e([i("lirum-slider")],Jt);let Zt=class extends gt{constructor(){super(...arguments),this.entity="",this.showBrightness=!1,this.showColorTemp=!1,this.showColor=!1,this._dragging=!1,this._onBrightnessChange=t=>{this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,brightness_pct:t.detail.value})},this._onColorTempChange=t=>{this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,color_temp_kelvin:t.detail.value})},this._onWheelPointerDown=t=>{t.preventDefault();const e=t.currentTarget;this._wheelEl=e,e.setPointerCapture(t.pointerId),this._dragging=!0,this._dragPoint=this._pointFromEvent(t)},this._onWheelPointerMove=t=>{this._dragging&&(this._dragPoint=this._pointFromEvent(t))},this._onWheelPointerUp=t=>{if(!this._dragging)return;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId);const i=this._dragPoint;this._dragging=!1,this._dragPoint=void 0,this._wheelEl=void 0,i&&this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,hs_color:[i.hue,100*i.saturation]})}}render(){if(!this.hass||!this.entity)return Q;const t=this.hass.states[this.entity];if(!t)return Q;const e=t.attributes,i="number"==typeof e.brightness?e.brightness:0,o=Math.round(i/255*100),r="number"==typeof e.min_color_temp_kelvin?e.min_color_temp_kelvin:2200,n="number"==typeof e.max_color_temp_kelvin?e.max_color_temp_kelvin:6500,s="number"==typeof e.color_temp_kelvin?e.color_temp_kelvin:r,a=Array.isArray(e.rgb_color)?e.rgb_color:void 0,c=this._dragging&&this._dragPoint?this._dragPoint:this._rgbToHs(a);return J`
      ${this.showBrightness?J`
            <div class="row">
              <div class="row-label">Brightness</div>
              <lirum-slider
                .value=${o}
                .min=${0}
                .max=${100}
                .step=${1}
                .unit=${"%"}
                .showValue=${!0}
                colorRamp="amber"
                @change=${this._onBrightnessChange}
              ></lirum-slider>
            </div>
          `:Q}
      ${this.showColorTemp?J`
            <div class="row">
              <div class="row-label">Color temperature</div>
              <div
                class="ct-slider-wrap"
                style="background:linear-gradient(90deg,#ffb070,#ffffff,#b5d7ff);"
              >
                <lirum-slider
                  .value=${s}
                  .min=${r}
                  .max=${n}
                  .step=${50}
                  .unit=${"K"}
                  .showValue=${!0}
                  colorRamp="warm"
                  @change=${this._onColorTempChange}
                ></lirum-slider>
              </div>
            </div>
          `:Q}
      ${this.showColor?J`
            <div class="row">
              <div class="row-label">Color</div>
              ${this._renderColorWheel(c)}
            </div>
          `:Q}
    `}_renderColorWheel(t){const e=160,i=80,o=t?t.hue*Math.PI/180:0,r=t?72*qt(t.saturation,0,1):0,n=i+Math.cos(o)*r,s=i+Math.sin(o)*r,a=t?`hsl(${t.hue}, ${Math.round(100*t.saturation)}%, 50%)`:"#ffffff";return J`
      <svg
        class="wheel"
        width=${e}
        height=${e}
        viewBox="0 0 ${e} ${e}"
        @pointerdown=${this._onWheelPointerDown}
        @pointermove=${this._onWheelPointerMove}
        @pointerup=${this._onWheelPointerUp}
        @pointercancel=${this._onWheelPointerUp}
      >
        <defs>
          <radialGradient id="lirum-sat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="white" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
        </defs>
        <foreignObject x="0" y="0" width=${e} height=${e}>
          <div
            class="wheel-disc"
            style="background:conic-gradient(from 0deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));"
          ></div>
        </foreignObject>
        <circle cx=${i} cy=${i} r=${i} fill="url(#lirum-sat)" pointer-events="none"></circle>
        <circle
          class="knob"
          cx=${n}
          cy=${s}
          r="9"
          fill=${a}
          stroke="rgba(0,0,0,0.55)"
          stroke-width="2"
          pointer-events="none"
        ></circle>
      </svg>
    `}_rgbToHs(t){if(!t)return;const[e,i,o]=t.map(t=>t/255),r=Math.max(e,i,o),n=r-Math.min(e,i,o);let s=0;0!==n&&(s=r===e?(i-o)/n%6:r===i?(o-e)/n+2:(e-i)/n+4,s*=60,s<0&&(s+=360));return{hue:s,saturation:0===r?0:n/r}}_pointFromEvent(t){const e=(this._wheelEl??t.currentTarget).getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,r=t.clientX-i,n=t.clientY-o,s=e.width/2-8,a=Math.sqrt(r*r+n*n),c=qt(a/Math.max(1,s),0,1);let l=180*Math.atan2(n,r)/Math.PI;return l<0&&(l+=360),{hue:l,saturation:c}}static{this.styles=c`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .row-label {
      font-size: 11px;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      font-weight: 600;
    }
    .ct-slider-wrap {
      border-radius: 999px;
      padding: 2px 4px;
    }
    .wheel {
      display: block;
      touch-action: none;
      cursor: crosshair;
      align-self: center;
      border-radius: 50%;
      box-shadow:
        0 0 0 1px color-mix(in oklab, currentColor 14%, transparent),
        0 6px 18px rgba(0, 0, 0, 0.35);
    }
    .wheel-disc {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .knob {
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
    }
  `}};e([L({attribute:!1})],Zt.prototype,"hass",void 0),e([L()],Zt.prototype,"entity",void 0),e([L({type:Boolean})],Zt.prototype,"showBrightness",void 0),e([L({type:Boolean})],Zt.prototype,"showColorTemp",void 0),e([L({type:Boolean})],Zt.prototype,"showColor",void 0),e([S()],Zt.prototype,"_dragging",void 0),e([S()],Zt.prototype,"_dragPoint",void 0),Zt=e([i("lirum-light-controls")],Zt);const Xt=["brightness","rgb","rgbw","rgbww","xy","hs","color_temp"],Qt=["rgb","rgbw","rgbww","xy","hs"];(window.customCards=window.customCards??[]).push({type:t.light.tag,name:t.light.name,description:t.light.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let te=class extends Ft{constructor(){super(...arguments),this._expanded=!1,this._toggleExpanded=t=>{t.stopPropagation(),this._expanded=!this._expanded}}static async getConfigElement(){return await Promise.resolve().then(function(){return ki}),document.createElement(t.light.editor)}static getStubConfig(){return{type:`custom:${t.light.tag}`,entity:"",show_brightness_control:!0}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.brightness?t.attributes.brightness:0,o=Math.round(i/255*100),r=Array.isArray(t.attributes.rgb_color)?t.attributes.rgb_color:void 0,n=Array.isArray(t.attributes.supported_color_modes)?t.attributes.supported_color_modes:[],s={brightness:n.some(t=>Xt.includes(t)),colorTemp:n.includes("color_temp"),color:n.some(t=>Qt.includes(t))},a=(this._config.show_brightness_control??!1)&&s.brightness,c=(this._config.show_color_temp_control??!1)&&s.colorTemp,l=(this._config.show_color_control??!1)&&s.color,d=a||c||l,h=!0===this._config.collapsible_controls,u=d&&e&&(!h||this._expanded);let p,m;if(this._config.use_light_color&&e&&r){p=(r[0]+r[1]+r[2])/3>128?"warm":"rose"}else p=e?"amber":"neutral";m=e&&i>0?`${o}%`:e?"On":"Off";const g=h&&d?J`<lirum-chip
          .icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}
          ?disabled=${this._isUnavailable()}
          @click=${this._toggleExpanded}
        ></lirum-chip>`:void 0,f=u?J`<lirum-light-controls
          .hass=${this.hass}
          .entity=${this._config.entity}
          .showBrightness=${a}
          .showColorTemp=${c}
          .showColor=${l}
        ></lirum-light-controls>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:p,iconActive:e,iconUnavailable:this._isUnavailable(),iconPulse:e,primary:this._defaultPrimary(),secondary:m,trailing:g,controls:f})}};e([S()],te.prototype,"_expanded",void 0),te=e([i(t.light.tag)],te),(window.customCards=window.customCards??[]).push({type:t.number.tag,name:t.number.name,description:t.number.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ee=class extends Ft{constructor(){super(...arguments),this._onChange=t=>{if(!this.hass||!this._config?.entity)return;const e=this._config.entity,i="input_number"===kt(e)?"input_number":"number";this.hass.callService(i,"set_value",{entity_id:e,value:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Li}),document.createElement(t.number.editor)}static getStubConfig(){return{type:`custom:${t.number.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="number"==typeof t.attributes.min?t.attributes.min:0,i="number"==typeof t.attributes.max?t.attributes.max:100,o="number"==typeof t.attributes.step?t.attributes.step:1,r="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"",n=Number(t.state)||0,s=r?`${n} ${r}`:`${n}`,a=J`
      <lirum-slider
        .value=${n}
        .min=${e}
        .max=${i}
        .step=${o}
        .unit=${r}
        .showValue=${!0}
        colorRamp="cool"
        @change=${this._onChange}
      ></lirum-slider>
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!1,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:s,controls:a})}};ee=e([i(t.number.tag)],ee);let ie=0,oe=class extends gt{constructor(){super(...arguments),this.points=[],this.colorRamp="cool",this.width=300,this.height=30,this.showBaseline=!0,this.showTip=!0,this._instanceId=++ie}render(){const t=Tt(this.colorRamp),e=this.width,i=this.height,o=this.points;if(o.length<2)return J`<svg viewBox="0 0 ${e} ${i}" preserveAspectRatio="none"></svg>`;let r=1/0,n=-1/0;for(const t of o)t<r&&(r=t),t>n&&(n=t);r===n&&(r-=1,n+=1);const s=i-4,a=e/(o.length-1),c=t=>s-qt((t-r)/(n-r),0,1)*(s-3);let l=`M 0 ${c(o[0]).toFixed(2)}`;for(let t=1;t<o.length;t++){const e=t*a,i=c(o[t]);l+=` L ${e.toFixed(2)} ${i.toFixed(2)}`}const d=e,h=c(o[o.length-1]),u=`${l} L ${d} ${i} L 0 ${i} Z`,p=`sk-line-${this._instanceId}`,m=`sk-area-${this._instanceId}`;return J`
      <svg viewBox="0 0 ${e} ${i}" preserveAspectRatio="none" style="--c1:${t.c1};--c2:${t.c2};--c3:${t.c3}">
        <defs>
          <linearGradient id=${p} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color=${t.c3} />
            <stop offset="55%"  stop-color=${t.c2} />
            <stop offset="100%" stop-color=${t.c1} />
          </linearGradient>
          <linearGradient id=${m} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color=${t.c1} stop-opacity="0.32" />
            <stop offset="100%" stop-color=${t.c1} stop-opacity="0" />
          </linearGradient>
        </defs>
        ${this.showBaseline?Z`<line class="baseline" x1="0" y1=${i-1} x2=${e} y2=${i-1} />`:""}
        ${Z`<path class="area" d=${u} fill=${`url(#${m})`} />`}
        ${Z`<path class="line" d=${l} stroke=${`url(#${p})`} />`}
        ${this.showTip?Z`<circle class="tip-halo" cx=${d} cy=${h} r="4" />
                <circle class="tip"      cx=${d} cy=${h} r="2" fill=${t.c1} />`:""}
      </svg>
    `}static{this.styles=c`
    :host { display: block; line-height: 0; }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .baseline {
      stroke: color-mix(in oklab, currentColor 10%, transparent);
      stroke-width: 1;
      stroke-dasharray: 2 3;
    }
    .area {
      fill-opacity: 1;
    }
    .line {
      fill: none;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 55%, transparent));
    }
    .tip-halo {
      fill: color-mix(in oklab, var(--c1) 60%, transparent);
      filter: blur(2px);
    }
    .tip {
      filter: drop-shadow(0 0 4px var(--c1));
    }
  `}};e([L({type:Array})],oe.prototype,"points",void 0),e([L()],oe.prototype,"colorRamp",void 0),e([L({type:Number})],oe.prototype,"width",void 0),e([L({type:Number})],oe.prototype,"height",void 0),e([L({type:Boolean})],oe.prototype,"showBaseline",void 0),e([L({type:Boolean})],oe.prototype,"showTip",void 0),oe=e([i("lirum-spark")],oe);let re=class extends gt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.colorRamp="cool",this.striped=!1,this.thickness=6}render(){const t=Tt(this.colorRamp),e=Math.max(1,this.max-this.min),i=qt((this.value-this.min)/e,0,1),o=`--c1:${t.c1};--c2:${t.c2};--pct:${i};--thick:${this.thickness}px`;return J`
      <div class="track ${this.striped?"striped":""}" style=${o}>
        <div class="fill"></div>
      </div>
    `}static{this.styles=c`
    :host { display: block; }
    .track {
      position: relative;
      width: 100%;
      height: var(--thick, 6px);
      border-radius: 999px;
      background: color-mix(in oklab, currentColor 10%, transparent);
      overflow: hidden;
    }
    .fill {
      position: absolute;
      inset: 0;
      width: calc(var(--pct, 0) * 100%);
      background: linear-gradient(90deg, var(--c1), var(--c2));
      border-radius: 999px;
      box-shadow:
        0 0 6px color-mix(in oklab, var(--c1) 60%, transparent),
        0 0 12px color-mix(in oklab, var(--c2) 30%, transparent);
      transition: width 0.4s ease-out;
    }
    .striped .fill {
      background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.18) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.18) 50%,
        rgba(255, 255, 255, 0.18) 75%,
        transparent 75%
      );
      background-size: 12px 12px;
    }
  `}};e([L({type:Number})],re.prototype,"value",void 0),e([L({type:Number})],re.prototype,"min",void 0),e([L({type:Number})],re.prototype,"max",void 0),e([L()],re.prototype,"colorRamp",void 0),e([L({type:Boolean})],re.prototype,"striped",void 0),e([L({type:Number})],re.prototype,"thickness",void 0),re=e([i("lirum-bar")],re),(window.customCards=window.customCards??[]).push({type:t.sensor.tag,name:t.sensor.name,description:t.sensor.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const ne={temperature:"mdi:thermometer",humidity:"mdi:water-percent",battery:"mdi:battery",power:"mdi:flash",energy:"mdi:lightning-bolt",signal_strength:"mdi:wifi",illuminance:"mdi:brightness-5",pressure:"mdi:gauge",voltage:"mdi:sine-wave",current:"mdi:current-ac"};let se=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return zi}),document.createElement(t.sensor.editor)}static getStubConfig(){return{type:`custom:${t.sensor.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="binary_sensor"===kt(t.entity_id),i=t.state,o="string"==typeof t.attributes.device_class?t.attributes.device_class:void 0,r="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"",n=this._config.decimals??("temperature"===o?1:"humidity"===o?0:1),s=Number(i),a=!e&&""!==i&&"unknown"!==i&&"unavailable"!==i&&Number.isFinite(s);let c;c=e?"on"===i?"On":"off"===i?"Off":i:a?r?`${s.toFixed(n)} ${r}`:s.toFixed(n):r?`${i} ${r}`:i;const l=this._colorRamp(o,r,a?s:void 0),d=this._defaultIcon(),h=this._config.icon?d:o&&ne[o]||d,u=e?"on"===i:"unavailable"!==i,p=this._isUnavailable(),m=a&&("battery"===o||"%"===r),g=this._config.show_bar&&m,f=this._config.show_trend&&Array.isArray(this._config.trend_points)&&this._config.trend_points.length>=2;let _;if(g||f){const t=g?J`<lirum-bar
            .value=${s}
            .min=${0}
            .max=${100}
            .colorRamp=${l}
          ></lirum-bar>`:Q,e=f?J`<lirum-spark
            .points=${this._config.trend_points}
            .colorRamp=${l}
          ></lirum-spark>`:Q;_=J`${t}${e}`}return this._renderTile({icon:h,iconColor:l,iconActive:u,iconUnavailable:p,primary:this._defaultPrimary(),secondary:c,controls:_})}_colorRamp(t,e,i){switch(t){case"temperature":return void 0===i?"cool":i>25?"warm":i<18?"cool":"neutral";case"humidity":return"rose";case"battery":return void 0===i?"energy":i<20?"alert":i<40?"amber":"energy";case"power":case"energy":case"illuminance":return"amber";case"signal_strength":case"pressure":default:return"cool";case"voltage":case"current":return"energy"}}};se=e([i(t.sensor.tag)],se),(window.customCards=window.customCards??[]).push({type:t.slider.tag,name:t.slider.name,description:t.slider.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ae=class extends Ft{constructor(){super(...arguments),this._onChange=t=>{if(!this.hass||!this._config?.entity||!this._config.service)return;const[e,i]=this._config.service.split(".");if(!e||!i)return;const o=this._config.service_key??"value";this.hass.callService(e,i,{entity_id:this._config.entity,[o]:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Mi}),document.createElement(t.slider.editor)}static getStubConfig(){return{type:`custom:${t.slider.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._config.min??0,i=this._config.max??100,o=this._config.step??1,r="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"",n=this._config.unit??r??"",s=Number(t.state)||0,a=n?`${s} ${n}`:`${s}`,c=J`
      <lirum-slider
        .value=${s}
        .min=${e}
        .max=${i}
        .step=${o}
        .unit=${n}
        .showValue=${!0}
        .disabled=${!this._config.service}
        colorRamp="cool"
        @change=${this._onChange}
      ></lirum-slider>
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!1,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:a,controls:c})}};ae=e([i(t.slider.tag)],ae);(window.customCards=window.customCards??[]).push({type:t.cover.tag,name:t.cover.name,description:t.cover.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ce=class extends Ft{constructor(){super(...arguments),this._open=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","open_cover",{entity_id:this._config.entity})},this._close=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","close_cover",{entity_id:this._config.entity})},this._stop=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","stop_cover",{entity_id:this._config.entity})},this._onPositionChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("cover","set_cover_position",{entity_id:this._config.entity,position:t.detail.value})},this._onTiltChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("cover","set_cover_tilt_position",{entity_id:this._config.entity,tilt_position:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Bi}),document.createElement(t.cover.editor)}static getStubConfig(){return{type:`custom:${t.cover.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="number"==typeof t.attributes.current_position?t.attributes.current_position:void 0,i="number"==typeof t.attributes.current_tilt_position?t.attributes.current_tilt_position:void 0,o=t.state,r="opening"===o||"closing"===o,n="open"===o?"cool":r?"amber":"neutral",s="closed"!==o,a=r,c=void 0!==e?`${e}%${r?` · ${o}`:""}`:o,l=!1!==this._config.show_buttons_control,d=!1!==this._config.show_position_control,h=!0===this._config.show_tilt_position_control,u=this._isUnavailable(),p=l?(()=>{const e=[];return Et(t,1)&&e.push(J`<lirum-chip
                icon="mdi:arrow-up"
                label="Open"
                ?active=${"open"===o||"opening"===o}
                ?disabled=${u}
                @click=${this._open}
              ></lirum-chip>`),Et(t,8)&&e.push(J`<lirum-chip
                icon="mdi:stop"
                label="Stop"
                ?disabled=${u}
                @click=${this._stop}
              ></lirum-chip>`),Et(t,2)&&e.push(J`<lirum-chip
                icon="mdi:arrow-down"
                label="Close"
                ?active=${"closed"===o||"closing"===o}
                ?disabled=${u}
                @click=${this._close}
              ></lirum-chip>`),e.length>0?J`<div class="lirum-chip-row">${e}</div>`:Q})():Q,m=d&&Et(t,4)&&void 0!==e?J`<lirum-slider
            .value=${e}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${u}
            @change=${this._onPositionChange}
          ></lirum-slider>`:Q,g=h&&Et(t,128)&&void 0!==i?J`<lirum-slider
            .value=${i}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${u}
            @change=${this._onTiltChange}
          ></lirum-slider>`:Q,f=p!==Q||m!==Q||g!==Q?J`${p}${m}${g}`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:n,iconActive:s,iconPulse:a,iconUnavailable:u,primary:this._defaultPrimary(),secondary:c,controls:f})}};ce=e([i(t.cover.tag)],ce);const le=130,de=60;let he=class extends gt{constructor(){super(...arguments),this.current=0,this.target=0,this.min=7,this.max=35,this.action="idle",this.unit="°C"}render(){const t=Tt("heating"===this.action?"warm":"cooling"===this.action?"cool":"neutral"),e=Math.max(1e-4,this.max-this.min),i=qt((this.current-this.min)/e,0,1),o=qt((this.target-this.min)/e,0,1),r=Kt(de,de,46,le,410),n=le+280*i,s=n>130.5,a=s?Kt(de,de,46,le,n):"",c=le+280*o,[l,d]=Gt(de,de,46,c),h=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3}`,u=Number.isFinite(this.current)?this.current.toFixed(1):"–";return J`
      <div class="root" style=${h}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path class="bg" d=${r}></path>
          ${s?J`<path class="active" d=${a}></path>`:""}
          <circle class="notch" cx=${l} cy=${d} r="3.5"></circle>
        </svg>
        <div class="value">${u}<span class="unit">${this.unit}</span></div>
      </div>
    `}static{this.styles=c`
    :host {
      display: inline-block;
      width: 64px;
      height: 64px;
    }
    .root {
      position: relative;
      width: 100%;
      height: 100%;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }
    .bg {
      fill: none;
      stroke: color-mix(in oklab, currentColor 14%, transparent);
      stroke-width: 3;
      stroke-linecap: round;
    }
    .active {
      fill: none;
      stroke: var(--c1);
      stroke-width: 7;
      stroke-linecap: round;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 60%, transparent))
        drop-shadow(0 0 10px color-mix(in oklab, var(--c2) 35%, transparent));
    }
    .notch {
      fill: var(--c1);
      stroke: color-mix(in oklab, #000 60%, transparent);
      stroke-width: 1;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 70%, transparent));
    }
    .value {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 13px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      pointer-events: none;
    }
    .value .unit {
      font-size: 9px;
      margin-left: 1px;
      color: color-mix(in oklab, currentColor 60%, transparent);
    }
  `}};e([L({type:Number})],he.prototype,"current",void 0),e([L({type:Number})],he.prototype,"target",void 0),e([L({type:Number})],he.prototype,"min",void 0),e([L({type:Number})],he.prototype,"max",void 0),e([L()],he.prototype,"action",void 0),e([L()],he.prototype,"unit",void 0),he=e([i("lirum-climate-ring")],he),(window.customCards=window.customCards??[]).push({type:t.climate.tag,name:t.climate.name,description:t.climate.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const ue={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sync",auto:"mdi:sync",dry:"mdi:water-percent",fan_only:"mdi:fan"},pe={off:"Off",heat:"Heat",cool:"Cool",heat_cool:"Heat/Cool",auto:"Auto",dry:"Dry",fan_only:"Fan"};let me=class extends Ft{constructor(){super(...arguments),this._onTargetChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Fi}),document.createElement(t.climate.editor)}static getStubConfig(){return{type:`custom:${t.climate.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="number"==typeof t.attributes.current_temperature?t.attributes.current_temperature:void 0,o="number"==typeof t.attributes.temperature?t.attributes.temperature:void 0,r="number"==typeof t.attributes.min_temp?t.attributes.min_temp:7,n="number"==typeof t.attributes.max_temp?t.attributes.max_temp:35,s="number"==typeof t.attributes.target_temp_step?t.attributes.target_temp_step:.5,a="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"°C",c="string"==typeof t.attributes.hvac_action?t.attributes.hvac_action:"idle",l=Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes:["off","heat","cool"],d=this._config.hvac_modes,h=d&&d.length>0?d.filter(t=>l.includes(t)):l,u="heating"===c?"warm":"cooling"===c?"cool":"neutral",p="off"!==e,m="heating"===c||"cooling"===c,g=this._isUnavailable(),f=`${void 0!==i?i.toFixed(1):"–"} → ${void 0!==o?o.toFixed(1):"–"} ${a}`,_=J`<lirum-climate-ring
      .current=${i??0}
      .target=${o??0}
      .min=${r}
      .max=${n}
      .action=${c}
      .unit=${a}
    ></lirum-climate-ring>`,b=!1!==this._config.show_temperature_control,v=h.length>0?J`<div class="lirum-chip-row">
            ${h.map(t=>J`<lirum-chip
                .icon=${ue[t]??"mdi:circle-outline"}
                .label=${function(t){return pe[t]?pe[t]:t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}(t)}
                ?active=${t===e}
                ?disabled=${g}
                @click=${()=>this._setMode(t)}
              ></lirum-chip>`)}
          </div>`:Q,y=b?J`<lirum-slider
          .value=${o??r}
          .min=${r}
          .max=${n}
          .step=${s}
          .unit=${a}
          .showValue=${!0}
          colorRamp="warm"
          ?disabled=${g}
          @change=${this._onTargetChange}
        ></lirum-slider>`:Q,$=v!==Q||y!==Q?J`${v}${y}`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:u,iconActive:p,iconPulse:m,iconUnavailable:g,primary:this._defaultPrimary(),secondary:f,trailing:_,controls:$})}_setMode(t){this.hass&&this._config?.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}};me=e([i(t.climate.tag)],me);(window.customCards=window.customCards??[]).push({type:t.fan.tag,name:t.fan.name,description:t.fan.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ge=class extends Ft{constructor(){super(...arguments),this._onPercentageChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return qi}),document.createElement(t.fan.editor)}static getStubConfig(){return{type:`custom:${t.fan.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.percentage?t.attributes.percentage:0,o="boolean"==typeof t.attributes.oscillating&&t.attributes.oscillating,r=!1!==this._config.show_percentage_control,n=!1!==this._config.show_oscillate_control,s=Et(t,2),a=e?`${i}%${o?" · oscillating":""}`:"Off";let c;if(r||n&&s){const t=r?J`<lirum-slider
            .value=${i}
            .min=${0}
            .max=${100}
            .step=${5}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${this._isUnavailable()}
            @change=${this._onPercentageChange}
          ></lirum-slider>`:Q,e=n&&s?J`<div class="lirum-chip-row">
            <lirum-chip
              icon="mdi:angle-acute"
              label="Oscillate"
              ?active=${o}
              ?disabled=${this._isUnavailable()}
              @click=${()=>this._toggleOscillate(o)}
            ></lirum-chip>
          </div>`:Q;c=J`${t}${e}`}const l=e&&i>=5,d=l?Math.max(.6,4-i/100*3):2;return this._renderTile({icon:this._defaultIcon(),iconColor:e?"cool":"neutral",iconActive:e,iconSpin:l,iconSpinDuration:d,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:a,controls:c})}_toggleOscillate(t){this.hass&&this._config?.entity&&this.hass.callService("fan","oscillate",{entity_id:this._config.entity,oscillating:!t})}};ge=e([i(t.fan.tag)],ge);(window.customCards=window.customCards??[]).push({type:t.media.tag,name:t.media.name,description:t.media.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let fe=class extends Ft{constructor(){super(...arguments),this._previous=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_previous_track",{entity_id:this._config.entity})},this._next=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_next_track",{entity_id:this._config.entity})},this._playPause=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_play_pause",{entity_id:this._config.entity})},this._toggleMute=()=>{if(!this.hass||!this._config?.entity)return;const t=this._stateObj(),e=t?.attributes.is_volume_muted??!1;this.hass.callService("media_player","volume_mute",{entity_id:this._config.entity,is_volume_muted:!e})},this._onVolumeChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","volume_set",{entity_id:this._config.entity,volume_level:t.detail.value/100})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Zi}),document.createElement(t.media.editor)}static getStubConfig(){return{type:`custom:${t.media.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="playing"===t.state,i=t.attributes.media_title,o=t.attributes.media_artist,r=t.attributes.entity_picture,n=t.attributes.volume_level??0,s=t.attributes.is_volume_muted??!1,a=this._isUnavailable(),c=!1!==this._config.show_transport_control,l=!1!==this._config.show_volume_control,d=!1!==this._config.show_mute_control,h=Et(t,16),u=Et(t,32),p=Et(t,8),m=Et(t,4),g=Et(t,1),f=c?J`<div class="lirum-chip-row">
          ${h?J`<lirum-chip
                icon="mdi:skip-previous"
                ?disabled=${a}
                @click=${this._previous}
              ></lirum-chip>`:Q}
          <lirum-chip
            .icon=${e?"mdi:pause":"mdi:play"}
            ?disabled=${a||!e&&!g&&"paused"!==t.state&&"idle"!==t.state}
            @click=${this._playPause}
          ></lirum-chip>
          ${u?J`<lirum-chip
                icon="mdi:skip-next"
                ?disabled=${a}
                @click=${this._next}
              ></lirum-chip>`:Q}
          ${d&&p?J`<lirum-chip
                .icon=${s?"mdi:volume-off":"mdi:volume-high"}
                ?active=${s}
                ?disabled=${a}
                @click=${this._toggleMute}
              ></lirum-chip>`:Q}
        </div>`:Q,_=l&&m?J`<lirum-slider
          .value=${Math.round(100*n)}
          .min=${0}
          .max=${100}
          .step=${1}
          .unit=${"%"}
          .showValue=${!0}
          .disabled=${a}
          colorRamp="rose"
          @change=${this._onVolumeChange}
        ></lirum-slider>`:Q,b=c||l&&m?J`${f}${_}`:void 0,v=i??this._defaultPrimary(),y=o??this._formattedState();return this._renderTile({...r?{iconPicture:r}:{icon:this._defaultIcon()},iconColor:e?"rose":"neutral",iconActive:e,iconUnavailable:a,primary:v,secondary:y,controls:b})}};fe=e([i(t.media.tag)],fe),(window.customCards=window.customCards??[]).push({type:t.lock.tag,name:t.lock.name,description:t.lock.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let _e=class extends Ft{constructor(){super(...arguments),this._lock=()=>{this.hass&&this._config?.entity&&this.hass.callService("lock","lock",{entity_id:this._config.entity})},this._unlock=()=>{this.hass&&this._config?.entity&&this.hass.callService("lock","unlock",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return to}),document.createElement(t.lock.editor)}static getStubConfig(){return{type:`custom:${t.lock.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="locked"===e,o="unlocked"===e,r=this._isUnavailable(),n=i?"energy":"alert",s=!i,a=J`
      <lirum-chip
        icon="mdi:lock"
        label="Lock"
        colorRamp="energy"
        ?active=${i}
        ?disabled=${r}
        @click=${this._lock}
      ></lirum-chip>
      <lirum-chip
        icon="mdi:lock-open-variant"
        label="Unlock"
        colorRamp="alert"
        ?active=${o}
        ?disabled=${r}
        @click=${this._unlock}
      ></lirum-chip>
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:n,iconActive:s,iconUnavailable:r,primary:this._defaultPrimary(),secondary:this._formattedState(),controls:a})}};_e=e([i(t.lock.tag)],_e),(window.customCards=window.customCards??[]).push({type:t.person.tag,name:t.person.name,description:t.person.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let be=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return oo}),document.createElement(t.person.editor)}static getStubConfig(){return{type:`custom:${t.person.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.attributes.entity_picture,i=this._isUnavailable(),o=this._isActive(),r="home"===t.state?"energy":i?"neutral":"cool";return this._renderTile({...e?{iconPicture:e}:{icon:this._defaultIcon()},iconColor:r,iconActive:o,iconUnavailable:i,primary:this._defaultPrimary(),secondary:this._formattedState()})}};be=e([i(t.person.tag)],be),(window.customCards=window.customCards??[]).push({type:t.select.tag,name:t.select.name,description:t.select.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ve=class extends Ft{constructor(){super(...arguments),this._expanded=!1,this._toggleExpanded=()=>{this._expanded=!this._expanded}}static async getConfigElement(){return await Promise.resolve().then(function(){return ao}),document.createElement(t.select.editor)}static getStubConfig(){return{type:`custom:${t.select.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=Array.isArray(t.attributes.options)?t.attributes.options:[],i=t.state,o=this._config.entity.split(".")[0]??"select",r=this._isUnavailable(),n=!0===this._config.inline_options||this._expanded,s=J`
      <lirum-chip
        .icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}
        ?disabled=${r}
        @click=${this._toggleExpanded}
      ></lirum-chip>
    `,a=n&&e.length>0?J`<div class="lirum-chip-row">
          ${e.map(t=>J`<lirum-chip
              .label=${this._capitalize(t)}
              ?active=${t===i}
              ?disabled=${r}
              @click=${()=>this._selectOption(o,t)}
            ></lirum-chip>`)}
        </div>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!r,iconUnavailable:r,primary:this._defaultPrimary(),secondary:i,trailing:s,controls:a})}_capitalize(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}_selectOption(t,e){this.hass&&this._config?.entity&&this.hass.callService(t,"select_option",{entity_id:this._config.entity,option:e})}};e([S()],ve.prototype,"_expanded",void 0),ve=e([i(t.select.tag)],ve),(window.customCards=window.customCards??[]).push({type:t.vacuum.tag,name:t.vacuum.name,description:t.vacuum.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ye=class extends Ft{constructor(){super(...arguments),this._start=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","start",{entity_id:this._config.entity})},this._pause=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","pause",{entity_id:this._config.entity})},this._stop=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","stop",{entity_id:this._config.entity})},this._returnToBase=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","return_to_base",{entity_id:this._config.entity})},this._locate=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","locate",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return uo}),document.createElement(t.vacuum.editor)}static getStubConfig(){return{type:`custom:${t.vacuum.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="cleaning"===e,o="returning"===e,r="number"==typeof t.attributes.battery_level?t.attributes.battery_level:void 0,n=this._isUnavailable(),s=i?"energy":o?"amber":"error"===e?"alert":"neutral",a=[void 0!==r?`${r}%`:null,this._formattedState()].filter(Boolean).join(" · ");let c;if(!1!==this._config.show_control){const r=[];Et(t,8192)&&r.push(J`<lirum-chip
          icon="mdi:play"
          label="Start"
          colorRamp="energy"
          ?active=${i}
          ?disabled=${n}
          @click=${this._start}
        ></lirum-chip>`),Et(t,4)&&r.push(J`<lirum-chip
          icon="mdi:pause"
          label="Pause"
          colorRamp="amber"
          ?active=${"paused"===e}
          ?disabled=${n}
          @click=${this._pause}
        ></lirum-chip>`),Et(t,8)&&r.push(J`<lirum-chip
          icon="mdi:stop"
          label="Stop"
          colorRamp="alert"
          ?disabled=${n}
          @click=${this._stop}
        ></lirum-chip>`),Et(t,16)&&r.push(J`<lirum-chip
          icon="mdi:home-import-outline"
          label="Return"
          colorRamp="amber"
          ?active=${o}
          ?disabled=${n}
          @click=${this._returnToBase}
        ></lirum-chip>`),Et(t,512)&&r.push(J`<lirum-chip
          icon="mdi:map-marker"
          label="Locate"
          colorRamp="cool"
          ?disabled=${n}
          @click=${this._locate}
        ></lirum-chip>`),r.length>0&&(c=J`<div class="lirum-chip-row">${r}</div>`)}return this._renderTile({icon:this._defaultIcon(),iconColor:s,iconActive:i||o,iconPulse:i,iconUnavailable:n,primary:this._defaultPrimary(),secondary:a,controls:c})}};ye=e([i(t.vacuum.tag)],ye),(window.customCards=window.customCards??[]).push({type:t.update.tag,name:t.update.name,description:t.update.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let $e=class extends Ft{constructor(){super(...arguments),this._install=t=>{t.stopPropagation(),this.hass&&this._config?.entity&&this.hass.callService("update","install",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return go}),document.createElement(t.update.editor)}static getStubConfig(){return{type:`custom:${t.update.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.attributes.installed_version??"",i=t.attributes.latest_version??"",o="on"===t.state,r=o?`${e} → ${i}`:"Up to date",n=o?J`<lirum-chip
          icon="mdi:download"
          label="Install"
          @click=${this._install}
        ></lirum-chip>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:o?"amber":"neutral",iconActive:o,iconUnavailable:this._isUnavailable(),iconPulse:o,primary:this._defaultPrimary(),secondary:r,trailing:n})}};$e=e([i(t.update.tag)],$e),(window.customCards=window.customCards??[]).push({type:t.humidifier.tag,name:t.humidifier.name,description:t.humidifier.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let we=class extends Ft{constructor(){super(...arguments),this._onTargetChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("humidifier","set_humidity",{entity_id:this._config.entity,humidity:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return vo}),document.createElement(t.humidifier.editor)}static getStubConfig(){return{type:`custom:${t.humidifier.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.humidity?t.attributes.humidity:void 0,o="number"==typeof t.attributes.current_humidity?t.attributes.current_humidity:void 0,r="number"==typeof t.attributes.min_humidity?t.attributes.min_humidity:30,n="number"==typeof t.attributes.max_humidity?t.attributes.max_humidity:80,s="string"==typeof t.attributes.mode?t.attributes.mode:void 0,a=Array.isArray(t.attributes.available_modes)?t.attributes.available_modes:[],c=!1!==this._config.show_target_control,l=!1!==this._config.show_mode_control,d=`${o??"–"}% → ${i??"–"}%`;let h;if(c||l){const t=c?J`<lirum-slider
            .value=${i??r}
            .min=${r}
            .max=${n}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="rose"
            @change=${this._onTargetChange}
          ></lirum-slider>`:Q,e=l&&a.length>0?J`<div class="lirum-chip-row">
            ${a.map(t=>J`<lirum-chip
                .label=${this._capitalize(t)}
                ?active=${t===s}
                ?disabled=${this._isUnavailable()}
                @click=${()=>this._setMode(t)}
              ></lirum-chip>`)}
          </div>`:Q;h=J`${t}${e}`}return this._renderTile({icon:this._defaultIcon(),iconColor:e?"rose":"neutral",iconActive:e,iconPulse:e,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:d,controls:h})}_capitalize(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}_setMode(t){this.hass&&this._config?.entity&&this.hass.callService("humidifier","set_mode",{entity_id:this._config.entity,mode:t})}};we=e([i(t.humidifier.tag)],we);const xe=[{value:"1",kind:"digit"},{value:"2",kind:"digit"},{value:"3",kind:"digit"},{value:"4",kind:"digit"},{value:"5",kind:"digit"},{value:"6",kind:"digit"},{value:"7",kind:"digit"},{value:"8",kind:"digit"},{value:"9",kind:"digit"},{value:"backspace",kind:"backspace"},{value:"0",kind:"digit"},{value:"submit",kind:"submit"}];let ke=class extends gt{constructor(){super(...arguments),this.codeFormat="number",this._code="",this._onBackspace=()=>{this._code&&(this._code=this._code.slice(0,-1))},this._onSubmit=()=>{const t=this._code;this.dispatchEvent(new CustomEvent("submit",{detail:{code:t},bubbles:!0,composed:!0})),this._code=""}}render(){const t="•".repeat(this._code.length);return J`
      <div class="display" aria-live="polite">${t||J`<span class="placeholder">enter code</span>`}</div>
      <div class="grid">
        ${xe.map(t=>this._renderKey(t))}
      </div>
    `}_renderKey(t){return"backspace"===t.kind?J`<button class="key glyph" @click=${this._onBackspace} aria-label="Backspace">
        <ha-icon icon="mdi:backspace-outline"></ha-icon>
      </button>`:"submit"===t.kind?J`<button class="key glyph submit" @click=${this._onSubmit} aria-label="Submit">
        <ha-icon icon="mdi:check"></ha-icon>
      </button>`:J`<button class="key" @click=${()=>this._onDigit(t.value)}>${t.value}</button>`}_onDigit(t){this._code.length>=8||(this._code=this._code+t)}static{this.styles=c`
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
  `}};e([L()],ke.prototype,"codeFormat",void 0),e([S()],ke.prototype,"_code",void 0),ke=e([i("lirum-alarm-keypad")],ke);const Ce=[{state:"armed_home",suffix:"home",feature:1,icon:"mdi:shield-home",label:"Home"},{state:"armed_away",suffix:"away",feature:2,icon:"mdi:shield-lock",label:"Away"},{state:"armed_night",suffix:"night",feature:4,icon:"mdi:shield-moon",label:"Night"},{state:"armed_vacation",suffix:"vacation",feature:32,icon:"mdi:shield-airplane",label:"Vacation"}];(window.customCards=window.customCards??[]).push({type:t.alarm.tag,name:t.alarm.name,description:t.alarm.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ee=class extends Ft{constructor(){super(...arguments),this._pendingCode="",this._onKeypadSubmit=t=>{const e=t.detail;this._pendingCode=e?.code??""},this._disarm=()=>{if(!this.hass||!this._config?.entity)return;const t={entity_id:this._config.entity};this._pendingCode&&(t.code=this._pendingCode),this.hass.callService("alarm_control_panel","alarm_disarm",t)}}static async getConfigElement(){return await Promise.resolve().then(function(){return xo}),document.createElement(t.alarm.editor)}static getStubConfig(){return{type:`custom:${t.alarm.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");const e={...t};e.tap_action||(e.tap_action={action:"more-info"}),super.setConfig(e)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="number"==typeof t.attributes.supported_features?t.attributes.supported_features:0,o=this._isUnavailable(),r="disarmed"===e?"neutral":"triggered"===e?"alert":e.startsWith("armed")?"energy":"amber",n="disarmed"!==e&&"unavailable"!==e,s="pending"===e||"arming"===e||"triggered"===e,a=this._config.states,c=Ce.filter(t=>0!==(i&t.feature)).filter(t=>!a||a.includes(t.state)),l=c.map(t=>J`
      <lirum-chip
        icon=${t.icon}
        label=${t.label}
        colorRamp="energy"
        ?active=${e===t.state}
        ?disabled=${o}
        @click=${()=>this._arm(t.suffix)}
      ></lirum-chip>
    `),d=J`
      <lirum-chip
        icon="mdi:shield-off"
        label="Disarm"
        colorRamp="neutral"
        ?active=${"disarmed"===e}
        ?disabled=${o}
        @click=${this._disarm}
      ></lirum-chip>
    `,h=this._config.show_keypad?J`<lirum-alarm-keypad
          codeFormat="number"
          @submit=${this._onKeypadSubmit}
        ></lirum-alarm-keypad>`:Q,u=J`
      <div class="lirum-chip-row">${l}${d}</div>
      ${h}
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:r,iconActive:n,iconPulse:s,iconUnavailable:o,primary:this._defaultPrimary(),secondary:this._formattedState(),controls:u})}_arm(t){if(!this.hass||!this._config?.entity)return;const e={entity_id:this._config.entity};this._pendingCode&&(e.code=this._pendingCode),this.hass.callService("alarm_control_panel",`alarm_arm_${t}`,e)}};e([S()],Ee.prototype,"_pendingCode",void 0),Ee=e([i(t.alarm.tag)],Ee);let Le=class extends gt{constructor(){super(...arguments),this.icon="",this.label="",this.secondary="",this.colorRamp="cool",this.active=!1,this.disabled=!1,this.busy=!1}render(){const t=Tt(this.colorRamp),e=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3}`;return J`
      <button
        class="btn ${this.active?"active":""} ${this.busy?"busy lirum-anim":""}"
        ?disabled=${this.disabled}
        style=${e}
      >
        ${this.icon?J`<ha-icon icon=${this.icon}></ha-icon>`:""}
        <span class="text">
          <span class="label">${this.label}</span>
          ${this.secondary?J`<span class="secondary">${this.secondary}</span>`:""}
        </span>
        ${this.busy?J`<span class="ring"></span>`:""}
      </button>
    `}static{this.styles=c`
    :host { display: block; }
    .btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid color-mix(in oklab, currentColor 10%, transparent);
      background: linear-gradient(
        180deg,
        color-mix(in oklab, currentColor 4%, transparent),
        color-mix(in oklab, currentColor 1%, transparent)
      );
      color: var(--lirum-text, #eef3ff);
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.1s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .btn:hover:not(:disabled) {
      background: linear-gradient(
        180deg,
        color-mix(in oklab, var(--c1) 8%, transparent),
        color-mix(in oklab, var(--c2) 3%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 25%, transparent);
    }
    .btn:active:not(:disabled) { transform: scale(0.98); }
    .btn.active {
      background: linear-gradient(
        135deg,
        color-mix(in oklab, var(--c1) 22%, transparent),
        color-mix(in oklab, var(--c2) 16%, transparent)
      );
      border-color: color-mix(in oklab, var(--c1) 45%, transparent);
      box-shadow: 0 0 0 1px color-mix(in oklab, var(--c1) 25%, transparent),
        0 0 18px color-mix(in oklab, var(--c1) 28%, transparent);
    }
    .btn:disabled { opacity: 0.45; cursor: not-allowed; }
    ha-icon {
      --mdc-icon-size: 20px;
      filter: drop-shadow(0 0 4px color-mix(in oklab, var(--c1) 40%, transparent));
      flex-shrink: 0;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      text-align: left;
    }
    .label {
      font-weight: 600;
      letter-spacing: -0.1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .secondary {
      font-size: 11px;
      color: var(--lirum-muted, #6b7894);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ring {
      position: absolute;
      top: 50%;
      right: 14px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid color-mix(in oklab, var(--c1) 70%, transparent);
      border-top-color: transparent;
      transform: translateY(-50%);
      animation: lirum-spin 0.9s linear infinite;
    }
    @keyframes lirum-spin {
      to { transform: translateY(-50%) rotate(360deg); }
    }
  `}};e([L()],Le.prototype,"icon",void 0),e([L()],Le.prototype,"label",void 0),e([L()],Le.prototype,"secondary",void 0),e([L()],Le.prototype,"colorRamp",void 0),e([L({type:Boolean})],Le.prototype,"active",void 0),e([L({type:Boolean})],Le.prototype,"disabled",void 0),e([L({type:Boolean})],Le.prototype,"busy",void 0),Le=e([i("lirum-button")],Le),(window.customCards=window.customCards??[]).push({type:t.button.tag,name:t.button.name,description:t.button.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Se=class extends Ft{constructor(){super(...arguments),this._busy=!1,this._onTap=()=>{this._busy=!0,window.setTimeout(()=>{this._busy=!1},700)}}static async getConfigElement(){return await Promise.resolve().then(function(){return Lo}),document.createElement(t.button.editor)}static getStubConfig(){return{type:`custom:${t.button.tag}`,name:"Button"}}setConfig(t){const e={...t};e.entity&&"button"===kt(e.entity)&&!e.tap_action&&(e.tap_action={action:"call-service",service:"button.press",target:{entity_id:e.entity}}),super.setConfig(e)}render(){if(!this._config)return Q;const t=Boolean(this._config.entity),e=t?this._stateObj():void 0,i=this._config.icon??(t?this._defaultIcon():"mdi:gesture-tap-button"),o=t?this._config.name??this._defaultPrimary():this._config.name??"Button",r=this._config.secondary??(e?this._formattedState():""),n=this._config.icon_color??"cool",s=Rt(this._config.background);return J`
      <ha-card style=${xt(s)}>
        <div class="lirum-gesture-root">
          <lirum-button
            .icon=${i}
            .label=${o}
            .secondary=${r}
            .colorRamp=${n}
            .busy=${this._busy}
            @click=${this._onTap}
          ></lirum-button>
        </div>
      </ha-card>
    `}};e([S()],Se.prototype,"_busy",void 0),Se=e([i(t.button.tag)],Se);const Ae={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle-outline"};function Pe(t,e,i){switch(t.type){case"entity":{const o=e.states[t.entity],r=t.icon??At(o,t.entity),n="state"===t.content_info?o?.state??"":"name"===t.content_info?o?.attributes.friendly_name??t.entity:"",s=()=>{const o={entity:t.entity,tap_action:t.tap_action};jt(i,e,o,"tap")};return J`<lirum-chip
        .icon=${r}
        .label=${n}
        .colorRamp=${t.icon_color??"cool"}
        @click=${s}
      ></lirum-chip>`}case"action":{const o=()=>{const o={tap_action:t.tap_action};jt(i,e,o,"tap")};return J`<lirum-chip
        .icon=${t.icon}
        .label=${t.label??""}
        .colorRamp=${t.icon_color??"cool"}
        @click=${o}
      ></lirum-chip>`}case"back":{const e=()=>{window.history.back()};return J`<lirum-chip
        .icon=${t.icon??"mdi:arrow-left-circle"}
        @click=${e}
      ></lirum-chip>`}case"menu":{const e=()=>{i.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))};return J`<lirum-chip
        .icon=${t.icon??"mdi:menu"}
        @click=${e}
      ></lirum-chip>`}case"weather":{const o=e.states[t.entity],r=Ae[o?.state??""]??"mdi:weather-partly-cloudy",n=o?.attributes.temperature,s=!1===t.show_temperature||null==n?"":`${n}°`;return J`<lirum-chip
        .icon=${r}
        .label=${s}
        @click=${()=>{const o={entity:t.entity,tap_action:{action:"more-info"}};jt(i,e,o,"tap")}}
      ></lirum-chip>`}case"template":{const o=t.entity?e.states[t.entity]:void 0,r=t.icon??(o?At(o,t.entity):""),n=t.content?function(t,e){let i=t;return i=i.replace(/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,(t,i,o)=>{const r=e.states[i],n=r?.attributes[o];return null==n?"":String(n)}),i=i.replace(/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,(t,i)=>e.states[i]?.state??""),i}(t.content,e):"",s=()=>{const o={entity:t.entity,tap_action:t.tap_action};jt(i,e,o,"tap")};return J`<lirum-chip
        .icon=${r}
        .label=${n}
        .colorRamp=${t.icon_color??"cool"}
        @click=${s}
      ></lirum-chip>`}}}(window.customCards=window.customCards??[]).push({type:t.chips.tag,name:t.chips.name,description:t.chips.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ze=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return Po}),document.createElement(t.chips.editor)}static getStubConfig(){return{type:`custom:${t.chips.tag}`,chips:[]}}setConfig(t){super.setConfig(t)}getCardSize(){return 1}render(){if(!this.hass||!this._config)return Q;const t=this._config.alignment??"start",e=this._config.chips??[],i=Rt(this._config.background);return J`
      <ha-card style=${xt(i)}>
        <div class="chips-row alignment-${t}">
          ${e.map(t=>Pe(t,this.hass,this))}
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .chips-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 10px 12px;
      }

      .alignment-start {
        justify-content: flex-start;
      }

      .alignment-center {
        justify-content: center;
      }

      .alignment-end {
        justify-content: flex-end;
      }

      .alignment-justify {
        justify-content: space-between;
      }
    `]}};ze=e([i(t.chips.tag)],ze),(window.customCards=window.customCards??[]).push({type:t.title.tag,name:t.title.name,description:t.title.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Te=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return Ro}),document.createElement(t.title.editor)}static getStubConfig(){return{type:`custom:${t.title.tag}`,title:"Section title"}}setConfig(t){super.setConfig(t)}getCardSize(){return 1}render(){if(!this._config)return Q;const t=this._config.alignment??"start",e=Rt(this._config.background);return J`
      <ha-card style=${xt(e)}>
        <div class="lirum-title-wrap align-${t}">
          ${this._config.title?J`<div class="title">${this._config.title}</div>`:Q}
          ${this._config.subtitle?J`<div class="subtitle">${this._config.subtitle}</div>`:Q}
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .lirum-title-wrap {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 1.2;
        color: var(--lirum-text);
        letter-spacing: -0.3px;
      }

      .subtitle {
        font-size: 13px;
        color: var(--lirum-muted);
        line-height: 1.3;
      }

      .align-start {
        text-align: start;
        align-items: flex-start;
      }

      .align-center {
        text-align: center;
        align-items: center;
      }

      .align-end {
        text-align: end;
        align-items: flex-end;
      }
    `]}};Te=e([i(t.title.tag)],Te),(window.customCards=window.customCards??[]).push({type:t.template.tag,name:t.template.name,description:t.template.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const Re=/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,Ue=/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,Me=/\{\{\s*is_state\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,Oe=/\{\{\s*is_state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]*)['"]\s*\)\s*\}\}/g,je=/\{%\s*if\s+([^%]+?)\s*%\}([\s\S]*?)(?:\{%\s*else\s*%\}([\s\S]*?))?\{%\s*endif\s*%\}/g;let Ne=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return jo}),document.createElement(t.template.editor)}static getStubConfig(){return{type:`custom:${t.template.tag}`,primary:"Hello"}}setConfig(t){super.setConfig(t)}_eval(t){if(!t)return"";let e=t;return e=e.replace(Oe,(t,e,i,o)=>{const r=this.hass?.states[e];return r&&String(r.attributes[i]??"")===o?"true":"false"}),e=e.replace(Me,(t,e,i)=>{const o=this.hass?.states[e];return o&&o.state===i?"true":"false"}),e=e.replace(je,(t,e,i,o)=>{const r=e.trim().toLowerCase();return"true"===r||r.startsWith("not ")&&"false"===r.slice(4).trim()||r.length>0&&"false"!==r&&"0"!==r&&'"'!==r&&"'"!==r?i:o??""}),e=e.replace(Ue,(t,e,i)=>{const o=this.hass?.states[e];if(!o)return"";const r=o.attributes[i];return null==r?"":String(r)}),e=e.replace(Re,(t,e)=>{const i=this.hass?.states[e];return i?i.state:"unknown"}),e.trim()}render(){if(!this.hass||!this._config)return Q;const t=this._eval(this._config.primary)||this._config.primary||"",e=this._eval(this._config.secondary),i=this._config.icon?this._eval(this._config.icon):"",o=i.startsWith("mdi:")?i:this._defaultIcon()||"mdi:cog",r=this._config.icon_color?this._eval(this._config.icon_color)||this._config.icon_color:"cool",n=this._config.picture?this._eval(this._config.picture):void 0;return this._renderTile({icon:n?void 0:o,iconPicture:n,iconColor:r,primary:t,secondary:e||void 0})}};Ne=e([i(t.template.tag)],Ne),(window.customCards=window.customCards??[]).push({type:t.scene.tag,name:t.scene.name,description:t.scene.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Be=class extends Ft{constructor(){super(...arguments),this._busy=!1,this._onTap=()=>{this._busy=!0,window.setTimeout(()=>{this._busy=!1},700)}}static async getConfigElement(){return await Promise.resolve().then(function(){return Io}),document.createElement(t.scene.editor)}static getStubConfig(){return{type:`custom:${t.scene.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");const e={...t};e.tap_action||(e.tap_action={action:"call-service",service:"scene.turn_on",target:{entity_id:t.entity}}),super.setConfig(e)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state;let i="Never activated";if(e&&"unknown"!==e&&"unavailable"!==e){const t=new Date(e);Number.isNaN(t.getTime())||(i=function(t){const e=Date.now()-t.getTime();if(!Number.isFinite(e)||e<0)return"just now";const i=Math.floor(e/1e3);if(i<45)return"just now";const o=Math.floor(i/60);if(o<60)return`activated ${o}m ago`;const r=Math.floor(o/60);if(r<24)return`activated ${r}h ago`;const n=Math.floor(r/24);if(n<30)return`activated ${n}d ago`;const s=Math.floor(n/30);return s<12?`activated ${s}mo ago`:`activated ${Math.floor(n/365)}y ago`}(t))}const o=this._defaultIcon(),r=this._config.icon_color??"rose",n=this._defaultPrimary(),s=Rt(this._config.background);return J`
      <ha-card style=${xt(s)}>
        <div class="lirum-gesture-root" @click=${this._onTap}>
          <lirum-button
            icon=${o}
            label=${n}
            secondary=${i}
            colorRamp=${r}
            .busy=${this._busy}
          ></lirum-button>
        </div>
      </ha-card>
    `}};e([S()],Be.prototype,"_busy",void 0),Be=e([i(t.scene.tag)],Be),(window.customCards=window.customCards??[]).push({type:t.script.tag,name:t.script.name,description:t.script.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ie=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return Fo}),document.createElement(t.script.editor)}static getStubConfig(){return{type:`custom:${t.script.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");const e={...t};e.tap_action||(e.tap_action={action:"call-service",service:"script.turn_on",target:{entity_id:t.entity},service_data:t.variables??{}}),super.setConfig(e)}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="on"===t.state,i=t.attributes.last_triggered;let o;if(e)o="Running…";else if(i){const t=new Date(i);o=Number.isNaN(t.getTime())?"Idle":function(t){const e=Date.now()-t.getTime();if(!Number.isFinite(e)||e<0)return"just now";const i=Math.floor(e/1e3);if(i<45)return"ran just now";const o=Math.floor(i/60);if(o<60)return`ran ${o}m ago`;const r=Math.floor(o/60);if(r<24)return`ran ${r}h ago`;const n=Math.floor(r/24);if(n<30)return`ran ${n}d ago`;const s=Math.floor(n/30);return s<12?`ran ${s}mo ago`:`ran ${Math.floor(n/365)}y ago`}(t)}else o="Idle";const r=this._defaultIcon(),n=this._config.icon_color??(e?"amber":"cool"),s=this._defaultPrimary(),a=Rt(this._config.background);return J`
      <ha-card style=${xt(a)}>
        <div class="lirum-gesture-root">
          <lirum-button
            .icon=${r}
            .label=${s}
            .secondary=${o}
            .colorRamp=${n}
            .busy=${e}
          ></lirum-button>
        </div>
      </ha-card>
    `}};Ie=e([i(t.script.tag)],Ie),(window.customCards=window.customCards??[]).push({type:t.camera.tag,name:t.camera.name,description:t.camera.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let De=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return qo}),document.createElement(t.camera.editor)}static getStubConfig(){return{type:`custom:${t.camera.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}getCardSize(){return 3}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.attributes.entity_picture,i=function(t){const e=t.split(":").map(t=>Number(t.trim()));return 2===e.length&&e[0]&&e[1]&&Number.isFinite(e[0])&&Number.isFinite(e[1])?e[1]/e[0]*100+"%":"56.25%"}(this._config.aspect_ratio??"16:9"),o=!1!==this._config.show_name,r=!1!==this._config.show_state,n=Rt(this._config.background),s=t.state,a="recording"===s||"streaming"===s,c=this._defaultPrimary(),l=this._formattedState(),d=e?J`<img class="snapshot" src=${e} alt=${c} />`:J`<div class="placeholder">
          <lirum-icon
            .icon=${this._defaultIcon()||"mdi:video"}
            .colorRamp=${this._config.icon_color??"cool"}
            .unavailable=${this._isUnavailable()}
          ></lirum-icon>
          <div class="placeholder-text">${l}</div>
        </div>`,h=o?J`<div class="pill name-pill">${c}</div>`:Q,u=r?J`<div class="pill state-pill">
          ${a?J`<span class="live-dot lirum-anim"></span>`:Q}
          <span>${l}</span>
        </div>`:Q,p=o||r?J`<div class="overlay">${h}${u}</div>`:Q;return J`
      <ha-card style=${xt(n)}>
        <div class="lirum-gesture-root">
          <div class="frame" style=${xt({paddingBottom:i})}>
            <div class="inner">${d}${p}</div>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .frame {
        position: relative;
        width: 100%;
        height: 0;
        overflow: hidden;
      }
      .inner {
        position: absolute;
        inset: 0;
        display: block;
      }
      .snapshot {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--lirum-muted);
        background: color-mix(in oklab, currentColor 6%, transparent);
      }
      .placeholder-text {
        font-size: 12px;
        color: var(--lirum-muted);
      }
      .overlay {
        position: absolute;
        left: 10px;
        bottom: 10px;
        display: flex;
        gap: 6px;
        align-items: center;
        max-width: calc(100% - 20px);
      }
      .pill {
        background: color-mix(in oklab, black 50%, transparent);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 999px;
        padding: 4px 10px;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name-pill {
        font-weight: 600;
      }
      .state-pill {
        font-weight: 500;
        text-transform: capitalize;
      }
      .live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff3b4b;
        box-shadow: 0 0 6px rgba(255, 59, 75, 0.8);
        animation: lirum-pulse 1.2s ease-in-out infinite;
        flex-shrink: 0;
      }
    `]}};De=e([i(t.camera.tag)],De);let He=class extends gt{constructor(){super(...arguments),this.value="–",this.unit="",this.label="",this.trend="",this.colorRamp="cool"}render(){const t=Tt(this.colorRamp),e=`--c1:${t.c1};--c2:${t.c2}`,i="up"===this.trend?"mdi:trending-up":"down"===this.trend?"mdi:trending-down":"flat"===this.trend?"mdi:trending-neutral":"";return J`
      <div class="root" style=${e}>
        <div class="value">
          ${this.value}<span class="unit">${this.unit}</span>
          ${i?J`<ha-icon class="trend ${this.trend}" icon=${i}></ha-icon>`:""}
        </div>
        ${this.label?J`<div class="label">${this.label}</div>`:""}
      </div>
    `}static{this.styles=c`
    :host { display: block; }
    .root { display: flex; flex-direction: column; gap: 2px; }
    .value {
      font-size: 30px;
      font-weight: 300;
      letter-spacing: -1.2px;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      line-height: 1;
      text-shadow: 0 0 14px color-mix(in oklab, var(--c1) 35%, transparent);
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .unit {
      font-size: 14px;
      color: color-mix(in oklab, currentColor 55%, transparent);
      margin-left: 2px;
    }
    .label {
      font-size: 11px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      font-weight: 600;
    }
    .trend {
      --mdc-icon-size: 18px;
      align-self: center;
      margin-left: 4px;
    }
    .trend.up { color: var(--c1); }
    .trend.down { color: #ff5a7a; }
    .trend.flat { color: var(--lirum-muted, #6b7894); }
  `}};e([L()],He.prototype,"value",void 0),e([L()],He.prototype,"unit",void 0),e([L()],He.prototype,"label",void 0),e([L()],He.prototype,"trend",void 0),e([L()],He.prototype,"colorRamp",void 0),He=e([i("lirum-stat")],He),(window.customCards=window.customCards??[]).push({type:t.weather.tag,name:t.weather.name,description:t.weather.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const Fe={sunny:"mdi:weather-sunny","clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",partlycloudy:"mdi:weather-partly-cloudy",rainy:"mdi:weather-rainy",pouring:"mdi:weather-pouring",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle"},Ve={sunny:"amber","clear-night":"cool",cloudy:"neutral",partlycloudy:"cool",rainy:"cool",pouring:"cool",snowy:"cool","snowy-rainy":"cool",fog:"neutral",hail:"neutral",lightning:"amber","lightning-rainy":"amber",windy:"cool","windy-variant":"cool",exceptional:"alert"},We=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];let Ye=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return Zo}),document.createElement(t.weather.editor)}static getStubConfig(){return{type:`custom:${t.weather.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}getCardSize(){return 3}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="number"==typeof t.attributes.temperature?t.attributes.temperature:void 0,i="string"==typeof t.attributes.temperature_unit?t.attributes.temperature_unit:"°C",o="number"==typeof t.attributes.humidity?t.attributes.humidity:void 0,r="number"==typeof t.attributes.wind_speed?t.attributes.wind_speed:void 0,n="string"==typeof t.attributes.wind_speed_unit?t.attributes.wind_speed_unit:"km/h",s=Array.isArray(t.attributes.forecast)?t.attributes.forecast:void 0,a=Fe[t.state]??"mdi:weather-partly-cloudy",c=Ve[t.state]??"cool",l=Rt(this._config.background),d=!1!==this._config.show_details,h=!1!==this._config.show_forecast,u=this._config.forecast_days??5,p=function(t){return t.replace(/_/g," ").replace(/-/g," ")}(t.state),m=d?J`<div class="details">
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span>Humidity</span>
            </div>
            <div class="cell-value">${void 0!==o?`${o}%`:"–"}</div>
          </div>
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:weather-windy"></ha-icon>
              <span>Wind</span>
            </div>
            <div class="cell-value">
              ${void 0!==r?`${r} ${n}`:"–"}
            </div>
          </div>
          <div class="cell">
            <div class="cell-label">
              <ha-icon icon="mdi:weather-cloudy-clock"></ha-icon>
              <span>Condition</span>
            </div>
            <div class="cell-value">${p}</div>
          </div>
        </div>`:Q,g=h&&s&&s.length>0?J`<div class="forecast-strip">
            <div class="forecast">
              ${s.slice(0,Math.max(0,u)).map((t,e)=>{const i=function(t){if(!t)return"";const e=new Date(t);return Number.isNaN(e.getTime())?"":We[e.getDay()]??""}(t.datetime),o=t.condition??"",r=Fe[o]??"mdi:weather-partly-cloudy",n="number"==typeof t.temperature?Math.round(t.temperature):void 0,s="number"==typeof t.templow?Math.round(t.templow):void 0,a=0===e;return J`<div class="forecast-tile ${a?"is-today":""}">
                  <div class="forecast-day">
                    ${a?J`<span class="now-dot"></span>`:Q}
                    <span class="forecast-day-label">${a?"Today":i}</span>
                  </div>
                  <ha-icon class="forecast-icon lirum-anim" icon=${r}></ha-icon>
                  <div class="forecast-temp">
                    ${void 0!==n?J`<span class="t-high">${n}°</span>`:J`<span class="t-high">–</span>`}
                    ${void 0!==s?J`<span class="t-sep">·</span
                          ><span class="t-low">${s}°</span>`:Q}
                  </div>
                </div>`})}
            </div>
          </div>`:Q;return J`
      <ha-card style=${xt(l)}>
        <div class="lirum-gesture-root">
          <div class="top">
            <ha-icon class="hero-icon ramp-${c} lirum-anim" icon=${a}></ha-icon>
            <lirum-stat
              class="hero-stat"
              .value=${void 0!==e?e.toFixed(1):"–"}
              .unit=${i}
              .label=${p}
              .colorRamp=${c}
            ></lirum-stat>
          </div>
          ${m}${g}
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .lirum-gesture-root {
        padding: 14px 14px 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .top {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .hero-icon {
        --mdc-icon-size: 48px;
        flex: 0 0 auto;
        filter: drop-shadow(0 0 10px color-mix(in oklab, var(--c1, #1ee0ff) 60%, transparent));
        animation: lirum-glow-pulse 3.6s ease-in-out infinite;
      }
      .hero-icon.ramp-amber {
        --c1: #ffd35a;
        color: #ffd35a;
      }
      .hero-icon.ramp-cool {
        --c1: #1ee0ff;
        color: #1ee0ff;
      }
      .hero-icon.ramp-neutral {
        --c1: #9dadc7;
        color: #9dadc7;
      }
      .hero-icon.ramp-alert {
        --c1: #ff5a7a;
        color: #ff5a7a;
      }
      .hero-stat {
        flex: 1 1 auto;
        min-width: 0;
      }
      .details {
        --c1: #1ee0ff;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        padding-top: 10px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        padding: 8px 10px;
        border-radius: 10px;
        background: linear-gradient(
          180deg,
          color-mix(in oklab, var(--c1) 6%, transparent),
          color-mix(in oklab, currentColor 3%, transparent)
        );
        border: 1px solid color-mix(in oklab, var(--c1) 18%, transparent);
        backdrop-filter: blur(2px);
      }
      .cell-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--lirum-muted, #6b7894);
        font-weight: 600;
      }
      .cell-label ha-icon {
        --mdc-icon-size: 14px;
      }
      .cell-value {
        font-size: 14px;
        color: var(--lirum-text, #eef3ff);
        font-variant-numeric: tabular-nums;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .forecast-strip {
        --c1: #1ee0ff;
        position: relative;
        padding-top: 10px;
      }
      .forecast-strip::before,
      .forecast-strip::after {
        content: '';
        position: absolute;
        top: 10px;
        bottom: 2px;
        width: 18px;
        pointer-events: none;
        z-index: 1;
      }
      .forecast-strip::before {
        left: 0;
        background: linear-gradient(
          90deg,
          color-mix(in oklab, #060a14 85%, transparent),
          transparent
        );
      }
      .forecast-strip::after {
        right: 0;
        background: linear-gradient(
          270deg,
          color-mix(in oklab, #060a14 85%, transparent),
          transparent
        );
      }
      .forecast {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 2px 2px 4px;
        scrollbar-width: thin;
        scroll-snap-type: x proximity;
      }
      .forecast-tile {
        flex: 0 0 auto;
        min-width: 64px;
        max-width: 84px;
        padding: 8px 8px 9px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        border-radius: 10px;
        background: linear-gradient(
          180deg,
          color-mix(in oklab, var(--c1) 7%, transparent),
          color-mix(in oklab, currentColor 3%, transparent)
        );
        border: 1px solid color-mix(in oklab, var(--c1) 18%, transparent);
        scroll-snap-align: start;
        transition:
          border-color 160ms ease,
          box-shadow 160ms ease,
          transform 160ms ease;
      }
      .forecast-tile:hover {
        border-color: color-mix(in oklab, var(--c1) 45%, transparent);
        box-shadow:
          0 0 0 1px color-mix(in oklab, var(--c1) 25%, transparent),
          0 0 16px color-mix(in oklab, var(--c1) 28%, transparent);
      }
      .forecast-tile.is-today {
        border-color: color-mix(in oklab, var(--c1) 35%, transparent);
        box-shadow: 0 0 12px color-mix(in oklab, var(--c1) 18%, transparent);
      }
      .forecast-day {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--lirum-muted, #6b7894);
        font-weight: 600;
        line-height: 1;
      }
      .forecast-tile.is-today .forecast-day-label {
        color: var(--lirum-text, #eef3ff);
      }
      .now-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--c1);
        box-shadow: 0 0 6px color-mix(in oklab, var(--c1) 80%, transparent);
        animation: lirum-shimmer 2.4s ease-in-out infinite;
      }
      .forecast-icon {
        --mdc-icon-size: 22px;
        color: var(--lirum-text, #eef3ff);
        animation: lirum-glow-pulse 4.2s ease-in-out infinite;
      }
      .forecast-temp {
        font-size: 12px;
        color: var(--lirum-text, #eef3ff);
        font-variant-numeric: tabular-nums;
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        line-height: 1;
      }
      .t-high {
        font-weight: 600;
        color: var(--lirum-text, #eef3ff);
      }
      .t-sep {
        opacity: 0.5;
      }
      .t-low {
        color: color-mix(in oklab, currentColor 50%, transparent);
      }
    `]}};Ye=e([i(t.weather.tag)],Ye);let qe=class extends gt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.colorRamp="cool",this.unit="",this.label="",this.size=160,this.startDeg=130,this.endDeg=410,this.showTicks=!0,this.showKnob=!0}render(){const t=Tt(this.colorRamp),e=200,i=200,o=150,r=this.endDeg-this.startDeg,n=Math.max(1,this.max-this.min),s=qt((this.value-this.min)/n,0,1),a=this.startDeg+r*s,[c,l]=Gt(e,i,o,a),d=[];if(this.showTicks){const n=60;for(let a=0;a<=n;a++){const c=a/n,l=this.startDeg+r*c,h=a%6==0,u=128,p=o-(h?10:16),[m,g]=Gt(e,i,u,l),[f,_]=Gt(e,i,p,l),b=c<=s;d.push(Z`
          <line x1=${m} y1=${g} x2=${f} y2=${_}
            stroke=${b?t.c1:"rgba(255,255,255,0.08)"}
            stroke-width=${h?1.6:1}
            stroke-linecap="round"
            opacity=${b?1:.55}
            style=${b?`filter: drop-shadow(0 0 3px ${t.c1})`:""}
          />`)}}return J`
      <div class="root" style="--size:${this.size}px;--c1:${t.c1};--c2:${t.c2};--c3:${t.c3}">
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lg-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color=${t.c1} />
              <stop offset="60%" stop-color=${t.c2} />
              <stop offset="100%" stop-color=${t.c3} />
            </linearGradient>
            <radialGradient id="lg-halo" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stop-color="transparent" />
              <stop offset="80%" stop-color=${t.c2} stop-opacity="0.45" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="lg-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <path d=${Kt(e,i,o,this.startDeg,this.endDeg)}
            stroke="rgba(255,255,255,0.06)" stroke-width="3" fill="none" stroke-linecap="round" />
          <g>${d}</g>
          <path d=${Kt(e,i,o,this.startDeg,a)}
            stroke="url(#lg-stroke)" stroke-width="14" fill="none" stroke-linecap="round"
            opacity="0.55" filter="url(#lg-blur-lg)" />
          <path d=${Kt(e,i,o,this.startDeg,a)}
            stroke="url(#lg-stroke)" stroke-width="3" fill="none" stroke-linecap="round" />
          <circle cx=${e} cy=${i} r=${114} fill="url(#lg-halo)" opacity="0.7" />
          ${this.showKnob?Z`<circle cx=${c} cy=${l} r="9" fill="#0a1020"
                    stroke="rgba(255,255,255,0.6)" stroke-width="1.5"
                    style="filter: drop-shadow(0 0 8px ${t.c1})" />
                  <circle cx=${c} cy=${l} r="3" fill=${t.c1}
                    style="filter: drop-shadow(0 0 6px ${t.c1})" />`:""}
        </svg>
        <div class="center">
          <div class="value">${this._format(this.value)}<span class="unit">${this.unit}</span></div>
          ${this.label?J`<div class="label">${this.label}</div>`:""}
        </div>
      </div>
    `}_format(t){return Math.abs(t)>=1e3?t.toLocaleString(void 0,{maximumFractionDigits:0}):Math.abs(t)>=10?t.toFixed(1):t.toFixed(2)}static{this.styles=c`
    :host { display: inline-block; }
    .root {
      position: relative;
      width: var(--size, 160px);
      height: var(--size, 160px);
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .center {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }
    .value {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: calc(var(--size, 160px) * 0.18);
      font-weight: 300;
      letter-spacing: -1px;
      font-variant-numeric: tabular-nums;
      color: var(--lirum-text, #eef3ff);
      text-shadow: 0 0 14px color-mix(in oklab, var(--c1) 50%, transparent);
      line-height: 1;
    }
    .unit {
      font-size: 0.55em;
      margin-left: 3px;
      color: color-mix(in oklab, var(--lirum-text, #eef3ff) 60%, transparent);
    }
    .label {
      font-size: calc(var(--size, 160px) * 0.075);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--lirum-muted, #6b7894);
      margin-top: 6px;
      font-weight: 600;
      text-align: center;
    }
  `}};e([L({type:Number})],qe.prototype,"value",void 0),e([L({type:Number})],qe.prototype,"min",void 0),e([L({type:Number})],qe.prototype,"max",void 0),e([L()],qe.prototype,"colorRamp",void 0),e([L()],qe.prototype,"unit",void 0),e([L()],qe.prototype,"label",void 0),e([L({type:Number})],qe.prototype,"size",void 0),e([L({type:Number})],qe.prototype,"startDeg",void 0),e([L({type:Number})],qe.prototype,"endDeg",void 0),e([L({type:Boolean})],qe.prototype,"showTicks",void 0),e([L({type:Boolean})],qe.prototype,"showKnob",void 0),qe=e([i("lirum-gauge")],qe),(window.customCards=window.customCards??[]).push({type:t.gauge.tag,name:t.gauge.name,description:t.gauge.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ge=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return er}),document.createElement(t.gauge.editor)}static getStubConfig(){return{type:`custom:${t.gauge.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}getCardSize(){return 3}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=Number(t.state);if(!Number.isFinite(e))return this._renderError("value not numeric");const i=this._config.min??0,o=this._config.max??100,r=this._config.unit??("string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""),n=this._config.label??"",s=this._config.size??200,a=function(t,e,i){if(!e||0===e.length)return i;const o=[...e].sort((t,e)=>t.value-e.value);let r;for(const e of o){if(!(e.value<=t))break;r=e.color}return r??o[0]?.color??i}(e,this._config.thresholds,this._config.icon_color??"cool"),c=Rt(this._config.background),l=this._defaultPrimary();return J`
      <ha-card style=${xt(c)}>
        <div class="lirum-gesture-root">
          <div class="gauge-wrap">
            <lirum-gauge
              .value=${e}
              .min=${i}
              .max=${o}
              .colorRamp=${a}
              .unit=${r}
              .label=${n}
              .size=${s}
            ></lirum-gauge>
            <div class="entity-label">${l}</div>
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .gauge-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px;
      }
      .entity-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--lirum-text, #eef3ff);
        text-align: center;
        letter-spacing: 0.2px;
      }
    `]}};Ge=e([i(t.gauge.tag)],Ge),(window.customCards=window.customCards??[]).push({type:t.tile.tag,name:t.tile.name,description:t.tile.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ke=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return nr}),document.createElement(t.tile.editor)}static getStubConfig(){return{type:`custom:${t.tile.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}getCardSize(){return 2}render(){if(!this.hass||!this._config)return Q;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="unavailable"===e||"unknown"===e,o=Number(e),r=!isNaN(o),n=this._config.unit??("string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:""),s=this._config.decimals??1,a=this._config.label??this._defaultPrimary(),c=this._config.icon_color??"cool",l=this._defaultIcon();let d=this._config.trend??"";if(!d&&Array.isArray(this._config.spark_points)&&this._config.spark_points.length>=2){const t=this._config.spark_points,e=t[t.length-1]-t[t.length-2];d=e>0?"up":e<0?"down":"flat"}const h=i?"–":r?o.toFixed(s):e,u=!!this._config.show_spark&&Array.isArray(this._config.spark_points)&&this._config.spark_points.length>=2,p=Rt(this._config.background),m=this._config.fill_container?"fill":"";return J`
      <ha-card style=${xt(p)}>
        <div class="lirum-gesture-root ${m}">
          <div class="tile">
            <div class="header">
              <lirum-icon
                .icon=${l}
                .colorRamp=${c}
                .active=${this._isActive()}
                .unavailable=${this._isUnavailable()}
              ></lirum-icon>
              <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            </div>
            <lirum-stat
              .value=${h}
              .unit=${n}
              .label=${a}
              .trend=${d}
              .colorRamp=${c}
            ></lirum-stat>
            ${u?J`<lirum-spark
                  .points=${this._config.spark_points}
                  .colorRamp=${c}
                ></lirum-spark>`:Q}
          </div>
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .tile {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 140px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .header lirum-icon {
        --size: 36px;
      }
      .chevron {
        --mdc-icon-size: 18px;
        color: var(--lirum-muted, #6b7894);
        opacity: 0.6;
      }
      lirum-stat {
        flex: 1;
      }
      lirum-spark {
        width: 100%;
        display: block;
      }
      .fill {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .fill .tile {
        flex: 1;
      }
    `]}};Ke=e([i(t.tile.tag)],Ke),(window.customCards=window.customCards??[]).push({type:t.stack.tag,name:t.stack.name,description:t.stack.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Je=class extends Ft{constructor(){super(...arguments),this._childElements=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return lr}),document.createElement(t.stack.editor)}static getStubConfig(){return{type:`custom:${t.stack.tag}`,cards:[]}}setConfig(t){if(!t||!Array.isArray(t.cards))throw new Error('Stack card requires a "cards" array');super.setConfig(t)}getCardSize(){return this._config?.cards.length??1}updated(t){if(super.updated(t),!this._config)return;const e=this._config.cards,i=[];let o=!1;for(let t=0;t<e.length;t++){const r=Lt(this._config.background,e[t]),n=this._resolveTag(r.type),s=this._childElements[t];if(s&&s.localName===n){try{s.setConfig?.(r)}catch{}i.push(s)}else{const t=this._createChild(r);t&&(i.push(t),o=!0)}}i.length!==this._childElements.length&&(o=!0),o&&(this._childElements=i);for(const t of i)t.hass=this.hass}_resolveTag(t){return"string"!=typeof t||0===t.length?"hui-error-card":t.startsWith("custom:")?t.slice(7):`hui-${t}-card`}_createChild(t){const e=this._resolveTag(t.type);try{const i=document.createElement(e);try{i.setConfig?.(t)}catch{}return i}catch{return null}}render(){if(!this._config)return Q;const t=this._config.direction??"vertical",e=this._config.gap??12,i=Rt(this._config.background),o={display:"flex",flexDirection:"horizontal"===t?"row":"column",gap:`${e}px`,padding:"12px"};return J`
      <ha-card style=${xt(i)}>
        ${this._config.title?J`<div class="stack-title">${this._config.title}</div>`:Q}
        <div class="stack-wrap" style=${xt(o)}>
          ${this._childElements.map(t=>J`${t}`)}
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .stack-title {
        padding: 12px 16px 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--lirum-text);
        letter-spacing: -0.2px;
      }

      .stack-wrap {
        min-width: 0;
      }

      .stack-wrap > * {
        min-width: 0;
        flex: 1 1 auto;
      }
    `]}};e([S()],Je.prototype,"_childElements",void 0),Je=e([i(t.stack.tag)],Je),(window.customCards=window.customCards??[]).push({type:t.grid.tag,name:t.grid.name,description:t.grid.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ze=class extends Ft{constructor(){super(...arguments),this._childElements=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return pr}),document.createElement(t.grid.editor)}static getStubConfig(){return{type:`custom:${t.grid.tag}`,cards:[],columns:2}}setConfig(t){if(!t||!Array.isArray(t.cards))throw new Error('grid card requires a "cards" array');super.setConfig(t)}getCardSize(){const t=this._config?.columns??2,e=this._config?.cards?.length??0;return Math.ceil(e/t)}updated(t){super.updated(t);const e=this._config?.cards??[];if(e!==this._builtFromCards){this._builtFromCards=e;const t=this._config?.background;this._childElements=e.map(e=>this._createChild(Lt(t,e)))}for(const t of this._childElements)t.hass=this.hass}_resolveTag(t){return t?t.startsWith("custom:")?t.slice(7):`hui-${t}-card`:"hui-error-card"}_createChild(t){const e=this._resolveTag(t.type),i=document.createElement(e);try{i.setConfig?.(t)}catch(e){const i=document.createElement("hui-error-card");return i.setConfig?.({type:"error",error:e instanceof Error?e.message:"Failed to create card",origConfig:t}),i}return i}render(){if(!this._config)return Q;const t=this._config.columns??2,e=this._config.gap??12,i=!0===this._config.square,o=Rt(this._config.background),r={display:"grid",gridTemplateColumns:`repeat(${t}, 1fr)`,gap:`${e}px`};return J`
      <ha-card style=${xt(o)}>
        ${this._config.title?J`<div class="grid-title">${this._config.title}</div>`:Q}
        <div class="grid" style=${xt(r)}>
          ${this._childElements.map(t=>i?J`<div class="cell-square">${t}</div>`:J`${t}`)}
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .grid-title {
        padding: 10px 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: var(--lirum-text);
      }

      .grid {
        padding: 12px;
        min-width: 0;
      }

      .grid > * {
        min-width: 0;
      }

      .cell-square {
        aspect-ratio: 1;
        display: grid;
        place-items: stretch;
        min-width: 0;
      }

      .cell-square > * {
        width: 100%;
        height: 100%;
        min-width: 0;
      }
    `]}};e([S()],Ze.prototype,"_childElements",void 0),Ze=e([i(t.grid.tag)],Ze),(window.customCards=window.customCards??[]).push({type:t.conditional.tag,name:t.conditional.name,description:t.conditional.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Xe=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return _r}),document.createElement(t.conditional.editor)}static getStubConfig(){return{type:`custom:${t.conditional.tag}`,conditions:[],card:{type:"entities",entities:[]}}}setConfig(t){if(!t||!t.card||!Array.isArray(t.conditions))throw new Error('Conditional card requires "card" and "conditions"');super.setConfig(t)}getCardSize(){const t=this._childElement;if(t?.getCardSize)try{const e=t.getCardSize();if("number"==typeof e)return e}catch{}return 1}updated(t){if(super.updated(t),!this._config)return;const e=this._config.card,i=this._resolveTag(e.type),o=this._childElement;if(o&&o.localName===i)try{o.setConfig?.(e)}catch{}else{const t=this._createChild(e);t&&(this._childElement=t)}this._childElement&&(this._childElement.hass=this.hass)}_resolveTag(t){return"string"!=typeof t||0===t.length?"hui-error-card":t.startsWith("custom:")?t.slice(7):`hui-${t}-card`}_createChild(t){const e=this._resolveTag(t.type);try{const i=document.createElement(e);try{i.setConfig?.(t)}catch{}return i}catch{return null}}_evaluate(){if(!this._config)return!1;const t=this._config.conditions??[];for(const e of t)if(!this._matches(e))return!1;return!0}_matches(t){switch(t.condition){case"state":{const e=this.hass?.states[t.entity];return!!e&&(void 0!==t.state_not?e.state!==t.state_not:void 0===t.state||e.state===t.state)}case"numeric_state":{const e=this.hass?.states[t.entity];if(!e)return!1;const i=parseFloat(e.state);return!Number.isNaN(i)&&((void 0===t.above||i>t.above)&&(void 0===t.below||i<t.below))}case"screen":if("undefined"==typeof window||"function"!=typeof window.matchMedia)return!1;try{return window.matchMedia(t.media_query).matches}catch{return!1}case"user":{const e=this.hass?.user?.id;return!!e&&(Array.isArray(t.users)&&t.users.includes(e))}default:return!1}}render(){return this._config&&this._evaluate()&&this._childElement?J`${this._childElement}`:Q}};e([S()],Xe.prototype,"_childElement",void 0),Xe=e([i(t.conditional.tag)],Xe);class Qe extends yt{constructor(t){if(super(t),this.it=Q,t.type!==bt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Q||null==t)return this._t=void 0,this.it=t;if(t===X)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Qe.directiveName="unsafeHTML",Qe.resultType=1;const ti=vt(Qe);function ei(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ii(t){let e=ei(t);return e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),e=e.replace(/(^|\W)\*([^*]+)\*/g,"$1<em>$2</em>"),e=e.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'),e}let oi=class extends gt{constructor(){super(...arguments),this.content=""}render(){return J`<div class="md">${ti(function(t){const e=t.split(/\r?\n/),i=[];let o=!1,r=[],n=!1,s=!1,a=[];const c=()=>{a.length>0&&(i.push(`<p>${ii(a.join(" "))}</p>`),a=[])},l=()=>{n&&(i.push("</ul>"),n=!1),s&&(i.push("</ol>"),s=!1)};for(const t of e){if(t.match(/^```/)){c(),l(),o?(i.push(`<pre><code>${ei(r.join("\n"))}</code></pre>`),o=!1):(o=!0,r=[]);continue}if(o){r.push(t);continue}const e=t.match(/^(#{1,4})\s+(.+)$/);if(e){c(),l();const t=e[1].length;i.push(`<h${t}>${ii(e[2])}</h${t}>`);continue}const d=t.match(/^\s*[-*]\s+(.+)$/);if(d){c(),s&&(i.push("</ol>"),s=!1),n||(i.push("<ul>"),n=!0),i.push(`<li>${ii(d[1])}</li>`);continue}const h=t.match(/^\s*\d+\.\s+(.+)$/);h?(c(),n&&(i.push("</ul>"),n=!1),s||(i.push("<ol>"),s=!0),i.push(`<li>${ii(h[1])}</li>`)):""!==t.trim()?a.push(t.trim()):(c(),l())}return c(),l(),o&&i.push(`<pre><code>${ei(r.join("\n"))}</code></pre>`),i.join("")}(this.content))}</div>`}static{this.styles=c`
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
  `}};e([L()],oi.prototype,"content",void 0),oi=e([i("lirum-markdown")],oi),(window.customCards=window.customCards??[]).push({type:t.markdown.tag,name:t.markdown.name,description:t.markdown.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const ri=/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,ni=/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;let si=class extends Ft{static async getConfigElement(){return await Promise.resolve().then(function(){return $r}),document.createElement(t.markdown.editor)}static getStubConfig(){return{type:`custom:${t.markdown.tag}`,content:"## Hello\n\nWrite **markdown** here."}}setConfig(t){super.setConfig(t)}getCardSize(){return 2}_interpolate(t){if(!t)return"";let e=t.replace(ni,(t,e,i)=>{const o=this.hass?.states[e];if(!o)return"";const r=o.attributes[i];return null==r?"":String(r)});return e=e.replace(ri,(t,e)=>{const i=this.hass?.states[e];return i?i.state:"unknown"}),e}render(){if(!this._config)return Q;const t=this._config.text_align??"start",e=Rt(this._config.background),i=this._interpolate(this._config.content??"");return J`
      <ha-card style=${xt(e)}>
        <div class="lirum-md-wrap" style=${xt({textAlign:t})}>
          ${this._config.title?J`<div class="md-title">${this._config.title}</div>`:Q}
          <lirum-markdown .content=${i}></lirum-markdown>
        </div>
      </ha-card>
    `}static{this.styles=[...Ft.styles,c`
      .lirum-md-wrap {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .md-title {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
        color: var(--lirum-text);
        letter-spacing: -0.3px;
      }
    `]}};si=e([i(t.markdown.tag)],si);const ai=Object.keys(t).length,ci=["#1ee0ff","#2a7bff","#0a3aa0"];console.info(`%c LIRUM %c v0.2.3 %c ${ai} cards `,`background:${ci[2]};color:white;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600`,`background:${ci[1]};color:white;padding:2px 6px`,`background:${ci[0]};color:#001020;padding:2px 6px;border-radius:0 3px 3px 0`);const li=(t,e)=>({name:"",type:"expandable",title:e,schema:[{name:t,selector:{ui_action:{actions:["more-info","toggle","navigate","url","call-service","assist","none"]}}}]}),di=[{value:"cool",label:"Cool (cyan→blue)"},{value:"warm",label:"Warm (orange)"},{value:"energy",label:"Energy (green)"},{value:"alert",label:"Alert (red)"},{value:"rose",label:"Rose (pink)"},{value:"amber",label:"Amber (yellow)"},{value:"neutral",label:"Neutral"}];function hi(){return{name:"",type:"expandable",title:"Appearance",schema:[{name:"",type:"grid",schema:[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"horizontal",label:"Horizontal"},{value:"vertical",label:"Vertical"}]}}},{name:"fill_container",selector:{boolean:{}}}]},{name:"",type:"grid",schema:[{name:"icon_color",selector:{select:{mode:"dropdown",custom_value:!0,options:di}}},{name:"background",selector:{text:{}}}]}]}}function ui(){return{name:"",type:"expandable",title:"Interactions",schema:[li("tap_action","Tap behavior"),li("hold_action","Hold behavior"),li("double_tap_action","Double-tap behavior")]}}const pi={entity:"Entity",name:"Custom name",icon:"Icon (mdi:…)",icon_color:"Icon color",layout:"Layout",fill_container:"Fill container",background:'Background (CSS / "transparent")',tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double-tap action",title:"Title",subtitle:"Subtitle",alignment:"Alignment"};function mi(t){return[{name:"entity",required:!0,selector:t.length>0?{entity:{domain:t}}:{entity:{}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}]}const gi=[...mi([]),hi(),ui()];let fi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${gi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],fi.prototype,"hass",void 0),e([S()],fi.prototype,"_config",void 0),fi=e([i(t.entity.editor)],fi);var _i=Object.freeze({__proto__:null,get LirumEntityEditor(){return fi}});const bi=[...mi(["switch","input_boolean","automation","remote","siren"]),hi(),ui()];let vi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],vi.prototype,"hass",void 0),e([S()],vi.prototype,"_config",void 0),vi=e([i(t.switch.editor)],vi);var yi=Object.freeze({__proto__:null,get LirumSwitchEditor(){return vi}});const $i=[...mi(["light"]),{name:"",type:"grid",schema:[{name:"use_light_color",selector:{boolean:{}}},{name:"show_brightness_control",selector:{boolean:{}}},{name:"show_color_temp_control",selector:{boolean:{}}},{name:"show_color_control",selector:{boolean:{}}},{name:"collapsible_controls",selector:{boolean:{}}}]},hi(),ui()],wi={...pi,use_light_color:"Derive icon color from light",show_brightness_control:"Show brightness slider",show_color_temp_control:"Show color-temp slider",show_color_control:"Show color picker",collapsible_controls:"Collapsible controls"};let xi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>wi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$i}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],xi.prototype,"hass",void 0),e([S()],xi.prototype,"_config",void 0),xi=e([i(t.light.editor)],xi);var ki=Object.freeze({__proto__:null,get LirumLightEditor(){return xi}});const Ci=[...mi(["input_number","number"]),hi(),ui()];let Ei=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ci}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ei.prototype,"hass",void 0),e([S()],Ei.prototype,"_config",void 0),Ei=e([i(t.number.editor)],Ei);var Li=Object.freeze({__proto__:null,get LirumNumberEditor(){return Ei}});const Si=[...mi(["sensor","binary_sensor"]),{name:"",type:"grid",schema:[{name:"decimals",selector:{number:{mode:"box",min:0,max:4,step:1}}},{name:"show_bar",selector:{boolean:{}}},{name:"show_trend",selector:{boolean:{}}}]},hi(),ui()],Ai={...pi,decimals:"Decimal precision",show_bar:"Show bar (battery / %)",show_trend:"Show trend sparkline"};let Pi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Ai[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Si}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Pi.prototype,"hass",void 0),e([S()],Pi.prototype,"_config",void 0),Pi=e([i(t.sensor.editor)],Pi);var zi=Object.freeze({__proto__:null,get LirumSensorEditor(){return Pi}});const Ti=[...mi([]),{name:"",type:"grid",schema:[{name:"min",selector:{number:{mode:"box",step:"any"}}},{name:"max",selector:{number:{mode:"box",step:"any"}}},{name:"step",selector:{number:{mode:"box",step:"any"}}},{name:"unit",selector:{text:{}}}]},{name:"service",selector:{text:{}}},{name:"service_key",selector:{text:{}}},hi(),ui()],Ri={...pi,min:"Minimum",max:"Maximum",step:"Step",unit:"Unit (overrides entity unit)",service:"Write service (e.g. input_number.set_value)",service_key:"Service data key (default: value)"};let Ui=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Ri[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ti}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ui.prototype,"hass",void 0),e([S()],Ui.prototype,"_config",void 0),Ui=e([i(t.slider.editor)],Ui);var Mi=Object.freeze({__proto__:null,get LirumSliderEditor(){return Ui}});const Oi=[...mi(["cover"]),{name:"",type:"grid",schema:[{name:"show_buttons_control",selector:{boolean:{}}},{name:"show_position_control",selector:{boolean:{}}},{name:"show_tilt_position_control",selector:{boolean:{}}}]},hi(),ui()],ji={...pi,show_buttons_control:"Show open/stop/close buttons",show_position_control:"Show position slider",show_tilt_position_control:"Show tilt position slider"};let Ni=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>ji[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Oi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ni.prototype,"hass",void 0),e([S()],Ni.prototype,"_config",void 0),Ni=e([i(t.cover.editor)],Ni);var Bi=Object.freeze({__proto__:null,get LirumCoverEditor(){return Ni}});const Ii=[...mi(["climate"]),{name:"",type:"grid",schema:[{name:"show_temperature_control",selector:{boolean:{}}}]},hi(),ui()],Di={...pi,show_temperature_control:"Show temperature slider"};let Hi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Di[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ii}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Hi.prototype,"hass",void 0),e([S()],Hi.prototype,"_config",void 0),Hi=e([i(t.climate.editor)],Hi);var Fi=Object.freeze({__proto__:null,get LirumClimateEditor(){return Hi}});const Vi=[...mi(["fan"]),{name:"",type:"grid",schema:[{name:"show_percentage_control",selector:{boolean:{}}},{name:"show_oscillate_control",selector:{boolean:{}}}]},hi(),ui()],Wi={...pi,show_percentage_control:"Show speed slider",show_oscillate_control:"Show oscillate chip"};let Yi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Wi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Vi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Yi.prototype,"hass",void 0),e([S()],Yi.prototype,"_config",void 0),Yi=e([i(t.fan.editor)],Yi);var qi=Object.freeze({__proto__:null,get LirumFanEditor(){return Yi}});const Gi=[...mi(["media_player"]),{name:"",type:"grid",schema:[{name:"show_transport_control",selector:{boolean:{}}},{name:"show_volume_control",selector:{boolean:{}}},{name:"show_mute_control",selector:{boolean:{}}}]},hi(),ui()],Ki={...pi,show_transport_control:"Show transport controls",show_volume_control:"Show volume slider",show_mute_control:"Show mute toggle"};let Ji=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Ki[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Gi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ji.prototype,"hass",void 0),e([S()],Ji.prototype,"_config",void 0),Ji=e([i(t.media.editor)],Ji);var Zi=Object.freeze({__proto__:null,get LirumMediaEditor(){return Ji}});const Xi=[...mi(["lock"]),hi(),ui()];let Qi=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Qi.prototype,"hass",void 0),e([S()],Qi.prototype,"_config",void 0),Qi=e([i(t.lock.editor)],Qi);var to=Object.freeze({__proto__:null,get LirumLockEditor(){return Qi}});const eo=[...mi(["person","device_tracker"]),hi(),ui()];let io=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${eo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],io.prototype,"hass",void 0),e([S()],io.prototype,"_config",void 0),io=e([i(t.person.editor)],io);var oo=Object.freeze({__proto__:null,get LirumPersonEditor(){return io}});const ro=[...mi(["select","input_select"]),{name:"inline_options",selector:{boolean:{}}},hi(),ui()],no={...pi,inline_options:"Show options inline"};let so=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>no[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ro}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],so.prototype,"hass",void 0),e([S()],so.prototype,"_config",void 0),so=e([i(t.select.editor)],so);var ao=Object.freeze({__proto__:null,get LirumSelectEditor(){return so}});const co=[...mi(["vacuum"]),{name:"show_control",selector:{boolean:{}}},hi(),ui()],lo={...pi,show_control:"Show control chips"};let ho=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>lo[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${co}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],ho.prototype,"hass",void 0),e([S()],ho.prototype,"_config",void 0),ho=e([i(t.vacuum.editor)],ho);var uo=Object.freeze({__proto__:null,get LirumVacuumEditor(){return ho}});const po=[...mi(["update"]),hi(),ui()];let mo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${po}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],mo.prototype,"hass",void 0),e([S()],mo.prototype,"_config",void 0),mo=e([i(t.update.editor)],mo);var go=Object.freeze({__proto__:null,get LirumUpdateEditor(){return mo}});const fo=[...mi(["humidifier"]),{name:"",type:"grid",schema:[{name:"show_target_control",selector:{boolean:{}}},{name:"show_mode_control",selector:{boolean:{}}}]},hi(),ui()],_o={...pi,show_target_control:"Show target slider",show_mode_control:"Show mode chips"};let bo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>_o[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${fo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],bo.prototype,"hass",void 0),e([S()],bo.prototype,"_config",void 0),bo=e([i(t.humidifier.editor)],bo);var vo=Object.freeze({__proto__:null,get LirumHumidifierEditor(){return bo}});const yo=[...mi(["alarm_control_panel"]),{name:"",type:"grid",schema:[{name:"show_keypad",selector:{boolean:{}}}]},hi(),ui()],$o={...pi,show_keypad:"Show keypad"};let wo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>$o[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${yo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],wo.prototype,"hass",void 0),e([S()],wo.prototype,"_config",void 0),wo=e([i(t.alarm.editor)],wo);var xo=Object.freeze({__proto__:null,get LirumAlarmEditor(){return wo}});const ko=[...mi([]),{name:"",type:"grid",schema:[{name:"secondary",selector:{text:{}}}]},hi(),ui()],Co={...pi,secondary:"Secondary text"};let Eo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Co[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ko}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Eo.prototype,"hass",void 0),e([S()],Eo.prototype,"_config",void 0),Eo=e([i(t.button.editor)],Eo);var Lo=Object.freeze({__proto__:null,get LirumButtonEditor(){return Eo}});const So=[{name:"chips",selector:{object:{}}},{name:"alignment",selector:{select:{mode:"dropdown",options:[{value:"start",label:"Start"},{value:"center",label:"Center"},{value:"end",label:"End"},{value:"justify",label:"Justify"}]}}}];let Ao=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${So}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ao.prototype,"hass",void 0),e([S()],Ao.prototype,"_config",void 0),Ao=e([i(t.chips.editor)],Ao);var Po=Object.freeze({__proto__:null,get LirumChipsEditor(){return Ao}});const zo=[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"alignment",selector:{select:{mode:"dropdown",options:[{value:"start",label:"Start"},{value:"center",label:"Center"},{value:"end",label:"End"}]}}},{name:"background",selector:{text:{}}}];let To=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${zo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],To.prototype,"hass",void 0),e([S()],To.prototype,"_config",void 0),To=e([i(t.title.editor)],To);var Ro=Object.freeze({__proto__:null,get LirumTitleEditor(){return To}});const Uo=[{name:"entity",selector:{entity:{}}},{name:"primary",selector:{text:{multiline:!0}}},{name:"secondary",selector:{text:{multiline:!0}}},{name:"",type:"grid",schema:[{name:"icon",selector:{text:{}}},{name:"icon_color",selector:{text:{}}}]},{name:"picture",selector:{text:{}}},hi(),ui()],Mo={...pi,primary:"Primary text (template)",secondary:"Secondary text (template)",icon:"Icon (mdi:… or template)",icon_color:"Icon color (ramp or template)",picture:"Picture URL (template)"};let Oo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Mo[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Uo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Oo.prototype,"hass",void 0),e([S()],Oo.prototype,"_config",void 0),Oo=e([i(t.template.editor)],Oo);var jo=Object.freeze({__proto__:null,get LirumTemplateEditor(){return Oo}});const No=[...mi(["scene"]),hi(),ui()];let Bo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${No}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Bo.prototype,"hass",void 0),e([S()],Bo.prototype,"_config",void 0),Bo=e([i(t.scene.editor)],Bo);var Io=Object.freeze({__proto__:null,get LirumSceneEditor(){return Bo}});const Do=[...mi(["script"]),hi(),ui()];let Ho=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>pi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Do}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Ho.prototype,"hass",void 0),e([S()],Ho.prototype,"_config",void 0),Ho=e([i(t.script.editor)],Ho);var Fo=Object.freeze({__proto__:null,get LirumScriptEditor(){return Ho}});const Vo=[...mi(["camera"]),{name:"",type:"grid",schema:[{name:"aspect_ratio",selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_name",selector:{boolean:{}}}]},hi(),ui()],Wo={...pi,aspect_ratio:"Aspect ratio (e.g. 16:9)",show_state:"Show state pill",show_name:"Show name pill"};let Yo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Wo[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Vo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Yo.prototype,"hass",void 0),e([S()],Yo.prototype,"_config",void 0),Yo=e([i(t.camera.editor)],Yo);var qo=Object.freeze({__proto__:null,get LirumCameraEditor(){return Yo}});const Go=[...mi(["weather"]),{name:"",type:"grid",schema:[{name:"show_forecast",selector:{boolean:{}}},{name:"forecast_days",selector:{number:{mode:"box",min:1,max:7,step:1}}},{name:"show_details",selector:{boolean:{}}}]},hi(),ui()],Ko={...pi,show_forecast:"Show forecast strip",forecast_days:"Forecast days (1–7)",show_details:"Show humidity & wind row"};let Jo=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Ko[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Go}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],Jo.prototype,"hass",void 0),e([S()],Jo.prototype,"_config",void 0),Jo=e([i(t.weather.editor)],Jo);var Zo=Object.freeze({__proto__:null,get LirumWeatherEditor(){return Jo}});const Xo=[...mi(["sensor","input_number","number"]),{name:"",type:"grid",schema:[{name:"min",selector:{number:{mode:"box"}}},{name:"max",selector:{number:{mode:"box"}}},{name:"size",selector:{number:{mode:"box",min:80,max:600,step:10}}}]},{name:"",type:"grid",schema:[{name:"unit",selector:{text:{}}},{name:"label",selector:{text:{}}}]},hi(),ui()],Qo={...pi,min:"Minimum",max:"Maximum",size:"Size (px)",unit:"Unit override",label:"Inner label"};let tr=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>Qo[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xo}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],tr.prototype,"hass",void 0),e([S()],tr.prototype,"_config",void 0),tr=e([i(t.gauge.editor)],tr);var er=Object.freeze({__proto__:null,get LirumGaugeEditor(){return tr}});const ir=[...mi([]),{name:"",type:"grid",schema:[{name:"label",selector:{text:{}}},{name:"unit",selector:{text:{}}},{name:"decimals",selector:{number:{mode:"box",min:0,max:4,step:1}}},{name:"show_spark",selector:{boolean:{}}}]},hi(),ui()],or={...pi,label:"Caption (under number)",unit:"Unit override",decimals:"Decimal precision",show_spark:"Show sparkline"};let rr=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>or[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ir}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],rr.prototype,"hass",void 0),e([S()],rr.prototype,"_config",void 0),rr=e([i(t.tile.editor)],rr);var nr=Object.freeze({__proto__:null,get LirumTileEditor(){return rr}});const sr=[{name:"title",selector:{text:{}}},{name:"direction",selector:{select:{mode:"dropdown",options:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}]}}},{name:"gap",selector:{number:{min:0,max:64,step:1,mode:"box"}}},{name:"background",selector:{text:{}}},{name:"cards",selector:{object:{}}}],ar={...pi,direction:"Direction",gap:"Gap (px)",cards:"Cards (YAML list)"};let cr=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>ar[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${sr}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],cr.prototype,"hass",void 0),e([S()],cr.prototype,"_config",void 0),cr=e([i(t.stack.editor)],cr);var lr=Object.freeze({__proto__:null,get LirumStackEditor(){return cr}});const dr={...pi,columns:"Columns",gap:"Gap (px)",square:"Square cells",cards:"Cards"},hr=[{name:"title",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"columns",selector:{number:{min:1,max:6,mode:"box"}}},{name:"gap",selector:{number:{min:0,max:64,mode:"box"}}}]},{name:"square",selector:{boolean:{}}},{name:"background",selector:{text:{}}},{name:"cards",selector:{object:{}}}];let ur=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>dr[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${hr}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],ur.prototype,"hass",void 0),e([S()],ur.prototype,"_config",void 0),ur=e([i(t.grid.editor)],ur);var pr=Object.freeze({__proto__:null,get LirumGridEditor(){return ur}});const mr=[{name:"conditions",selector:{object:{}}},{name:"card",selector:{object:{}}}],gr={...pi,conditions:"Conditions (YAML list)",card:"Inner card (YAML)"};let fr=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>gr[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${mr}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],fr.prototype,"hass",void 0),e([S()],fr.prototype,"_config",void 0),fr=e([i(t.conditional.editor)],fr);var _r=Object.freeze({__proto__:null,get LirumConditionalEditor(){return fr}});const br=[{name:"title",selector:{text:{}}},{name:"content",selector:{text:{multiline:!0}}},{name:"text_align",selector:{select:{mode:"dropdown",options:[{value:"start",label:"Start"},{value:"center",label:"Center"},{value:"end",label:"End"}]}}},{name:"background",selector:{text:{}}}],vr={...pi,content:"Markdown content",text_align:"Text alignment"};let yr=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>vr[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?J`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${br}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Q}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([L({attribute:!1})],yr.prototype,"hass",void 0),e([S()],yr.prototype,"_config",void 0),yr=e([i(t.markdown.editor)],yr);var $r=Object.freeze({__proto__:null,get LirumMarkdownEditor(){return yr}})}();
