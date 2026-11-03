import { SVG, Path } from '@wordpress/primitives';

export const BlockIcon = {
	foreground: '#7952B3',
	src: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<Path d="M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm5.8-7v-2h-21v15h2v-13h19zm3 2v14h-20v-14h20zm-2 2h-16v10h16v-10z" />
		</SVG>
	),
};

// Keep in sync with the arrows markup in render.php.
export const HandleArrows = () => (
	<svg
		className="icgb-compare__arrows"
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
	</svg>
);
