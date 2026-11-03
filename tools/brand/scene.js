/**
 * Shared SVG artwork for the WordPress.org banner and icon.
 *
 * A landscape split down the middle: the "before" half is muted and grey,
 * the "after" half is vivid, with the slider handle on the seam.
 */

// Landscape drawn in a 600x400 box. `p` is a palette.
const landscape = ( p ) => `
	<rect width="600" height="400" fill="url(#sky-${ p.id })"/>
	<circle cx="455" cy="105" r="46" fill="${ p.sun }"/>
	<circle cx="455" cy="105" r="70" fill="${ p.sun }" opacity="0.18"/>
	<path d="M0 250 L95 160 L170 215 L270 120 L370 205 L450 150 L600 240 V400 H0Z" fill="${ p.far }"/>
	<path d="M0 300 L120 225 L215 280 L330 205 L445 285 L600 250 V400 H0Z" fill="${ p.mid }"/>
	<path d="M0 340 Q150 300 300 330 T600 320 V400 H0Z" fill="${ p.near }"/>
	<g fill="${ p.cloud }">
		<ellipse cx="150" cy="80" rx="58" ry="20"/><ellipse cx="185" cy="66" rx="36" ry="22"/>
		<ellipse cx="300" cy="120" rx="44" ry="15"/><ellipse cx="325" cy="110" rx="26" ry="16"/>
	</g>
	<g fill="${ p.tree }">
		<path d="M70 345 l14 -40 l14 40z"/><path d="M92 352 l12 -34 l12 34z"/>
		<path d="M505 330 l15 -44 l15 44z"/><path d="M530 340 l12 -32 l12 32z"/>
	</g>`;

const palettes = {
	before: {
		id: 'before',
		skyTop: '#c9ccd3',
		skyBottom: '#e6e7ea',
		sun: '#f3f3f4',
		far: '#9a9ea8',
		mid: '#7c808a',
		near: '#5d616a',
		cloud: '#f4f4f6',
		tree: '#474a51',
	},
	after: {
		id: 'after',
		skyTop: '#3aa0ff',
		skyBottom: '#bfe6ff',
		sun: '#ffd23f',
		far: '#6c7ee1',
		mid: '#2e9e6a',
		near: '#1f7a4d',
		cloud: '#ffffff',
		tree: '#155c3a',
	},
};

const skyGradient = ( p ) => `
	<linearGradient id="sky-${ p.id }" x1="0" y1="0" x2="0" y2="1">
		<stop offset="0" stop-color="${ p.skyTop }"/>
		<stop offset="1" stop-color="${ p.skyBottom }"/>
	</linearGradient>`;

/**
 * Before/after scene with a slider handle, scaled into a w x h box.
 *
 * @param {Object}  o         Options.
 * @param {number}  o.w       Width.
 * @param {number}  o.h       Height.
 * @param {number}  o.split   Handle position, 0-1.
 * @param {number}  o.knob    Knob radius.
 * @param {boolean} o.labels  Draw Before/After labels.
 * @param {number}  o.radius  Corner radius of the frame.
 * @param {string}  o.id      Unique id prefix.
 * @return {string} SVG group markup (defs included).
 */
const scene = ( { w, h, split = 0.5, knob = 26, labels = false, radius = 18, id = 's' } ) => {
	const x = Math.round( w * split );
	const sx = w / 600;
	const sy = h / 400;
	const s = Math.max( sx, sy );
	const tx = ( w - 600 * s ) / 2;
	const ty = ( h - 400 * s ) / 2;
	const art = ( p ) =>
		`<g transform="translate(${ tx } ${ ty }) scale(${ s })">${ landscape( p ) }</g>`;
	const label = ( text, lx, anchor ) => {
		const size = Math.round( h * 0.052 );
		const pad = size * 0.7;
		const lw = text.length * size * 0.6 + pad * 2;
		const lh = size * 1.7;
		const left = anchor === 'start' ? lx : lx - lw;
		const top = h - h * 0.06 - lh;
		return `
		<g font-family="-apple-system, 'SF Pro Display', 'Segoe UI', Helvetica, Arial, sans-serif" font-size="${ size }" font-weight="600">
			<rect x="${ left }" y="${ top }" width="${ lw }" height="${ lh }" rx="${ lh * 0.22 }" fill="rgba(10,0,40,0.55)"/>
			<text x="${ left + lw / 2 }" y="${ top + lh / 2 + size * 0.35 }" fill="#fff" text-anchor="middle">${ text }</text>
		</g>`;
	};

	return `
	<defs>
		${ skyGradient( palettes.before ) }
		${ skyGradient( palettes.after ) }
		<clipPath id="${ id }-frame"><rect width="${ w }" height="${ h }" rx="${ radius }"/></clipPath>
		<clipPath id="${ id }-left"><rect width="${ x }" height="${ h }"/></clipPath>
		<filter id="${ id }-shadow" x="-50%" y="-50%" width="200%" height="200%">
			<feDropShadow dx="0" dy="${ knob * 0.12 }" stdDeviation="${ knob * 0.22 }" flood-color="#0a0028" flood-opacity="0.45"/>
		</filter>
	</defs>
	<g clip-path="url(#${ id }-frame)">
		${ art( palettes.after ) }
		<g clip-path="url(#${ id }-left)">${ art( palettes.before ) }</g>
		${ labels ? label( 'Before', h * 0.06, 'start' ) + label( 'After', w - h * 0.06, 'end' ) : '' }
		<rect x="${ x - Math.max( 1.5, knob * 0.09 ) }" y="0" width="${ Math.max( 3, knob * 0.18 ) }" height="${ h }" fill="#fff" filter="url(#${ id }-shadow)"/>
	</g>
	<g transform="translate(${ x } ${ h / 2 })" filter="url(#${ id }-shadow)">
		<circle r="${ knob }" fill="#7952B3" stroke="#fff" stroke-width="${ Math.max( 2, knob * 0.14 ) }"/>
		<path d="M${ -knob * 0.18 } ${ -knob * 0.32 } l${ -knob * 0.3 } ${ knob * 0.32 } l${ knob * 0.3 } ${ knob * 0.32 } M${ knob * 0.18 } ${ -knob * 0.32 } l${ knob * 0.3 } ${ knob * 0.32 } l${ -knob * 0.3 } ${ knob * 0.32 }" fill="none" stroke="#fff" stroke-width="${ Math.max( 2, knob * 0.15 ) }" stroke-linecap="round" stroke-linejoin="round"/>
	</g>`;
};

const FONT =
	"-apple-system, 'SF Pro Display', 'Segoe UI', Helvetica, Arial, sans-serif";

/**
 * Banner, 1544x500 artboard (rendered at 1544x500 and 772x250).
 *
 * @return {string} SVG markup.
 */
const banner = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1544 500" width="1544" height="500">
	<defs>
		<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#14003f"/>
			<stop offset="0.55" stop-color="#2b0a6e"/>
			<stop offset="1" stop-color="#5a2fa8"/>
		</linearGradient>
		<radialGradient id="glow" cx="0.78" cy="0.45" r="0.45">
			<stop offset="0" stop-color="#a77bff" stop-opacity="0.45"/>
			<stop offset="1" stop-color="#a77bff" stop-opacity="0"/>
		</radialGradient>
		<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
			<circle cx="2" cy="2" r="1.6" fill="#ffffff" opacity="0.07"/>
		</pattern>
		<filter id="card-shadow" x="-20%" y="-20%" width="140%" height="150%">
			<feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#06001a" flood-opacity="0.55"/>
		</filter>
	</defs>
	<rect width="1544" height="500" fill="url(#bg)"/>
	<rect width="1544" height="500" fill="url(#dots)"/>
	<rect width="1544" height="500" fill="url(#glow)"/>

	<g font-family="${ FONT }">
		<g transform="translate(96 112)">
			<rect width="240" height="40" rx="20" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.25"/>
			<circle cx="22" cy="20" r="6" fill="#ffd23f"/>
			<text x="38" y="26.5" font-size="17" font-weight="600" fill="#e9ddff" letter-spacing="0.6">WORDPRESS BLOCK</text>
		</g>
		<text x="92" y="238" font-size="78" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Image Comparison</text>
		<text x="92" y="322" font-size="78" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Block</text>
		<rect x="96" y="346" width="96" height="6" rx="3" fill="#ffd23f"/>
		<text x="96" y="398" font-size="25" font-weight="500" fill="#d9caff">Before &amp; after sliders. Fast, accessible, no jQuery.</text>
	</g>

	<g transform="translate(866 70) rotate(-2.5 300 180)" filter="url(#card-shadow)">
		<rect x="-10" y="-10" width="620" height="380" rx="24" fill="#ffffff" fill-opacity="0.14"/>
		${ scene( { w: 600, h: 360, split: 0.5, knob: 30, labels: true, radius: 16, id: 'banner' } ) }
	</g>
</svg>`;

/**
 * Icon, 256x256 artboard (rendered at 256 and 128, and shipped as SVG).
 *
 * @return {string} SVG markup.
 */
const icon = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
	<defs>
		<linearGradient id="icon-bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#2b0a6e"/>
			<stop offset="1" stop-color="#7952B3"/>
		</linearGradient>
	</defs>
	<rect width="256" height="256" rx="56" fill="url(#icon-bg)"/>
	<g transform="translate(28 40)">
		${ scene( { w: 200, h: 176, split: 0.5, knob: 26, labels: false, radius: 22, id: 'icon' } ) }
	</g>
</svg>`;

module.exports = { banner, icon };
