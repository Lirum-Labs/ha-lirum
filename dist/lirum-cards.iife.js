!function(){"use strict";const t={entity:{tag:"lirum-entity-card",editor:"lirum-entity-card-editor",name:"Lirum Entity",desc:"Universal entity card."},switch:{tag:"lirum-switch-card",editor:"lirum-switch-card-editor",name:"Lirum Switch",desc:"Toggleable switch / boolean."},light:{tag:"lirum-light-card",editor:"lirum-light-card-editor",name:"Lirum Light",desc:"Brightness, color temp, and color control."},number:{tag:"lirum-number-card",editor:"lirum-number-card-editor",name:"Lirum Number",desc:"input_number / number slider."},slider:{tag:"lirum-slider-card",editor:"lirum-slider-card-editor",name:"Lirum Slider",desc:"Generic value slider."},cover:{tag:"lirum-cover-card",editor:"lirum-cover-card-editor",name:"Lirum Cover",desc:"Blinds, garage doors, shades."},climate:{tag:"lirum-climate-card",editor:"lirum-climate-card-editor",name:"Lirum Climate",desc:"Thermostat / HVAC."},fan:{tag:"lirum-fan-card",editor:"lirum-fan-card-editor",name:"Lirum Fan",desc:"Fan speed and oscillation."},media:{tag:"lirum-media-card",editor:"lirum-media-card-editor",name:"Lirum Media",desc:"Media player."},lock:{tag:"lirum-lock-card",editor:"lirum-lock-card-editor",name:"Lirum Lock",desc:"Locks and unlock."},person:{tag:"lirum-person-card",editor:"lirum-person-card-editor",name:"Lirum Person",desc:"Person presence."},select:{tag:"lirum-select-card",editor:"lirum-select-card-editor",name:"Lirum Select",desc:"select / input_select."},vacuum:{tag:"lirum-vacuum-card",editor:"lirum-vacuum-card-editor",name:"Lirum Vacuum",desc:"Vacuum cleaner."},update:{tag:"lirum-update-card",editor:"lirum-update-card-editor",name:"Lirum Update",desc:"Available updates."},humidifier:{tag:"lirum-humidifier-card",editor:"lirum-humidifier-card-editor",name:"Lirum Humidifier",desc:"Humidity control."},alarm:{tag:"lirum-alarm-card",editor:"lirum-alarm-card-editor",name:"Lirum Alarm",desc:"Alarm panel with keypad."},chips:{tag:"lirum-chips-card",editor:"lirum-chips-card-editor",name:"Lirum Chips",desc:"Pill row of mini-entities."},title:{tag:"lirum-title-card",editor:"lirum-title-card-editor",name:"Lirum Title",desc:"Section header."},template:{tag:"lirum-template-card",editor:"lirum-template-card-editor",name:"Lirum Template",desc:"Free-form template card."}};function e(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const i=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},o=globalThis,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new a(i,t,n)},l=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:h,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,_=globalThis,f=_.trustedTypes,b=f?f.emptyScript:"",v=_.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!h(t,e),x={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...m(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=o.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const n=r.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const n=this.constructor;if(!1===o&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??w)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[y("elementProperties")]=new Map,C[y("finalized")]=new Map,v?.({ReactiveElement:C}),(_.reactiveElementVersions??=[]).push("2.1.2");const k={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},E=(t=k,e,i)=>{const{kind:o,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function A(t){return(e,i)=>"object"==typeof i?E(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function S(t){return A({...t,state:!0,attribute:!1})}const L=globalThis,P=t=>t,U=L.trustedTypes,T=U?U.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+R,j=`<${M}>`,z=document,I=()=>z.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,B="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,F=/>/g,W=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,q=/"/g,G=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),J=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),X=new WeakMap,Q=z.createTreeWalker(z,129);function tt(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}const et=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":3===e?"<math>":"",s=V;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(s.lastIndex=h,c=s.exec(i),null!==c);)h=s.lastIndex,s===V?"!--"===c[1]?s=D:void 0!==c[1]?s=F:void 0!==c[2]?(G.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=W):void 0!==c[3]&&(s=W):s===W?">"===c[0]?(s=r??V,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?W:'"'===c[3]?q:Y):s===q||s===Y?s=W:s===D||s===F?s=V:(s=W,r=void 0);const d=s===W&&t[e+1].startsWith("/>")?" ":"";n+=s===V?i+j:l>=0?(o.push(a),i.slice(0,l)+O+i.slice(l)+R+d):i+R+(-2===l?e:d)}return[tt(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class it{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,a=this.parts,[c,l]=et(t,e);if(this.el=it.createElement(c,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Q.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(O)){const e=l[n++],i=o.getAttribute(t).split(R),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?at:"?"===s[1]?ct:"@"===s[1]?lt:st}),o.removeAttribute(t)}else t.startsWith(R)&&(a.push({type:6,index:r}),o.removeAttribute(t));if(G.test(o.tagName)){const t=o.textContent.split(R),e=t.length-1;if(e>0){o.textContent=U?U.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],I()),Q.nextNode(),a.push({type:2,index:++r});o.append(t[e],I())}}}else if(8===o.nodeType)if(o.data===M)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(R,t+1));)a.push({type:7,index:r}),t+=R.length-1}r++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function ot(t,e,i=t,o){if(e===J)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const n=H(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=ot(t,r._$AS(t,e.values),r,o)),e}class rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??z).importNode(e,!0);Q.currentNode=o;let r=Q.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new nt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ht(r,this,t)),this._$AV.push(e),a=i[++s]}n!==a?.index&&(r=Q.nextNode(),n++)}return Q.currentNode=z,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class nt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ot(this,t,e),H(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=it.createElement(tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new rt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new it(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new nt(this.O(I()),this.O(I()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=P(t).nextSibling;P(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=ot(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==J,n&&(this._$AH=t);else{const o=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=ot(this,o[i+s],e,s),a===J&&(a=this._$AH[s]),n||=!H(a)||a!==this._$AH[s],a===Z?t=Z:t!==Z&&(t+=(a??"")+r[s+1]),this._$AH[s]=a}n&&!o&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class ct extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class lt extends st{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=ot(this,t,e,0)??Z)===J)return;const i=this._$AH,o=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Z&&(i===Z||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ot(this,t)}}const dt=L.litHtmlPolyfillSupport;dt?.(it,nt),(L.litHtmlVersions??=[]).push("3.3.2");const ut=globalThis;let mt=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new nt(e.insertBefore(I(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};mt._$litElement$=!0,mt.finalized=!0,ut.litElementHydrateSupport?.({LitElement:mt});const pt=ut.litElementPolyfillSupport;pt?.({LitElement:mt}),(ut.litElementVersions??=[]).push("4.2.2");const gt=1;let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const ft="important",bt=" !"+ft,vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends _t{constructor(t){if(super(t),t.type!==gt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return null==o?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const o=e[t];if(null!=o){this.ft.add(t);const e="string"==typeof o&&o.endsWith(bt);t.includes("-")||e?i.setProperty(t,e?o.slice(0,-11):o,e?ft:""):i[t]=o}}return J}});function yt(t){return t.split(".")[0]??""}function $t(t){if(!t)return!1;const e=t.state;if("unavailable"===e||"unknown"===e)return!1;switch(yt(t.entity_id)){case"climate":return"off"!==e;case"cover":return"open"===e||"opening"===e||"closing"===e;case"media_player":return"off"!==e&&"idle"!==e&&"standby"!==e;case"vacuum":return"docked"!==e&&"off"!==e;case"plant":return"problem"===e;case"lock":return"locked"!==e;case"alarm_control_panel":return"disarmed"!==e;case"person":case"device_tracker":return"home"===e;case"humidifier":case"fan":case"light":case"switch":case"input_boolean":case"binary_sensor":case"automation":case"group":case"remote":case"siren":case"water_heater":return"on"===e||"home"===e||"open"===e||"true"===e;default:return"off"!==e&&"closed"!==e&&"no"!==e&&"false"!==e}}function wt(t,e){const i=t?.attributes.supported_features;return"number"==typeof i&&0!==(i&e)}const xt={alarm_control_panel:"mdi:shield-home",automation:"mdi:robot",binary_sensor:"mdi:radiobox-blank",button:"mdi:gesture-tap-button",camera:"mdi:video",climate:"mdi:thermostat",cover:"mdi:window-shutter",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",humidifier:"mdi:air-humidifier",input_boolean:"mdi:toggle-switch",input_button:"mdi:gesture-tap-button",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:form-textbox",light:"mdi:lightbulb",lock:"mdi:lock",media_player:"mdi:cast",number:"mdi:ray-vertex",person:"mdi:account",plant:"mdi:flower",remote:"mdi:remote",scene:"mdi:palette",script:"mdi:script-text",select:"mdi:format-list-bulleted",sensor:"mdi:eye",siren:"mdi:bullhorn",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer-outline",update:"mdi:package-down",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weather:"mdi:weather-partly-cloudy",zone:"mdi:map-marker-radius"};function Ct(t,e){if(!t&&!e)return"mdi:bookmark-outline";const i=yt(t?.entity_id??e);return function(t,e){const i=e?.state;switch(t){case"cover":return"closed"===i?"mdi:window-shutter":"opening"===i?"mdi:arrow-up-box":"closing"===i?"mdi:arrow-down-box":"mdi:window-shutter-open";case"lock":return"locked"===i?"mdi:lock":"mdi:lock-open-variant";case"alarm_control_panel":switch(i){case"disarmed":return"mdi:shield-off";case"armed_home":return"mdi:shield-home";case"armed_away":return"mdi:shield-lock";case"armed_night":return"mdi:shield-moon";case"armed_vacation":return"mdi:shield-airplane";case"pending":case"arming":return"mdi:shield-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:shield"}case"media_player":return"playing"===i?"mdi:play":"paused"===i?"mdi:pause":"idle"===i||"standby"===i?"mdi:speaker":"off"===i?"mdi:speaker-off":"mdi:cast";case"vacuum":return"cleaning"===i?"mdi:robot-vacuum-variant":"returning"===i?"mdi:home-import-outline":"docked"===i?"mdi:robot-vacuum":"mdi:robot-vacuum-alert";case"switch":return $t(e)?"mdi:flash":"mdi:flash-off";case"light":return $t(e)?"mdi:lightbulb-on":"mdi:lightbulb-outline";case"fan":return $t(e)?"mdi:fan":"mdi:fan-off";case"humidifier":return $t(e)?"mdi:air-humidifier":"mdi:air-humidifier-off"}}(i,t)??xt[i]??"mdi:bookmark-outline"}const kt={cool:{c1:"#1ee0ff",c2:"#2a7bff",c3:"#0a3aa0"},warm:{c1:"#ffb347",c2:"#ff6e3c",c3:"#7a1b07"},energy:{c1:"#a8ff5a",c2:"#3acf3a",c3:"#1a5f1a"},alert:{c1:"#ff5a7a",c2:"#d12338",c3:"#5a0a16"},rose:{c1:"#ff9ae0",c2:"#c046b3",c3:"#5a1b54"},amber:{c1:"#ffd35a",c2:"#e89a1a",c3:"#6e4408"},neutral:{c1:"#9dadc7",c2:"#5d6f8f",c3:"#1f2a3e"}},Et="radial-gradient(120% 80% at 50% 0%, rgba(40, 90, 200, 0.25), transparent 60%), linear-gradient(180deg, #0b1326, #060a14)";function At(t){return t?t in kt?kt[t]:{c1:t,c2:t,c3:t}:kt.cool}function St(t){const e=(t??"").trim(),i=0===e.length?Et:e,o="transparent"===i.toLowerCase()||"theme"===i.toLowerCase();return{"--lirum-bg":o?"transparent":i,"--lirum-text":o?"var(--primary-text-color, #eef3ff)":"#eef3ff","--lirum-muted":o?"var(--secondary-text-color, #6b7894)":"#6b7894","--lirum-card-border":o?"var(--ha-card-border-color, var(--divider-color, rgba(0,0,0,0.12)))":"color-mix(in oklab, currentColor 12%, transparent)"}}const Lt=new Set(["light","switch","fan","input_boolean","automation","remote","siren"]),Pt={light:{domain:"light",service:"toggle"},switch:{domain:"switch",service:"toggle"},fan:{domain:"fan",service:"toggle"},input_boolean:{domain:"input_boolean",service:"toggle"},automation:{domain:"automation",service:"toggle"},remote:{domain:"remote",service:"toggle"},cover:{domain:"cover",service:"toggle"},humidifier:{domain:"humidifier",service:"toggle"},climate:{domain:"climate",service:"toggle"},media_player:{domain:"media_player",service:"media_play_pause"},siren:{domain:"siren",service:"toggle"}};function Ut(t,e,i,o){const r=("hold"===o?i.hold_action:"double_tap"===o?i.double_tap_action:i.tap_action)??function(t,e){if("tap"===e){if(!t)return{action:"none"};const e=yt(t);return Lt.has(e)?{action:"toggle"}:{action:"more-info"}}return{action:"more-info"}}(i.entity,o);!function(t,e,i,o){switch(o.action){case"none":return;case"more-info":if(!i)return;return void Tt(t,i);case"toggle":{if(!i)return;const o=yt(i),r=Pt[o];return void(r?e.callService(r.domain,r.service,{entity_id:i}):Tt(t,i))}case"call-service":{const[t,i]=o.service.split(".");if(!t||!i)return;const r={...o.service_data??{}};return void e.callService(t,i,r,o.target)}case"navigate":return window.history.pushState(null,"",o.navigation_path),void window.dispatchEvent(new Event("location-changed"));case"url":return void window.open(o.url_path,"_blank","noopener,noreferrer");case"assist":t.dispatchEvent(new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:o,action:"assist"}}))}}(t,e,i.entity,r)}function Tt(t,e){t.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}const Ot=c`
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
    background: var(--lirum-bg);
    color: var(--lirum-text);
    border: 1px solid var(--lirum-card-border);
    border-radius: var(--lirum-radius);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35),
      0 0 0 1px color-mix(in oklab, currentColor 2%, transparent) inset;
    overflow: hidden;
    font-family: 'Inter', var(--primary-font-family, system-ui, sans-serif);
    position: relative;
  }

  ha-card::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(1px 1px at 20% 30%, color-mix(in oklab, currentColor 60%, transparent), transparent),
      radial-gradient(1px 1px at 70% 60%, color-mix(in oklab, currentColor 40%, transparent), transparent),
      radial-gradient(1px 1px at 40% 80%, color-mix(in oklab, currentColor 50%, transparent), transparent),
      radial-gradient(1px 1px at 85% 20%, color-mix(in oklab, currentColor 30%, transparent), transparent);
    opacity: 0.18;
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
  }
`,Rt=c`
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
`,Mt=c`
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
`;let jt=class extends mt{constructor(){super(...arguments),this.icon="mdi:bookmark-outline",this.colorRamp="cool",this.active=!1,this.unavailable=!1,this.pulse=!1,this.intensity=1,this.picture=""}render(){const t=At(this.colorRamp),e=Math.max(0,Math.min(1,this.intensity)),i=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};--halo:${e}`;return K`
      <div
        class="wrap ${this.active?"active":""} ${this.unavailable?"unavail":""} ${this.pulse?"pulse lirum-anim":""}"
        style=${i}
      >
        <div class="glow"></div>
        ${this.picture?K`<img src=${this.picture} alt="" />`:K`<ha-icon icon=${this.icon}></ha-icon>`}
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
    @keyframes lirum-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 6px color-mix(in oklab, var(--c1) 50%, transparent)); }
      50%      { filter: drop-shadow(0 0 14px color-mix(in oklab, var(--c1) 80%, transparent)); }
    }
  `}};e([A()],jt.prototype,"icon",void 0),e([A()],jt.prototype,"colorRamp",void 0),e([A({type:Boolean})],jt.prototype,"active",void 0),e([A({type:Boolean})],jt.prototype,"unavailable",void 0),e([A({type:Boolean})],jt.prototype,"pulse",void 0),e([A({type:Number})],jt.prototype,"intensity",void 0),e([A()],jt.prototype,"picture",void 0),jt=e([i("lirum-icon")],jt);class zt extends mt{setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t}getCardSize(){return 1}disconnectedCallback(){super.disconnectedCallback(),this._unbindGestures?.(),this._unbindGestures=void 0,this._gestureRoot=void 0}updated(t){const e=this.renderRoot.querySelector(".lirum-gesture-root");e&&e!==this._gestureRoot&&(this._unbindGestures?.(),this._gestureRoot=e,this._unbindGestures=function(t,e){const i={downAt:0,lastTap:0},o=t=>{0!==t.button&&"mouse"===t.pointerType||(i.downAt=performance.now(),i.holdTimer=window.setTimeout(()=>{i.holdTimer=void 0,e("hold"),i.downAt=0},500))},r=()=>{if(i.holdTimer&&(window.clearTimeout(i.holdTimer),i.holdTimer=void 0),0===i.downAt)return;const t=performance.now()-i.downAt;if(i.downAt=0,t>=500)return;const o=performance.now();o-i.lastTap<=300?(i.lastTap=0,e("double_tap")):(i.lastTap=o,window.setTimeout(()=>{0!==i.lastTap&&performance.now()-i.lastTap>=300&&(i.lastTap=0,e("tap"))},310))},n=()=>{i.holdTimer&&window.clearTimeout(i.holdTimer),i.holdTimer=void 0,i.downAt=0};return t.addEventListener("pointerdown",o),t.addEventListener("pointerup",r),t.addEventListener("pointercancel",n),t.addEventListener("pointerleave",n),()=>{t.removeEventListener("pointerdown",o),t.removeEventListener("pointerup",r),t.removeEventListener("pointercancel",n),t.removeEventListener("pointerleave",n)}}(e,t=>this._invokeAction(t)))}_invokeAction(t){this.hass&&this._config&&Ut(this,this.hass,this._config,t)}_stateObj(t){const e=t??this._config?.entity;if(e&&this.hass)return this.hass.states[e]}_renderError(t){return K`<ha-card><div class="error">${t}</div></ha-card>`}_renderTile(t){const e=this._config?.layout??"default",i=this._config?.fill_container?"fill":"",o=St(this._config?.background);return K`
      <ha-card style=${vt(o)}>
        <div class="lirum-gesture-root ${i}">
          <div class="lirum-tile ${e}">
            ${t.icon||t.iconPicture?K`<lirum-icon
                  class="icon"
                  .icon=${t.icon??""}
                  .picture=${t.iconPicture??""}
                  .colorRamp=${t.iconColor??this._config?.icon_color??"cool"}
                  .active=${t.iconActive??!1}
                  .unavailable=${t.iconUnavailable??!1}
                  .pulse=${t.iconPulse??!1}
                ></lirum-icon>`:Z}
            <div class="label lirum-name">${t.primary}</div>
            ${t.secondary?K`<div class="secondary lirum-state">${t.secondary}</div>`:Z}
            ${t.trailing?K`<div class="trailing">${t.trailing}</div>`:Z}
            ${t.controls?K`<div class="lirum-controls">${t.controls}</div>`:Z}
          </div>
        </div>
      </ha-card>
    `}_defaultPrimary(){return this._config?(t=this._config.entity??"",e=this._stateObj(),this._config.name||e?.attributes.friendly_name||t):"";var t,e}_defaultIcon(){return t=this._stateObj(),e=this._config?.icon,e??t?.attributes.icon??Ct(this._stateObj(),this._config?.entity);var t,e}_isActive(){return $t(this._stateObj())}_isUnavailable(){return!(t=this._stateObj())||"unavailable"===t.state||"unknown"===t.state;var t}_formattedState(){const t=this._stateObj();return t?this.hass?.formatEntityState?this.hass.formatEntityState(t):t.state:""}static{this.styles=[Ot,Rt,Mt]}}e([A({attribute:!1})],zt.prototype,"hass",void 0),e([S()],zt.prototype,"_config",void 0),(window.customCards=window.customCards??[]).push({type:t.entity.tag,name:t.entity.name,description:t.entity.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let It=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return Oe}),document.createElement(t.entity.editor)}static getStubConfig(){return{type:`custom:${t.entity.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;return this._stateObj()?this._renderTile({icon:this._defaultIcon(),iconActive:this._isActive(),iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:this._formattedState()}):this._renderError(`Entity not found: ${this._config.entity}`)}};It=e([i(t.entity.tag)],It),(window.customCards=window.customCards??[]).push({type:t.switch.tag,name:t.switch.name,description:t.switch.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Ht=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return je}),document.createElement(t.switch.editor)}static getStubConfig(){return{type:`custom:${t.switch.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;if(!this._stateObj())return this._renderError(`Entity not found: ${this._config.entity}`);const t=this._isActive();return this._renderTile({icon:this._defaultIcon(),iconColor:t?"amber":"neutral",iconActive:t,iconUnavailable:this._isUnavailable(),iconPulse:t,primary:this._defaultPrimary(),secondary:this._formattedState()})}};Ht=e([i(t.switch.tag)],Ht);let Nt=class extends mt{constructor(){super(...arguments),this.icon="",this.label="",this.colorRamp="cool",this.active=!1,this.disabled=!1}render(){const t=At(this.colorRamp),e=`--c1:${t.c1};--c2:${t.c2}`;return K`
      <button
        class="chip ${this.active?"active":""}"
        ?disabled=${this.disabled}
        style=${e}
      >
        ${this.icon?K`<ha-icon icon=${this.icon}></ha-icon>`:""}
        ${this.label?K`<span>${this.label}</span>`:""}
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
  `}};e([A()],Nt.prototype,"icon",void 0),e([A()],Nt.prototype,"label",void 0),e([A()],Nt.prototype,"colorRamp",void 0),e([A({type:Boolean})],Nt.prototype,"active",void 0),e([A({type:Boolean})],Nt.prototype,"disabled",void 0),Nt=e([i("lirum-chip")],Nt);const Bt=(t,e,i)=>Math.max(e,Math.min(i,t));function Vt(t,e,i,o){const r=(o-90)*Math.PI/180;return[t+i*Math.cos(r),e+i*Math.sin(r)]}function Dt(t,e,i,o,r){const[n,s]=Vt(t,e,i,o),[a,c]=Vt(t,e,i,r);return`M ${n} ${s} A ${i} ${i} 0 ${r-o>180?1:0} 1 ${a} ${c}`}let Ft=class extends mt{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.step=1,this.colorRamp="cool",this.disabled=!1,this.showValue=!1,this.unit="",this._dragging=!1,this._displayValue=0}updated(){this._dragging||(this._displayValue=this.value)}render(){const t=At(this.colorRamp),e=Math.max(1,this.max-this.min),i=this._dragging?this._displayValue:this.value,o=Bt((i-this.min)/e,0,1),r=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};--pct:${o}`;return K`
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
        ${this.showValue?K`<div class="value">${this._format(o*e+this.min)}<span class="unit">${this.unit}</span></div>`:""}
      </div>
    `}_format(t){if(this.step>=1)return Math.round(t).toLocaleString();const e=Math.max(0,Math.min(4,Math.ceil(-Math.log10(this.step))));return t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e})}_down(t){if(this.disabled)return;t.preventDefault();const e=t.currentTarget;this._trackEl=e,e.setPointerCapture(t.pointerId),this._dragging=!0,this._updateFromEvent(t)}_move(t){this._dragging&&this._updateFromEvent(t)}_up(t){if(!this._dragging)return;this._dragging=!1;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this.dispatchEvent(new CustomEvent("change",{detail:{value:this._displayValue},bubbles:!0,composed:!0}))}_updateFromEvent(t){if(!this._trackEl)return;const e=this._trackEl.getBoundingClientRect(),i=Bt((t.clientX-e.left)/e.width,0,1),o=this.min+i*(this.max-this.min),r=Math.round(o/this.step)*this.step;this._displayValue=Bt(r,this.min,this.max),this.dispatchEvent(new CustomEvent("input",{detail:{value:this._displayValue},bubbles:!0,composed:!0}))}static{this.styles=c`
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
  `}};e([A({type:Number})],Ft.prototype,"value",void 0),e([A({type:Number})],Ft.prototype,"min",void 0),e([A({type:Number})],Ft.prototype,"max",void 0),e([A({type:Number})],Ft.prototype,"step",void 0),e([A()],Ft.prototype,"colorRamp",void 0),e([A({type:Boolean})],Ft.prototype,"disabled",void 0),e([A({type:Boolean})],Ft.prototype,"showValue",void 0),e([A()],Ft.prototype,"unit",void 0),e([S()],Ft.prototype,"_dragging",void 0),e([S()],Ft.prototype,"_displayValue",void 0),Ft=e([i("lirum-slider")],Ft);let Wt=class extends mt{constructor(){super(...arguments),this.entity="",this.showBrightness=!1,this.showColorTemp=!1,this.showColor=!1,this._dragging=!1,this._onBrightnessChange=t=>{this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,brightness_pct:t.detail.value})},this._onColorTempChange=t=>{this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,color_temp_kelvin:t.detail.value})},this._onWheelPointerDown=t=>{t.preventDefault();const e=t.currentTarget;this._wheelEl=e,e.setPointerCapture(t.pointerId),this._dragging=!0,this._dragPoint=this._pointFromEvent(t)},this._onWheelPointerMove=t=>{this._dragging&&(this._dragPoint=this._pointFromEvent(t))},this._onWheelPointerUp=t=>{if(!this._dragging)return;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId);const i=this._dragPoint;this._dragging=!1,this._dragPoint=void 0,this._wheelEl=void 0,i&&this.hass&&this.entity&&this.hass.callService("light","turn_on",{entity_id:this.entity,hs_color:[i.hue,100*i.saturation]})}}render(){if(!this.hass||!this.entity)return Z;const t=this.hass.states[this.entity];if(!t)return Z;const e=t.attributes,i="number"==typeof e.brightness?e.brightness:0,o=Math.round(i/255*100),r="number"==typeof e.min_color_temp_kelvin?e.min_color_temp_kelvin:2200,n="number"==typeof e.max_color_temp_kelvin?e.max_color_temp_kelvin:6500,s="number"==typeof e.color_temp_kelvin?e.color_temp_kelvin:r,a=Array.isArray(e.rgb_color)?e.rgb_color:void 0,c=this._dragging&&this._dragPoint?this._dragPoint:this._rgbToHs(a);return K`
      ${this.showBrightness?K`
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
          `:Z}
      ${this.showColorTemp?K`
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
          `:Z}
      ${this.showColor?K`
            <div class="row">
              <div class="row-label">Color</div>
              ${this._renderColorWheel(c)}
            </div>
          `:Z}
    `}_renderColorWheel(t){const e=160,i=80,o=t?t.hue*Math.PI/180:0,r=t?72*Bt(t.saturation,0,1):0,n=i+Math.cos(o)*r,s=i+Math.sin(o)*r,a=t?`hsl(${t.hue}, ${Math.round(100*t.saturation)}%, 50%)`:"#ffffff";return K`
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
    `}_rgbToHs(t){if(!t)return;const[e,i,o]=t.map(t=>t/255),r=Math.max(e,i,o),n=r-Math.min(e,i,o);let s=0;0!==n&&(s=r===e?(i-o)/n%6:r===i?(o-e)/n+2:(e-i)/n+4,s*=60,s<0&&(s+=360));return{hue:s,saturation:0===r?0:n/r}}_pointFromEvent(t){const e=(this._wheelEl??t.currentTarget).getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,r=t.clientX-i,n=t.clientY-o,s=e.width/2-8,a=Math.sqrt(r*r+n*n),c=Bt(a/Math.max(1,s),0,1);let l=180*Math.atan2(n,r)/Math.PI;return l<0&&(l+=360),{hue:l,saturation:c}}static{this.styles=c`
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
  `}};e([A({attribute:!1})],Wt.prototype,"hass",void 0),e([A()],Wt.prototype,"entity",void 0),e([A({type:Boolean})],Wt.prototype,"showBrightness",void 0),e([A({type:Boolean})],Wt.prototype,"showColorTemp",void 0),e([A({type:Boolean})],Wt.prototype,"showColor",void 0),e([S()],Wt.prototype,"_dragging",void 0),e([S()],Wt.prototype,"_dragPoint",void 0),Wt=e([i("lirum-light-controls")],Wt);const Yt=["brightness","rgb","rgbw","rgbww","xy","hs","color_temp"],qt=["rgb","rgbw","rgbww","xy","hs"];(window.customCards=window.customCards??[]).push({type:t.light.tag,name:t.light.name,description:t.light.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Gt=class extends zt{constructor(){super(...arguments),this._expanded=!1,this._toggleExpanded=t=>{t.stopPropagation(),this._expanded=!this._expanded}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ne}),document.createElement(t.light.editor)}static getStubConfig(){return{type:`custom:${t.light.tag}`,entity:"",show_brightness_control:!0}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.brightness?t.attributes.brightness:0,o=Math.round(i/255*100),r=Array.isArray(t.attributes.rgb_color)?t.attributes.rgb_color:void 0,n=Array.isArray(t.attributes.supported_color_modes)?t.attributes.supported_color_modes:[],s={brightness:n.some(t=>Yt.includes(t)),colorTemp:n.includes("color_temp"),color:n.some(t=>qt.includes(t))},a=(this._config.show_brightness_control??!1)&&s.brightness,c=(this._config.show_color_temp_control??!1)&&s.colorTemp,l=(this._config.show_color_control??!1)&&s.color,h=a||c||l,d=!0===this._config.collapsible_controls,u=h&&e&&(!d||this._expanded);let m,p;if(this._config.use_light_color&&e&&r){m=(r[0]+r[1]+r[2])/3>128?"warm":"rose"}else m=e?"amber":"neutral";p=e&&i>0?`${o}%`:e?"On":"Off";const g=d&&h?K`<lirum-chip
          .icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}
          ?disabled=${this._isUnavailable()}
          @click=${this._toggleExpanded}
        ></lirum-chip>`:void 0,_=u?K`<lirum-light-controls
          .hass=${this.hass}
          .entity=${this._config.entity}
          .showBrightness=${a}
          .showColorTemp=${c}
          .showColor=${l}
        ></lirum-light-controls>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:m,iconActive:e,iconUnavailable:this._isUnavailable(),iconPulse:e,primary:this._defaultPrimary(),secondary:p,trailing:g,controls:_})}};e([S()],Gt.prototype,"_expanded",void 0),Gt=e([i(t.light.tag)],Gt),(window.customCards=window.customCards??[]).push({type:t.number.tag,name:t.number.name,description:t.number.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Kt=class extends zt{constructor(){super(...arguments),this._onChange=t=>{if(!this.hass||!this._config?.entity)return;const e=this._config.entity,i="input_number"===yt(e)?"input_number":"number";this.hass.callService(i,"set_value",{entity_id:e,value:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return De}),document.createElement(t.number.editor)}static getStubConfig(){return{type:`custom:${t.number.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="number"==typeof t.attributes.min?t.attributes.min:0,i="number"==typeof t.attributes.max?t.attributes.max:100,o="number"==typeof t.attributes.step?t.attributes.step:1,r="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"",n=Number(t.state)||0,s=r?`${n} ${r}`:`${n}`,a=K`
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
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!1,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:s,controls:a})}};Kt=e([i(t.number.tag)],Kt),(window.customCards=window.customCards??[]).push({type:t.slider.tag,name:t.slider.name,description:t.slider.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Jt=class extends zt{constructor(){super(...arguments),this._onChange=t=>{if(!this.hass||!this._config?.entity||!this._config.service)return;const[e,i]=this._config.service.split(".");if(!e||!i)return;const o=this._config.service_key??"value";this.hass.callService(e,i,{entity_id:this._config.entity,[o]:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return qe}),document.createElement(t.slider.editor)}static getStubConfig(){return{type:`custom:${t.slider.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._config.min??0,i=this._config.max??100,o=this._config.step??1,r="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"",n=this._config.unit??r??"",s=Number(t.state)||0,a=n?`${s} ${n}`:`${s}`,c=K`
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
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!1,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:a,controls:c})}};Jt=e([i(t.slider.tag)],Jt);(window.customCards=window.customCards??[]).push({type:t.cover.tag,name:t.cover.name,description:t.cover.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let Zt=class extends zt{constructor(){super(...arguments),this._open=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","open_cover",{entity_id:this._config.entity})},this._close=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","close_cover",{entity_id:this._config.entity})},this._stop=()=>{this.hass&&this._config?.entity&&this.hass.callService("cover","stop_cover",{entity_id:this._config.entity})},this._onPositionChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("cover","set_cover_position",{entity_id:this._config.entity,position:t.detail.value})},this._onTiltChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("cover","set_cover_tilt_position",{entity_id:this._config.entity,tilt_position:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ze}),document.createElement(t.cover.editor)}static getStubConfig(){return{type:`custom:${t.cover.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="number"==typeof t.attributes.current_position?t.attributes.current_position:void 0,i="number"==typeof t.attributes.current_tilt_position?t.attributes.current_tilt_position:void 0,o=t.state,r="opening"===o||"closing"===o,n="open"===o?"cool":r?"amber":"neutral",s="closed"!==o,a=r,c=void 0!==e?`${e}%${r?` · ${o}`:""}`:o,l=!1!==this._config.show_buttons_control,h=!1!==this._config.show_position_control,d=!0===this._config.show_tilt_position_control,u=this._isUnavailable(),m=l?(()=>{const e=[];return wt(t,1)&&e.push(K`<lirum-chip
                icon="mdi:arrow-up"
                label="Open"
                ?active=${"open"===o||"opening"===o}
                ?disabled=${u}
                @click=${this._open}
              ></lirum-chip>`),wt(t,8)&&e.push(K`<lirum-chip
                icon="mdi:stop"
                label="Stop"
                ?disabled=${u}
                @click=${this._stop}
              ></lirum-chip>`),wt(t,2)&&e.push(K`<lirum-chip
                icon="mdi:arrow-down"
                label="Close"
                ?active=${"closed"===o||"closing"===o}
                ?disabled=${u}
                @click=${this._close}
              ></lirum-chip>`),e.length>0?K`<div class="lirum-chip-row">${e}</div>`:Z})():Z,p=h&&wt(t,4)&&void 0!==e?K`<lirum-slider
            .value=${e}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${u}
            @change=${this._onPositionChange}
          ></lirum-slider>`:Z,g=d&&wt(t,128)&&void 0!==i?K`<lirum-slider
            .value=${i}
            .min=${0}
            .max=${100}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${u}
            @change=${this._onTiltChange}
          ></lirum-slider>`:Z,_=m!==Z||p!==Z||g!==Z?K`${m}${p}${g}`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:n,iconActive:s,iconPulse:a,iconUnavailable:u,primary:this._defaultPrimary(),secondary:c,controls:_})}};Zt=e([i(t.cover.tag)],Zt);const Xt=130,Qt=60;let te=class extends mt{constructor(){super(...arguments),this.current=0,this.target=0,this.min=7,this.max=35,this.action="idle",this.unit="°C"}render(){const t=At("heating"===this.action?"warm":"cooling"===this.action?"cool":"neutral"),e=Math.max(1e-4,this.max-this.min),i=Bt((this.current-this.min)/e,0,1),o=Bt((this.target-this.min)/e,0,1),r=Dt(Qt,Qt,46,Xt,410),n=Xt+280*i,s=n>130.5,a=s?Dt(Qt,Qt,46,Xt,n):"",c=Xt+280*o,[l,h]=Vt(Qt,Qt,46,c),d=`--c1:${t.c1};--c2:${t.c2};--c3:${t.c3}`,u=Number.isFinite(this.current)?this.current.toFixed(1):"–";return K`
      <div class="root" style=${d}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path class="bg" d=${r}></path>
          ${s?K`<path class="active" d=${a}></path>`:""}
          <circle class="notch" cx=${l} cy=${h} r="3.5"></circle>
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
  `}};e([A({type:Number})],te.prototype,"current",void 0),e([A({type:Number})],te.prototype,"target",void 0),e([A({type:Number})],te.prototype,"min",void 0),e([A({type:Number})],te.prototype,"max",void 0),e([A()],te.prototype,"action",void 0),e([A()],te.prototype,"unit",void 0),te=e([i("lirum-climate-ring")],te),(window.customCards=window.customCards??[]).push({type:t.climate.tag,name:t.climate.name,description:t.climate.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const ee={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sync",auto:"mdi:sync",dry:"mdi:water-percent",fan_only:"mdi:fan"},ie={off:"Off",heat:"Heat",cool:"Cool",heat_cool:"Heat/Cool",auto:"Auto",dry:"Dry",fan_only:"Fan"};let oe=class extends zt{constructor(){super(...arguments),this._onTargetChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return ei}),document.createElement(t.climate.editor)}static getStubConfig(){return{type:`custom:${t.climate.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="number"==typeof t.attributes.current_temperature?t.attributes.current_temperature:void 0,o="number"==typeof t.attributes.temperature?t.attributes.temperature:void 0,r="number"==typeof t.attributes.min_temp?t.attributes.min_temp:7,n="number"==typeof t.attributes.max_temp?t.attributes.max_temp:35,s="number"==typeof t.attributes.target_temp_step?t.attributes.target_temp_step:.5,a="string"==typeof t.attributes.unit_of_measurement?t.attributes.unit_of_measurement:"°C",c="string"==typeof t.attributes.hvac_action?t.attributes.hvac_action:"idle",l=Array.isArray(t.attributes.hvac_modes)?t.attributes.hvac_modes:["off","heat","cool"],h=this._config.hvac_modes,d=h&&h.length>0?h.filter(t=>l.includes(t)):l,u="heating"===c?"warm":"cooling"===c?"cool":"neutral",m="off"!==e,p="heating"===c||"cooling"===c,g=this._isUnavailable(),_=`${void 0!==i?i.toFixed(1):"–"} → ${void 0!==o?o.toFixed(1):"–"} ${a}`,f=K`<lirum-climate-ring
      .current=${i??0}
      .target=${o??0}
      .min=${r}
      .max=${n}
      .action=${c}
      .unit=${a}
    ></lirum-climate-ring>`,b=!1!==this._config.show_temperature_control,v=d.length>0?K`<div class="lirum-chip-row">
            ${d.map(t=>K`<lirum-chip
                .icon=${ee[t]??"mdi:circle-outline"}
                .label=${function(t){return ie[t]?ie[t]:t.charAt(0).toUpperCase()+t.slice(1).replace(/_/g," ")}(t)}
                ?active=${t===e}
                ?disabled=${g}
                @click=${()=>this._setMode(t)}
              ></lirum-chip>`)}
          </div>`:Z,y=b?K`<lirum-slider
          .value=${o??r}
          .min=${r}
          .max=${n}
          .step=${s}
          .unit=${a}
          .showValue=${!0}
          colorRamp="warm"
          ?disabled=${g}
          @change=${this._onTargetChange}
        ></lirum-slider>`:Z,$=v!==Z||y!==Z?K`${v}${y}`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:u,iconActive:m,iconPulse:p,iconUnavailable:g,primary:this._defaultPrimary(),secondary:_,trailing:f,controls:$})}_setMode(t){this.hass&&this._config?.entity&&this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}};oe=e([i(t.climate.tag)],oe);(window.customCards=window.customCards??[]).push({type:t.fan.tag,name:t.fan.name,description:t.fan.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let re=class extends zt{constructor(){super(...arguments),this._onPercentageChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("fan","set_percentage",{entity_id:this._config.entity,percentage:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return ni}),document.createElement(t.fan.editor)}static getStubConfig(){return{type:`custom:${t.fan.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.percentage?t.attributes.percentage:0,o="boolean"==typeof t.attributes.oscillating&&t.attributes.oscillating,r=!1!==this._config.show_percentage_control,n=!1!==this._config.show_oscillate_control,s=wt(t,2),a=e?`${i}%${o?" · oscillating":""}`:"Off";let c;if(r||n&&s){const t=r?K`<lirum-slider
            .value=${i}
            .min=${0}
            .max=${100}
            .step=${5}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="cool"
            ?disabled=${this._isUnavailable()}
            @change=${this._onPercentageChange}
          ></lirum-slider>`:Z,e=n&&s?K`<div class="lirum-chip-row">
            <lirum-chip
              icon="mdi:angle-acute"
              label="Oscillate"
              ?active=${o}
              ?disabled=${this._isUnavailable()}
              @click=${()=>this._toggleOscillate(o)}
            ></lirum-chip>
          </div>`:Z;c=K`${t}${e}`}return this._renderTile({icon:this._defaultIcon(),iconColor:e?"cool":"neutral",iconActive:e,iconPulse:e,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:a,controls:c})}_toggleOscillate(t){this.hass&&this._config?.entity&&this.hass.callService("fan","oscillate",{entity_id:this._config.entity,oscillating:!t})}};re=e([i(t.fan.tag)],re);(window.customCards=window.customCards??[]).push({type:t.media.tag,name:t.media.name,description:t.media.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ne=class extends zt{constructor(){super(...arguments),this._previous=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_previous_track",{entity_id:this._config.entity})},this._next=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_next_track",{entity_id:this._config.entity})},this._playPause=()=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","media_play_pause",{entity_id:this._config.entity})},this._toggleMute=()=>{if(!this.hass||!this._config?.entity)return;const t=this._stateObj(),e=t?.attributes.is_volume_muted??!1;this.hass.callService("media_player","volume_mute",{entity_id:this._config.entity,is_volume_muted:!e})},this._onVolumeChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("media_player","volume_set",{entity_id:this._config.entity,volume_level:t.detail.value/100})}}static async getConfigElement(){return await Promise.resolve().then(function(){return li}),document.createElement(t.media.editor)}static getStubConfig(){return{type:`custom:${t.media.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e="playing"===t.state,i=t.attributes.media_title,o=t.attributes.media_artist,r=t.attributes.entity_picture,n=t.attributes.volume_level??0,s=t.attributes.is_volume_muted??!1,a=this._isUnavailable(),c=!1!==this._config.show_transport_control,l=!1!==this._config.show_volume_control,h=!1!==this._config.show_mute_control,d=wt(t,16),u=wt(t,32),m=wt(t,8),p=wt(t,4),g=wt(t,1),_=c?K`<div class="lirum-chip-row">
          ${d?K`<lirum-chip
                icon="mdi:skip-previous"
                ?disabled=${a}
                @click=${this._previous}
              ></lirum-chip>`:Z}
          <lirum-chip
            .icon=${e?"mdi:pause":"mdi:play"}
            ?disabled=${a||!e&&!g&&"paused"!==t.state&&"idle"!==t.state}
            @click=${this._playPause}
          ></lirum-chip>
          ${u?K`<lirum-chip
                icon="mdi:skip-next"
                ?disabled=${a}
                @click=${this._next}
              ></lirum-chip>`:Z}
          ${h&&m?K`<lirum-chip
                .icon=${s?"mdi:volume-off":"mdi:volume-high"}
                ?active=${s}
                ?disabled=${a}
                @click=${this._toggleMute}
              ></lirum-chip>`:Z}
        </div>`:Z,f=l&&p?K`<lirum-slider
          .value=${Math.round(100*n)}
          .min=${0}
          .max=${100}
          .step=${1}
          .unit=${"%"}
          .showValue=${!0}
          .disabled=${a}
          colorRamp="rose"
          @change=${this._onVolumeChange}
        ></lirum-slider>`:Z,b=c||l&&p?K`${_}${f}`:void 0,v=i??this._defaultPrimary(),y=o??this._formattedState();return this._renderTile({...r?{iconPicture:r}:{icon:this._defaultIcon()},iconColor:e?"rose":"neutral",iconActive:e,iconUnavailable:a,primary:v,secondary:y,controls:b})}};ne=e([i(t.media.tag)],ne),(window.customCards=window.customCards??[]).push({type:t.lock.tag,name:t.lock.name,description:t.lock.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let se=class extends zt{constructor(){super(...arguments),this._lock=()=>{this.hass&&this._config?.entity&&this.hass.callService("lock","lock",{entity_id:this._config.entity})},this._unlock=()=>{this.hass&&this._config?.entity&&this.hass.callService("lock","unlock",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return ui}),document.createElement(t.lock.editor)}static getStubConfig(){return{type:`custom:${t.lock.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="locked"===e,o="unlocked"===e,r=this._isUnavailable(),n=i?"energy":"alert",s=!i,a=K`
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
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:n,iconActive:s,iconUnavailable:r,primary:this._defaultPrimary(),secondary:this._formattedState(),controls:a})}};se=e([i(t.lock.tag)],se),(window.customCards=window.customCards??[]).push({type:t.person.tag,name:t.person.name,description:t.person.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ae=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return gi}),document.createElement(t.person.editor)}static getStubConfig(){return{type:`custom:${t.person.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.attributes.entity_picture,i=this._isUnavailable(),o=this._isActive(),r="home"===t.state?"energy":i?"neutral":"cool";return this._renderTile({...e?{iconPicture:e}:{icon:this._defaultIcon()},iconColor:r,iconActive:o,iconUnavailable:i,primary:this._defaultPrimary(),secondary:this._formattedState()})}};ae=e([i(t.person.tag)],ae),(window.customCards=window.customCards??[]).push({type:t.select.tag,name:t.select.name,description:t.select.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ce=class extends zt{constructor(){super(...arguments),this._expanded=!1,this._toggleExpanded=()=>{this._expanded=!this._expanded}}static async getConfigElement(){return await Promise.resolve().then(function(){return vi}),document.createElement(t.select.editor)}static getStubConfig(){return{type:`custom:${t.select.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=Array.isArray(t.attributes.options)?t.attributes.options:[],i=t.state,o=this._config.entity.split(".")[0]??"select",r=this._isUnavailable(),n=!0===this._config.inline_options||this._expanded,s=K`
      <lirum-chip
        .icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}
        ?disabled=${r}
        @click=${this._toggleExpanded}
      ></lirum-chip>
    `,a=n&&e.length>0?K`<div class="lirum-chip-row">
          ${e.map(t=>K`<lirum-chip
              .label=${this._capitalize(t)}
              ?active=${t===i}
              ?disabled=${r}
              @click=${()=>this._selectOption(o,t)}
            ></lirum-chip>`)}
        </div>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:"cool",iconActive:!r,iconUnavailable:r,primary:this._defaultPrimary(),secondary:i,trailing:s,controls:a})}_capitalize(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}_selectOption(t,e){this.hass&&this._config?.entity&&this.hass.callService(t,"select_option",{entity_id:this._config.entity,option:e})}};e([S()],ce.prototype,"_expanded",void 0),ce=e([i(t.select.tag)],ce),(window.customCards=window.customCards??[]).push({type:t.vacuum.tag,name:t.vacuum.name,description:t.vacuum.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let le=class extends zt{constructor(){super(...arguments),this._start=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","start",{entity_id:this._config.entity})},this._pause=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","pause",{entity_id:this._config.entity})},this._stop=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","stop",{entity_id:this._config.entity})},this._returnToBase=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","return_to_base",{entity_id:this._config.entity})},this._locate=()=>{this.hass&&this._config?.entity&&this.hass.callService("vacuum","locate",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return xi}),document.createElement(t.vacuum.editor)}static getStubConfig(){return{type:`custom:${t.vacuum.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="cleaning"===e,o="returning"===e,r="number"==typeof t.attributes.battery_level?t.attributes.battery_level:void 0,n=this._isUnavailable(),s=i?"energy":o?"amber":"error"===e?"alert":"neutral",a=[void 0!==r?`${r}%`:null,this._formattedState()].filter(Boolean).join(" · ");let c;if(!1!==this._config.show_control){const r=[];wt(t,8192)&&r.push(K`<lirum-chip
          icon="mdi:play"
          label="Start"
          colorRamp="energy"
          ?active=${i}
          ?disabled=${n}
          @click=${this._start}
        ></lirum-chip>`),wt(t,4)&&r.push(K`<lirum-chip
          icon="mdi:pause"
          label="Pause"
          colorRamp="amber"
          ?active=${"paused"===e}
          ?disabled=${n}
          @click=${this._pause}
        ></lirum-chip>`),wt(t,8)&&r.push(K`<lirum-chip
          icon="mdi:stop"
          label="Stop"
          colorRamp="alert"
          ?disabled=${n}
          @click=${this._stop}
        ></lirum-chip>`),wt(t,16)&&r.push(K`<lirum-chip
          icon="mdi:home-import-outline"
          label="Return"
          colorRamp="amber"
          ?active=${o}
          ?disabled=${n}
          @click=${this._returnToBase}
        ></lirum-chip>`),wt(t,512)&&r.push(K`<lirum-chip
          icon="mdi:map-marker"
          label="Locate"
          colorRamp="cool"
          ?disabled=${n}
          @click=${this._locate}
        ></lirum-chip>`),r.length>0&&(c=K`<div class="lirum-chip-row">${r}</div>`)}return this._renderTile({icon:this._defaultIcon(),iconColor:s,iconActive:i||o,iconPulse:i,iconUnavailable:n,primary:this._defaultPrimary(),secondary:a,controls:c})}};le=e([i(t.vacuum.tag)],le),(window.customCards=window.customCards??[]).push({type:t.update.tag,name:t.update.name,description:t.update.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let he=class extends zt{constructor(){super(...arguments),this._install=t=>{t.stopPropagation(),this.hass&&this._config?.entity&&this.hass.callService("update","install",{entity_id:this._config.entity})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ei}),document.createElement(t.update.editor)}static getStubConfig(){return{type:`custom:${t.update.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.attributes.installed_version??"",i=t.attributes.latest_version??"",o="on"===t.state,r=o?`${e} → ${i}`:"Up to date",n=o?K`<lirum-chip
          icon="mdi:download"
          label="Install"
          @click=${this._install}
        ></lirum-chip>`:void 0;return this._renderTile({icon:this._defaultIcon(),iconColor:o?"amber":"neutral",iconActive:o,iconUnavailable:this._isUnavailable(),iconPulse:o,primary:this._defaultPrimary(),secondary:r,trailing:n})}};he=e([i(t.update.tag)],he),(window.customCards=window.customCards??[]).push({type:t.humidifier.tag,name:t.humidifier.name,description:t.humidifier.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let de=class extends zt{constructor(){super(...arguments),this._onTargetChange=t=>{this.hass&&this._config?.entity&&this.hass.callService("humidifier","set_humidity",{entity_id:this._config.entity,humidity:t.detail.value})}}static async getConfigElement(){return await Promise.resolve().then(function(){return Pi}),document.createElement(t.humidifier.editor)}static getStubConfig(){return{type:`custom:${t.humidifier.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");super.setConfig(t)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=this._isActive(),i="number"==typeof t.attributes.humidity?t.attributes.humidity:void 0,o="number"==typeof t.attributes.current_humidity?t.attributes.current_humidity:void 0,r="number"==typeof t.attributes.min_humidity?t.attributes.min_humidity:30,n="number"==typeof t.attributes.max_humidity?t.attributes.max_humidity:80,s="string"==typeof t.attributes.mode?t.attributes.mode:void 0,a=Array.isArray(t.attributes.available_modes)?t.attributes.available_modes:[],c=!1!==this._config.show_target_control,l=!1!==this._config.show_mode_control,h=`${o??"–"}% → ${i??"–"}%`;let d;if(c||l){const t=c?K`<lirum-slider
            .value=${i??r}
            .min=${r}
            .max=${n}
            .step=${1}
            .unit=${"%"}
            .showValue=${!0}
            colorRamp="rose"
            @change=${this._onTargetChange}
          ></lirum-slider>`:Z,e=l&&a.length>0?K`<div class="lirum-chip-row">
            ${a.map(t=>K`<lirum-chip
                .label=${this._capitalize(t)}
                ?active=${t===s}
                ?disabled=${this._isUnavailable()}
                @click=${()=>this._setMode(t)}
              ></lirum-chip>`)}
          </div>`:Z;d=K`${t}${e}`}return this._renderTile({icon:this._defaultIcon(),iconColor:e?"rose":"neutral",iconActive:e,iconPulse:e,iconUnavailable:this._isUnavailable(),primary:this._defaultPrimary(),secondary:h,controls:d})}_capitalize(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}_setMode(t){this.hass&&this._config?.entity&&this.hass.callService("humidifier","set_mode",{entity_id:this._config.entity,mode:t})}};de=e([i(t.humidifier.tag)],de);const ue=[{value:"1",kind:"digit"},{value:"2",kind:"digit"},{value:"3",kind:"digit"},{value:"4",kind:"digit"},{value:"5",kind:"digit"},{value:"6",kind:"digit"},{value:"7",kind:"digit"},{value:"8",kind:"digit"},{value:"9",kind:"digit"},{value:"backspace",kind:"backspace"},{value:"0",kind:"digit"},{value:"submit",kind:"submit"}];let me=class extends mt{constructor(){super(...arguments),this.codeFormat="number",this._code="",this._onBackspace=()=>{this._code&&(this._code=this._code.slice(0,-1))},this._onSubmit=()=>{const t=this._code;this.dispatchEvent(new CustomEvent("submit",{detail:{code:t},bubbles:!0,composed:!0})),this._code=""}}render(){const t="•".repeat(this._code.length);return K`
      <div class="display" aria-live="polite">${t||K`<span class="placeholder">enter code</span>`}</div>
      <div class="grid">
        ${ue.map(t=>this._renderKey(t))}
      </div>
    `}_renderKey(t){return"backspace"===t.kind?K`<button class="key glyph" @click=${this._onBackspace} aria-label="Backspace">
        <ha-icon icon="mdi:backspace-outline"></ha-icon>
      </button>`:"submit"===t.kind?K`<button class="key glyph submit" @click=${this._onSubmit} aria-label="Submit">
        <ha-icon icon="mdi:check"></ha-icon>
      </button>`:K`<button class="key" @click=${()=>this._onDigit(t.value)}>${t.value}</button>`}_onDigit(t){this._code.length>=8||(this._code=this._code+t)}static{this.styles=c`
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
  `}};e([A()],me.prototype,"codeFormat",void 0),e([S()],me.prototype,"_code",void 0),me=e([i("lirum-alarm-keypad")],me);const pe=[{state:"armed_home",suffix:"home",feature:1,icon:"mdi:shield-home",label:"Home"},{state:"armed_away",suffix:"away",feature:2,icon:"mdi:shield-lock",label:"Away"},{state:"armed_night",suffix:"night",feature:4,icon:"mdi:shield-moon",label:"Night"},{state:"armed_vacation",suffix:"vacation",feature:32,icon:"mdi:shield-airplane",label:"Vacation"}];(window.customCards=window.customCards??[]).push({type:t.alarm.tag,name:t.alarm.name,description:t.alarm.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ge=class extends zt{constructor(){super(...arguments),this._pendingCode="",this._onKeypadSubmit=t=>{const e=t.detail;this._pendingCode=e?.code??""},this._disarm=()=>{if(!this.hass||!this._config?.entity)return;const t={entity_id:this._config.entity};this._pendingCode&&(t.code=this._pendingCode),this.hass.callService("alarm_control_panel","alarm_disarm",t)}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ri}),document.createElement(t.alarm.editor)}static getStubConfig(){return{type:`custom:${t.alarm.tag}`,entity:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");const e={...t};e.tap_action||(e.tap_action={action:"more-info"}),super.setConfig(e)}render(){if(!this.hass||!this._config)return Z;const t=this._stateObj();if(!t)return this._renderError(`Entity not found: ${this._config.entity}`);const e=t.state,i="number"==typeof t.attributes.supported_features?t.attributes.supported_features:0,o=this._isUnavailable(),r="disarmed"===e?"neutral":"triggered"===e?"alert":e.startsWith("armed")?"energy":"amber",n="disarmed"!==e&&"unavailable"!==e,s="pending"===e||"arming"===e||"triggered"===e,a=this._config.states,c=pe.filter(t=>0!==(i&t.feature)).filter(t=>!a||a.includes(t.state)),l=c.map(t=>K`
      <lirum-chip
        icon=${t.icon}
        label=${t.label}
        colorRamp="energy"
        ?active=${e===t.state}
        ?disabled=${o}
        @click=${()=>this._arm(t.suffix)}
      ></lirum-chip>
    `),h=K`
      <lirum-chip
        icon="mdi:shield-off"
        label="Disarm"
        colorRamp="neutral"
        ?active=${"disarmed"===e}
        ?disabled=${o}
        @click=${this._disarm}
      ></lirum-chip>
    `,d=this._config.show_keypad?K`<lirum-alarm-keypad
          codeFormat="number"
          @submit=${this._onKeypadSubmit}
        ></lirum-alarm-keypad>`:Z,u=K`
      <div class="lirum-chip-row">${l}${h}</div>
      ${d}
    `;return this._renderTile({icon:this._defaultIcon(),iconColor:r,iconActive:n,iconPulse:s,iconUnavailable:o,primary:this._defaultPrimary(),secondary:this._formattedState(),controls:u})}_arm(t){if(!this.hass||!this._config?.entity)return;const e={entity_id:this._config.entity};this._pendingCode&&(e.code=this._pendingCode),this.hass.callService("alarm_control_panel",`alarm_arm_${t}`,e)}};e([S()],ge.prototype,"_pendingCode",void 0),ge=e([i(t.alarm.tag)],ge);const _e={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant",exceptional:"mdi:alert-circle-outline"};function fe(t,e,i){switch(t.type){case"entity":{const o=e.states[t.entity],r=t.icon??Ct(o,t.entity),n="state"===t.content_info?o?.state??"":"name"===t.content_info?o?.attributes.friendly_name??t.entity:"",s=()=>{const o={entity:t.entity,tap_action:t.tap_action};Ut(i,e,o,"tap")};return K`<lirum-chip
        .icon=${r}
        .label=${n}
        .colorRamp=${t.icon_color??"cool"}
        @click=${s}
      ></lirum-chip>`}case"action":{const o=()=>{const o={tap_action:t.tap_action};Ut(i,e,o,"tap")};return K`<lirum-chip
        .icon=${t.icon}
        .label=${t.label??""}
        .colorRamp=${t.icon_color??"cool"}
        @click=${o}
      ></lirum-chip>`}case"back":{const e=()=>{window.history.back()};return K`<lirum-chip
        .icon=${t.icon??"mdi:arrow-left-circle"}
        @click=${e}
      ></lirum-chip>`}case"menu":{const e=()=>{i.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))};return K`<lirum-chip
        .icon=${t.icon??"mdi:menu"}
        @click=${e}
      ></lirum-chip>`}case"weather":{const o=e.states[t.entity],r=_e[o?.state??""]??"mdi:weather-partly-cloudy",n=o?.attributes.temperature,s=!1===t.show_temperature||null==n?"":`${n}°`;return K`<lirum-chip
        .icon=${r}
        .label=${s}
        @click=${()=>{const o={entity:t.entity,tap_action:{action:"more-info"}};Ut(i,e,o,"tap")}}
      ></lirum-chip>`}case"template":{const o=t.entity?e.states[t.entity]:void 0,r=t.icon??(o?Ct(o,t.entity):""),n=t.content?function(t,e){let i=t;return i=i.replace(/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,(t,i,o)=>{const r=e.states[i],n=r?.attributes[o];return null==n?"":String(n)}),i=i.replace(/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,(t,i)=>e.states[i]?.state??""),i}(t.content,e):"",s=()=>{const o={entity:t.entity,tap_action:t.tap_action};Ut(i,e,o,"tap")};return K`<lirum-chip
        .icon=${r}
        .label=${n}
        .colorRamp=${t.icon_color??"cool"}
        @click=${s}
      ></lirum-chip>`}}}(window.customCards=window.customCards??[]).push({type:t.chips.tag,name:t.chips.name,description:t.chips.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let be=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return zi}),document.createElement(t.chips.editor)}static getStubConfig(){return{type:`custom:${t.chips.tag}`,chips:[]}}setConfig(t){super.setConfig(t)}getCardSize(){return 1}render(){if(!this.hass||!this._config)return Z;const t=this._config.alignment??"start",e=this._config.chips??[],i=St(this._config.background);return K`
      <ha-card style=${vt(i)}>
        <div class="chips-row alignment-${t}">
          ${e.map(t=>fe(t,this.hass,this))}
        </div>
      </ha-card>
    `}static{this.styles=[...zt.styles,c`
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
    `]}};be=e([i(t.chips.tag)],be),(window.customCards=window.customCards??[]).push({type:t.title.tag,name:t.title.name,description:t.title.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});let ve=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return Ni}),document.createElement(t.title.editor)}static getStubConfig(){return{type:`custom:${t.title.tag}`,title:"Section title"}}setConfig(t){super.setConfig(t)}getCardSize(){return 1}render(){if(!this._config)return Z;const t=this._config.alignment??"start",e=St(this._config.background);return K`
      <ha-card style=${vt(e)}>
        <div class="lirum-title-wrap align-${t}">
          ${this._config.title?K`<div class="title">${this._config.title}</div>`:Z}
          ${this._config.subtitle?K`<div class="subtitle">${this._config.subtitle}</div>`:Z}
        </div>
      </ha-card>
    `}static{this.styles=[...zt.styles,c`
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
    `]}};ve=e([i(t.title.tag)],ve),(window.customCards=window.customCards??[]).push({type:t.template.tag,name:t.template.name,description:t.template.desc,preview:!0,documentationURL:"https://github.com/Lirum-Labs/ha-lirum"});const ye=/\{\{\s*states\(\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g,$e=/\{\{\s*state_attr\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*\}\}/g;let we=class extends zt{static async getConfigElement(){return await Promise.resolve().then(function(){return Fi}),document.createElement(t.template.editor)}static getStubConfig(){return{type:`custom:${t.template.tag}`,primary:"Hello"}}setConfig(t){super.setConfig(t)}_eval(t){if(!t)return"";let e=t.replace($e,(t,e,i)=>{const o=this.hass?.states[e];if(!o)return"";const r=o.attributes[i];return null==r?"":String(r)});return e=e.replace(ye,(t,e)=>{const i=this.hass?.states[e];return i?i.state:"unknown"}),e.trim()}render(){if(!this.hass||!this._config)return Z;const t=this._eval(this._config.primary)||this._config.primary||"",e=this._eval(this._config.secondary),i=this._config.icon?this._eval(this._config.icon):"",o=i.startsWith("mdi:")?i:this._defaultIcon()||"mdi:cog",r=this._config.icon_color?this._eval(this._config.icon_color)||this._config.icon_color:"cool",n=this._config.picture?this._eval(this._config.picture):void 0;return this._renderTile({icon:n?void 0:o,iconPicture:n,iconColor:r,primary:t,secondary:e||void 0})}};we=e([i(t.template.tag)],we);const xe=Object.keys(t).length,Ce=["#1ee0ff","#2a7bff","#0a3aa0"];console.info(`%c LIRUM %c v0.1.0 %c ${xe} cards `,`background:${Ce[2]};color:white;padding:2px 6px;border-radius:3px 0 0 3px;font-weight:600`,`background:${Ce[1]};color:white;padding:2px 6px`,`background:${Ce[0]};color:#001020;padding:2px 6px;border-radius:0 3px 3px 0`);const ke=(t,e)=>({name:"",type:"expandable",title:e,schema:[{name:t,selector:{ui_action:{actions:["more-info","toggle","navigate","url","call-service","assist","none"]}}}]}),Ee=[{value:"cool",label:"Cool (cyan→blue)"},{value:"warm",label:"Warm (orange)"},{value:"energy",label:"Energy (green)"},{value:"alert",label:"Alert (red)"},{value:"rose",label:"Rose (pink)"},{value:"amber",label:"Amber (yellow)"},{value:"neutral",label:"Neutral"}];function Ae(){return{name:"",type:"expandable",title:"Appearance",schema:[{name:"",type:"grid",schema:[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"horizontal",label:"Horizontal"},{value:"vertical",label:"Vertical"}]}}},{name:"fill_container",selector:{boolean:{}}}]},{name:"",type:"grid",schema:[{name:"icon_color",selector:{select:{mode:"dropdown",custom_value:!0,options:Ee}}},{name:"background",selector:{text:{}}}]}]}}function Se(){return{name:"",type:"expandable",title:"Interactions",schema:[ke("tap_action","Tap behavior"),ke("hold_action","Hold behavior"),ke("double_tap_action","Double-tap behavior")]}}const Le={entity:"Entity",name:"Custom name",icon:"Icon (mdi:…)",icon_color:"Icon color",layout:"Layout",fill_container:"Fill container",background:'Background (CSS / "transparent")',tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double-tap action",title:"Title",subtitle:"Subtitle",alignment:"Alignment"};function Pe(t){return[{name:"entity",required:!0,selector:t.length>0?{entity:{domain:t}}:{entity:{}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}]}const Ue=[...Pe([]),Ae(),Se()];let Te=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ue}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Te.prototype,"hass",void 0),e([S()],Te.prototype,"_config",void 0),Te=e([i(t.entity.editor)],Te);var Oe=Object.freeze({__proto__:null,get LirumEntityEditor(){return Te}});const Re=[...Pe(["switch","input_boolean","automation","remote","siren"]),Ae(),Se()];let Me=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Re}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Me.prototype,"hass",void 0),e([S()],Me.prototype,"_config",void 0),Me=e([i(t.switch.editor)],Me);var je=Object.freeze({__proto__:null,get LirumSwitchEditor(){return Me}});const ze=[...Pe(["light"]),{name:"",type:"grid",schema:[{name:"use_light_color",selector:{boolean:{}}},{name:"show_brightness_control",selector:{boolean:{}}},{name:"show_color_temp_control",selector:{boolean:{}}},{name:"show_color_control",selector:{boolean:{}}},{name:"collapsible_controls",selector:{boolean:{}}}]},Ae(),Se()],Ie={...Le,use_light_color:"Derive icon color from light",show_brightness_control:"Show brightness slider",show_color_temp_control:"Show color-temp slider",show_color_control:"Show color picker",collapsible_controls:"Collapsible controls"};let He=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Ie[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ze}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],He.prototype,"hass",void 0),e([S()],He.prototype,"_config",void 0),He=e([i(t.light.editor)],He);var Ne=Object.freeze({__proto__:null,get LirumLightEditor(){return He}});const Be=[...Pe(["input_number","number"]),Ae(),Se()];let Ve=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Be}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Ve.prototype,"hass",void 0),e([S()],Ve.prototype,"_config",void 0),Ve=e([i(t.number.editor)],Ve);var De=Object.freeze({__proto__:null,get LirumNumberEditor(){return Ve}});const Fe=[...Pe([]),{name:"",type:"grid",schema:[{name:"min",selector:{number:{mode:"box",step:"any"}}},{name:"max",selector:{number:{mode:"box",step:"any"}}},{name:"step",selector:{number:{mode:"box",step:"any"}}},{name:"unit",selector:{text:{}}}]},{name:"service",selector:{text:{}}},{name:"service_key",selector:{text:{}}},Ae(),Se()],We={...Le,min:"Minimum",max:"Maximum",step:"Step",unit:"Unit (overrides entity unit)",service:"Write service (e.g. input_number.set_value)",service_key:"Service data key (default: value)"};let Ye=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>We[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Fe}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Ye.prototype,"hass",void 0),e([S()],Ye.prototype,"_config",void 0),Ye=e([i(t.slider.editor)],Ye);var qe=Object.freeze({__proto__:null,get LirumSliderEditor(){return Ye}});const Ge=[...Pe(["cover"]),{name:"",type:"grid",schema:[{name:"show_buttons_control",selector:{boolean:{}}},{name:"show_position_control",selector:{boolean:{}}},{name:"show_tilt_position_control",selector:{boolean:{}}}]},Ae(),Se()],Ke={...Le,show_buttons_control:"Show open/stop/close buttons",show_position_control:"Show position slider",show_tilt_position_control:"Show tilt position slider"};let Je=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Ke[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ge}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Je.prototype,"hass",void 0),e([S()],Je.prototype,"_config",void 0),Je=e([i(t.cover.editor)],Je);var Ze=Object.freeze({__proto__:null,get LirumCoverEditor(){return Je}});const Xe=[...Pe(["climate"]),{name:"",type:"grid",schema:[{name:"show_temperature_control",selector:{boolean:{}}}]},Ae(),Se()],Qe={...Le,show_temperature_control:"Show temperature slider"};let ti=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Qe[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xe}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],ti.prototype,"hass",void 0),e([S()],ti.prototype,"_config",void 0),ti=e([i(t.climate.editor)],ti);var ei=Object.freeze({__proto__:null,get LirumClimateEditor(){return ti}});const ii=[...Pe(["fan"]),{name:"",type:"grid",schema:[{name:"show_percentage_control",selector:{boolean:{}}},{name:"show_oscillate_control",selector:{boolean:{}}}]},Ae(),Se()],oi={...Le,show_percentage_control:"Show speed slider",show_oscillate_control:"Show oscillate chip"};let ri=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>oi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ii}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],ri.prototype,"hass",void 0),e([S()],ri.prototype,"_config",void 0),ri=e([i(t.fan.editor)],ri);var ni=Object.freeze({__proto__:null,get LirumFanEditor(){return ri}});const si=[...Pe(["media_player"]),{name:"",type:"grid",schema:[{name:"show_transport_control",selector:{boolean:{}}},{name:"show_volume_control",selector:{boolean:{}}},{name:"show_mute_control",selector:{boolean:{}}}]},Ae(),Se()],ai={...Le,show_transport_control:"Show transport controls",show_volume_control:"Show volume slider",show_mute_control:"Show mute toggle"};let ci=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>ai[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${si}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],ci.prototype,"hass",void 0),e([S()],ci.prototype,"_config",void 0),ci=e([i(t.media.editor)],ci);var li=Object.freeze({__proto__:null,get LirumMediaEditor(){return ci}});const hi=[...Pe(["lock"]),Ae(),Se()];let di=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${hi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],di.prototype,"hass",void 0),e([S()],di.prototype,"_config",void 0),di=e([i(t.lock.editor)],di);var ui=Object.freeze({__proto__:null,get LirumLockEditor(){return di}});const mi=[...Pe(["person","device_tracker"]),Ae(),Se()];let pi=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${mi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],pi.prototype,"hass",void 0),e([S()],pi.prototype,"_config",void 0),pi=e([i(t.person.editor)],pi);var gi=Object.freeze({__proto__:null,get LirumPersonEditor(){return pi}});const _i=[...Pe(["select","input_select"]),{name:"inline_options",selector:{boolean:{}}},Ae(),Se()],fi={...Le,inline_options:"Show options inline"};let bi=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>fi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${_i}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],bi.prototype,"hass",void 0),e([S()],bi.prototype,"_config",void 0),bi=e([i(t.select.editor)],bi);var vi=Object.freeze({__proto__:null,get LirumSelectEditor(){return bi}});const yi=[...Pe(["vacuum"]),{name:"show_control",selector:{boolean:{}}},Ae(),Se()],$i={...Le,show_control:"Show control chips"};let wi=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>$i[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${yi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],wi.prototype,"hass",void 0),e([S()],wi.prototype,"_config",void 0),wi=e([i(t.vacuum.editor)],wi);var xi=Object.freeze({__proto__:null,get LirumVacuumEditor(){return wi}});const Ci=[...Pe(["update"]),Ae(),Se()];let ki=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ci}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],ki.prototype,"hass",void 0),e([S()],ki.prototype,"_config",void 0),ki=e([i(t.update.editor)],ki);var Ei=Object.freeze({__proto__:null,get LirumUpdateEditor(){return ki}});const Ai=[...Pe(["humidifier"]),{name:"",type:"grid",schema:[{name:"show_target_control",selector:{boolean:{}}},{name:"show_mode_control",selector:{boolean:{}}}]},Ae(),Se()],Si={...Le,show_target_control:"Show target slider",show_mode_control:"Show mode chips"};let Li=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Si[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ai}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Li.prototype,"hass",void 0),e([S()],Li.prototype,"_config",void 0),Li=e([i(t.humidifier.editor)],Li);var Pi=Object.freeze({__proto__:null,get LirumHumidifierEditor(){return Li}});const Ui=[...Pe(["alarm_control_panel"]),{name:"",type:"grid",schema:[{name:"show_keypad",selector:{boolean:{}}}]},Ae(),Se()],Ti={...Le,show_keypad:"Show keypad"};let Oi=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Ti[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ui}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Oi.prototype,"hass",void 0),e([S()],Oi.prototype,"_config",void 0),Oi=e([i(t.alarm.editor)],Oi);var Ri=Object.freeze({__proto__:null,get LirumAlarmEditor(){return Oi}});const Mi=[{name:"chips",selector:{object:{}}},{name:"alignment",selector:{select:{mode:"dropdown",options:[{value:"start",label:"Start"},{value:"center",label:"Center"},{value:"end",label:"End"},{value:"justify",label:"Justify"}]}}}];let ji=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Mi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],ji.prototype,"hass",void 0),e([S()],ji.prototype,"_config",void 0),ji=e([i(t.chips.editor)],ji);var zi=Object.freeze({__proto__:null,get LirumChipsEditor(){return ji}});const Ii=[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"alignment",selector:{select:{mode:"dropdown",options:[{value:"start",label:"Start"},{value:"center",label:"Center"},{value:"end",label:"End"}]}}},{name:"background",selector:{text:{}}}];let Hi=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Le[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ii}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Hi.prototype,"hass",void 0),e([S()],Hi.prototype,"_config",void 0),Hi=e([i(t.title.editor)],Hi);var Ni=Object.freeze({__proto__:null,get LirumTitleEditor(){return Hi}});const Bi=[{name:"entity",selector:{entity:{}}},{name:"primary",selector:{text:{multiline:!0}}},{name:"secondary",selector:{text:{multiline:!0}}},{name:"",type:"grid",schema:[{name:"icon",selector:{text:{}}},{name:"icon_color",selector:{text:{}}}]},{name:"picture",selector:{text:{}}},Ae(),Se()],Vi={...Le,primary:"Primary text (template)",secondary:"Secondary text (template)",icon:"Icon (mdi:… or template)",icon_color:"Icon color (ramp or template)",picture:"Picture URL (template)"};let Di=class extends mt{constructor(){super(...arguments),this._computeLabel=t=>Vi[t.name]??t.name}setConfig(t){this._config=t}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Bi}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._changed}
      ></ha-form>
    `:Z}_changed(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t.detail.value},bubbles:!0,composed:!0}))}};e([A({attribute:!1})],Di.prototype,"hass",void 0),e([S()],Di.prototype,"_config",void 0),Di=e([i(t.template.editor)],Di);var Fi=Object.freeze({__proto__:null,get LirumTemplateEditor(){return Di}})}();
