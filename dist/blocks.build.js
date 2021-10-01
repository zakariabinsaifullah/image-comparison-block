/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block_js__ = __webpack_require__(/*! ./block/block.js */ 1);
/**
 * Gutenberg Blocks
 */



/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./src/block/block.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__attributes__ = __webpack_require__(/*! ./attributes */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit__ = __webpack_require__(/*! ./edit */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editor_scss__ = __webpack_require__(/*! ./editor.scss */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__editor_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__save__ = __webpack_require__(/*! ./save */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_scss__ = __webpack_require__(/*! ./style.scss */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_scss__);
/**
 * Block Name: Test Block
*/

//  Import CSS.






var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;

/**
 * Register: Test Block.
 */

registerBlockType('icgb/image-compare', {
	title: __('Image Compare'),
	description: __('Showcase Images Comparision with different styles'),
	icon: {
		src: wp.element.createElement(
			'svg',
			{ xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24' },
			wp.element.createElement('path', { d: 'M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm5.8-7v-2h-21v15h2v-13h19zm3 2v14h-20v-14h20zm-2 2h-16v10h16v-10z' })
		),
		foreground: '#7952B3'
	},
	example: {
		attributes: {
			beforeImageUrl: 'https://i.postimg.cc/v8WNPMGL/home-before.jpg',
			afterImageUrl: 'https://i.postimg.cc/m2B6JqDx/home-after.jpg'
		}
	},
	category: 'media',
	keywords: [__('Image Compare')],
	attributes: __WEBPACK_IMPORTED_MODULE_0__attributes__["a" /* default */],
	edit: __WEBPACK_IMPORTED_MODULE_1__edit__["a" /* default */],
	save: __WEBPACK_IMPORTED_MODULE_3__save__["a" /* default */]
});

/***/ }),
/* 2 */
/*!*********************************!*\
  !*** ./src/block/attributes.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var attributes = {
    beforeImageUrl: {
        type: 'string'
    },
    beforeImageAlt: {
        type: 'string'
    },
    beforeImageId: {
        type: 'number'
    },
    afterImageUrl: {
        type: 'string'
    },
    afterImageAlt: {
        type: 'string'
    },
    afterImageId: {
        type: 'number'
    },
    verticalMode: {
        type: 'boolean',
        default: false
    },
    hover: {
        type: 'boolean',
        default: false
    },
    showLabel: {
        type: 'boolean',
        default: false
    },
    leftImageLabel: {
        type: 'string',
        default: 'Before'
    },
    rightImageLabel: {
        type: 'string',
        default: 'After'
    }
};

/* harmony default export */ __webpack_exports__["a"] = (attributes);

/***/ }),
/* 3 */
/*!***************************!*\
  !*** ./src/block/edit.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__ = __webpack_require__(/*! @wordpress/block-editor */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_components__ = __webpack_require__(/*! @wordpress/components */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_compare_image__ = __webpack_require__(/*! react-compare-image */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_compare_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_compare_image__);



var __ = wp.i18n.__;
var Fragment = wp.element.Fragment;


var Edit = function Edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var beforeImageUrl = attributes.beforeImageUrl,
        beforeImageId = attributes.beforeImageId,
        beforeImageAlt = attributes.beforeImageAlt,
        afterImageUrl = attributes.afterImageUrl,
        afterImageId = attributes.afterImageId,
        afterImageAlt = attributes.afterImageAlt,
        hover = attributes.hover,
        showLabel = attributes.showLabel,
        leftImageLabel = attributes.leftImageLabel,
        rightImageLabel = attributes.rightImageLabel,
        verticalMode = attributes.verticalMode;

    return wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
            __WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["InspectorControls"],
            null,
            wp.element.createElement(
                __WEBPACK_IMPORTED_MODULE_1__wordpress_components__["PanelBody"],
                {
                    title: __('Images Options'),
                    initialOpen: false
                },
                wp.element.createElement(
                    'div',
                    { className: 'icgb__image-options' },
                    wp.element.createElement(
                        'div',
                        { className: 'icgb__before-image-wrapper' },
                        wp.element.createElement(
                            'div',
                            { className: 'title' },
                            'Before Image'
                        ),
                        wp.element.createElement(
                            'div',
                            { className: 'edit-options' },
                            wp.element.createElement(
                                __WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUploadCheck"],
                                null,
                                wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUpload"], {
                                    onSelect: function onSelect(media) {
                                        return setAttributes({
                                            beforeImageUrl: media.url,
                                            beforeImageId: media.id,
                                            beforeImageAlt: media.alt
                                        });
                                    },
                                    allowedTypes: ["image"],
                                    value: beforeImageId,
                                    render: function render(_ref2) {
                                        var open = _ref2.open;

                                        return wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"], {
                                            label: __("Edit Image"),
                                            onClick: open,
                                            icon: 'edit'
                                        });
                                    }
                                })
                            ),
                            wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"], {
                                icon: 'trash',
                                onClick: function onClick() {
                                    return setAttributes({ beforeImageUrl: '', beforeImageId: null, beforeImageAlt: '' });
                                }
                            })
                        )
                    ),
                    beforeImageUrl ? wp.element.createElement('img', { src: beforeImageUrl, alt: beforeImageAlt, className: 'card-image' }) : wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUpload"], {
                        onSelect: function onSelect(newImage) {
                            return setAttributes({ beforeImageUrl: newImage.sizes.full.url, beforeImageId: newImage.id, beforeImageAlt: newImage.alt });
                        },
                        type: 'image',
                        value: beforeImageId,
                        render: function render(_ref3) {
                            var open = _ref3.open;
                            return wp.element.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"],
                                {
                                    style: { border: '1px solid #ccc' },
                                    icon: 'upload',
                                    onClick: open },
                                'Before Image'
                            );
                        }
                    }),
                    wp.element.createElement(
                        'div',
                        { className: 'icgb__after-image-wrapper' },
                        wp.element.createElement(
                            'div',
                            { className: 'title' },
                            'After Image'
                        ),
                        wp.element.createElement(
                            'div',
                            { className: 'edit-options' },
                            wp.element.createElement(
                                __WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUploadCheck"],
                                null,
                                wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUpload"], {
                                    onSelect: function onSelect(media) {
                                        return setAttributes({
                                            afterImageUrl: media.url,
                                            afterImageId: media.id,
                                            afterImageAlt: media.alt
                                        });
                                    },
                                    allowedTypes: ["image"],
                                    value: afterImageId,
                                    render: function render(_ref4) {
                                        var open = _ref4.open;

                                        return wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"], {
                                            label: __("Edit Image"),
                                            onClick: open,
                                            icon: 'edit'
                                        });
                                    }
                                })
                            ),
                            wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"], {
                                icon: 'trash',
                                onClick: function onClick() {
                                    return setAttributes({ afterImageUrl: '', afterImageId: null, afterImageAlt: '' });
                                }
                            })
                        )
                    ),
                    afterImageUrl ? wp.element.createElement('img', { src: afterImageUrl, alt: afterImageAlt, className: 'card-image' }) : wp.element.createElement(__WEBPACK_IMPORTED_MODULE_0__wordpress_block_editor__["MediaUpload"], {
                        onSelect: function onSelect(newImage) {
                            return setAttributes({ afterImageUrl: newImage.sizes.full.url, afterImageId: newImage.id, afterImageAlt: newImage.alt });
                        },
                        type: 'image',
                        value: afterImageId,
                        render: function render(_ref5) {
                            var open = _ref5.open;
                            return wp.element.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__wordpress_components__["Button"],
                                {
                                    style: { border: '1px solid #ccc' },
                                    icon: 'upload',
                                    onClick: open },
                                'After Image'
                            );
                        }
                    })
                )
            ),
            wp.element.createElement(
                __WEBPACK_IMPORTED_MODULE_1__wordpress_components__["PanelBody"],
                {
                    title: __('Compare Options'),
                    initialOpen: false
                },
                wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["ToggleControl"], {
                    label: 'Vertical Mode',
                    checked: verticalMode,
                    onChange: function onChange() {
                        return setAttributes({ verticalMode: !verticalMode });
                    }
                }),
                wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["ToggleControl"], {
                    label: 'Start on Hover',
                    checked: hover,
                    onChange: function onChange() {
                        return setAttributes({ hover: !hover });
                    }
                }),
                wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["ToggleControl"], {
                    label: 'Show Labels',
                    checked: showLabel,
                    onChange: function onChange() {
                        return setAttributes({ showLabel: !showLabel });
                    }
                }),
                showLabel && wp.element.createElement(
                    Fragment,
                    null,
                    wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["TextControl"], {
                        label: 'Before Image Label',
                        value: leftImageLabel,
                        onChange: function onChange(leftImageLabel) {
                            return setAttributes({ leftImageLabel: leftImageLabel });
                        }
                    }),
                    wp.element.createElement(__WEBPACK_IMPORTED_MODULE_1__wordpress_components__["TextControl"], {
                        label: 'After Image Label',
                        value: rightImageLabel,
                        onChange: function onChange(rightImageLabel) {
                            return setAttributes({ rightImageLabel: rightImageLabel });
                        }
                    })
                )
            )
        ),
        wp.element.createElement(
            'div',
            { className: className + ' icgb-compare-block' },
            beforeImageUrl && afterImageUrl ? wp.element.createElement(__WEBPACK_IMPORTED_MODULE_2_react_compare_image___default.a, {
                leftImage: beforeImageUrl,
                rightImage: afterImageUrl,
                handleSize: 50,
                hover: hover,
                leftImageLabel: showLabel ? leftImageLabel : null,
                rightImageLabel: showLabel ? rightImageLabel : null,
                vertical: verticalMode
            }) : wp.element.createElement(
                'p',
                { className: 'icgb-empty-images' },
                'Please Add Before and After Images.'
            )
        )
    );
};
/* harmony default export */ __webpack_exports__["a"] = (Edit);

/***/ }),
/* 4 */
/*!*********************************!*\
  !*** external "wp.blockEditor" ***!
  \*********************************/
/*! dynamic exports provided */
/*! exports used: InspectorControls, MediaUpload, MediaUploadCheck */
/***/ (function(module, exports) {

module.exports = wp.blockEditor;

/***/ }),
/* 5 */
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/*! dynamic exports provided */
/*! exports used: Button, PanelBody, TextControl, ToggleControl */
/***/ (function(module, exports) {

module.exports = wp.components;

/***/ }),
/* 6 */
/*!*********************************************************!*\
  !*** ./node_modules/react-compare-image/dist/bundle.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=1)}([function(e,t){e.exports=__webpack_require__(/*! react */ 7)},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const s=e=>{const{aspectRatio:t,handle:r,handleSize:a,hover:l,leftImage:s,leftImageAlt:u,leftImageCss:c,leftImageLabel:d,onSliderPositionChange:p,rightImage:g,rightImageAlt:f,rightImageCss:b,rightImageLabel:h,skeleton:m,sliderLineColor:x,sliderLineWidth:v,sliderPositionPercentage:w,vertical:y}=e,O=!y,[E,L]=Object(n.useState)(w),[j,S]=Object(n.useState)(0),[I,P]=Object(n.useState)(0),[C,$]=Object(n.useState)(!1),[R,k]=Object(n.useState)(!1),[z,A]=Object(n.useState)(!1),D=Object(n.useRef)(null),M=Object(n.useRef)(null),_=Object(n.useRef)(null);Object(n.useEffect)(()=>{const e=D.current,t=new ResizeObserver(([e,...t])=>{const r=e.target.getBoundingClientRect().width;S(r)});return t.observe(e),()=>t.disconnect()},[]),Object(n.useEffect)(()=>(_.current.complete&&$(!0),()=>{$(!1)}),[s]),Object(n.useEffect)(()=>(M.current.complete&&k(!0),()=>{k(!1)}),[g]);const W=R&&C;Object(n.useEffect)(()=>{const e=e=>{const t=e||window.event,r=t.touches?t.touches[0].pageX:t.pageX,n=t.touches?t.touches[0].pageY:t.pageY,o=r-window.pageXOffset,a=n-window.pageYOffset,i=M.current.getBoundingClientRect();let l=O?o-i.left:a-i.top;const s=0+v/2,u=O?j-v/2:I-v/2;l<s&&(l=s),l>u&&(l=u),L(O?l/j:l/I),p&&p(O?l/j:l/I)},r=t=>{A(!0),"touches"in t||t.preventDefault(),e(t),window.addEventListener("mousemove",e),window.addEventListener("touchmove",e)},n=()=>{A(!1),window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",e)},o=D.current;if(W){o.addEventListener("touchstart",r),window.addEventListener("touchend",n),l?(o.addEventListener("mousemove",e),o.addEventListener("mouseleave",n)):(o.addEventListener("mousedown",r),window.addEventListener("mouseup",n));const a=_.current.naturalHeight/_.current.naturalWidth,i=M.current.naturalHeight/M.current.naturalWidth,s="taller"===t?Math.max(a,i):Math.min(a,i);P(j*s)}return()=>{o.removeEventListener("touchstart",r),window.removeEventListener("touchend",n),o.removeEventListener("mousemove",e),o.removeEventListener("mouseleave",n),o.removeEventListener("mousedown",r),window.removeEventListener("mouseup",n),window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",e)}},[W,t,I,j,O,l,v,y]);const F={container:{boxSizing:"border-box",position:"relative",width:"100%",height:I+"px",overflow:"hidden"},rightImage:i({clip:O?`rect(auto, auto, auto, ${j*E}px)`:`rect(${I*E}px, auto, auto, auto)`,display:"block",height:"100%",objectFit:"cover",position:"absolute",width:"100%"},b),leftImage:i({clip:O?`rect(auto, ${j*E}px, auto, auto)`:`rect(auto, auto, ${I*E}px, auto)`,display:"block",height:"100%",objectFit:"cover",position:"absolute",width:"100%"},c),slider:{alignItems:"center",cursor:!l&&O?"ew-resize":!l&&!O&&"ns-resize",display:"flex",flexDirection:O?"column":"row",height:O?"100%":a+"px",justifyContent:"center",left:O?j*E-a/2+"px":0,position:"absolute",top:O?0:I*E-a/2+"px",width:O?a+"px":"100%"},line:{background:x,boxShadow:"0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",flex:"0 1 auto",height:O?"100%":v+"px",width:O?v+"px":"100%"},handleCustom:{alignItems:"center",boxSizing:"border-box",display:"flex",flex:"1 0 auto",height:"auto",justifyContent:"center",width:"auto"},handleDefault:{alignItems:"center",border:`${v}px solid ${x}`,borderRadius:"100%",boxShadow:"0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",boxSizing:"border-box",display:"flex",flex:"1 0 auto",height:a+"px",justifyContent:"center",width:a+"px",transform:O?"none":"rotate(90deg)"},leftArrow:{border:`inset ${.15*a}px rgba(0,0,0,0)`,borderRight:`${.15*a}px solid ${x}`,height:"0px",marginLeft:`-${.25*a}px`,marginRight:.25*a+"px",width:"0px"},rightArrow:{border:`inset ${.15*a}px rgba(0,0,0,0)`,borderLeft:`${.15*a}px solid ${x}`,height:"0px",marginRight:`-${.25*a}px`,width:"0px"},leftLabel:{background:"rgba(0, 0, 0, 0.5)",color:"white",left:O?"5%":"50%",opacity:z?0:1,padding:"10px 20px",position:"absolute",top:O?"50%":"3%",transform:O?"translate(0,-50%)":"translate(-50%, 0)",transition:"opacity 0.1s ease-out"},rightLabel:{background:"rgba(0, 0, 0, 0.5)",color:"white",opacity:z?0:1,padding:"10px 20px",position:"absolute",left:O?null:"50%",right:O?"5%":null,top:O?"50%":null,bottom:O?null:"3%",transform:O?"translate(0,-50%)":"translate(-50%, 0)",transition:"opacity 0.1s ease-out"},leftLabelContainer:{clip:O?`rect(auto, ${j*E}px, auto, auto)`:`rect(auto, auto, ${I*E}px, auto)`,height:"100%",position:"absolute",width:"100%"},rightLabelContainer:{clip:O?`rect(auto, auto, auto, ${j*E}px)`:`rect(${I*E}px, auto, auto, auto)`,height:"100%",position:"absolute",width:"100%"}};return o.a.createElement(o.a.Fragment,null,m&&!W&&o.a.createElement("div",{style:i({},F.container)},m),o.a.createElement("div",{style:i(i({},F.container),{},{display:W?"block":"none"}),ref:D,"data-testid":"container"},o.a.createElement("img",{onLoad:()=>k(!0),alt:f,"data-testid":"right-image",ref:M,src:g,style:F.rightImage}),o.a.createElement("img",{onLoad:()=>$(!0),alt:u,"data-testid":"left-image",ref:_,src:s,style:F.leftImage}),o.a.createElement("div",{style:F.slider},o.a.createElement("div",{style:F.line}),r?o.a.createElement("div",{style:F.handleCustom},r):o.a.createElement("div",{style:F.handleDefault},o.a.createElement("div",{style:F.leftArrow}),o.a.createElement("div",{style:F.rightArrow})),o.a.createElement("div",{style:F.line})),d&&o.a.createElement("div",{style:F.leftLabelContainer},o.a.createElement("div",{style:F.leftLabel},d)),h&&o.a.createElement("div",{style:F.rightLabelContainer},o.a.createElement("div",{style:F.rightLabel},h))))};s.defaultProps={aspectRatio:"taller",handle:null,handleSize:40,hover:!1,leftImageAlt:"",leftImageCss:{},leftImageLabel:null,onSliderPositionChange:()=>{},rightImageAlt:"",rightImageCss:{},rightImageLabel:null,skeleton:null,sliderLineColor:"#ffffff",sliderLineWidth:2,sliderPositionPercentage:.5,vertical:!1},t.default=s}]);

/***/ }),
/* 7 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 8 */
/*!*******************************!*\
  !*** ./src/block/editor.scss ***!
  \*******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/*!***************************!*\
  !*** ./src/block/save.js ***!
  \***************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var Save = function Save(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className;
    var beforeImageUrl = attributes.beforeImageUrl,
        beforeImageId = attributes.beforeImageId,
        beforeImageAlt = attributes.beforeImageAlt,
        afterImageUrl = attributes.afterImageUrl,
        afterImageId = attributes.afterImageId,
        afterImageAlt = attributes.afterImageAlt,
        hover = attributes.hover,
        showLabel = attributes.showLabel,
        leftImageLabel = attributes.leftImageLabel,
        rightImageLabel = attributes.rightImageLabel,
        verticalMode = attributes.verticalMode;

    return wp.element.createElement(
        "div",
        { className: className + " icgb-compare-block", "data-hover": hover, "data-label": showLabel, "data-lil": leftImageLabel, "data-ril": rightImageLabel, "data-vertical": verticalMode },
        wp.element.createElement("img", { src: beforeImageUrl, alt: beforeImageAlt, className: "wp-image-" + beforeImageId }),
        wp.element.createElement("img", { src: afterImageUrl, alt: afterImageAlt, className: "wp-image-" + afterImageId })
    );
};
/* harmony default export */ __webpack_exports__["a"] = (Save);

/***/ }),
/* 10 */
/*!******************************!*\
  !*** ./src/block/style.scss ***!
  \******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);