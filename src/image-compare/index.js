/**
 * Image Compare block.
 */
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import deprecated from './deprecated';
import Edit from './edit';
import { BlockIcon } from './icons';
import './editor.scss';
import './style.scss';

const previewImage = ( sky, ground, sun ) =>
	`data:image/svg+xml;utf8,${ encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="${ sky }"/><circle cx="600" cy="120" r="55" fill="${ sun }"/><path d="M0 330 L180 190 L330 300 L470 170 L800 360 V450 H0Z" fill="${ ground }"/></svg>`
	) }`;

registerBlockType( metadata.name, {
	icon: BlockIcon,
	example: {
		attributes: {
			beforeImageUrl: previewImage( '#9aa3ad', '#5b636b', '#d8dce0' ),
			afterImageUrl: previewImage( '#7cc4f2', '#3f8f4f', '#ffd54a' ),
			showLabel: true,
		},
	},
	edit: Edit,
	save: () => null,
	deprecated,
} );
