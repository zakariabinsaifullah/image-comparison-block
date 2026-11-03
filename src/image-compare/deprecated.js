/**
 * Earlier versions saved static markup. The block is now rendered on the
 * server, so these entries let existing posts validate and migrate silently.
 */
import { useBlockProps } from '@wordpress/block-editor';

const attributes = {
	beforeImageUrl: { type: 'string' },
	beforeImageAlt: { type: 'string' },
	beforeImageId: { type: 'number' },
	afterImageUrl: { type: 'string' },
	afterImageAlt: { type: 'string' },
	afterImageId: { type: 'number' },
	verticalMode: { type: 'boolean', default: false },
	hover: { type: 'boolean', default: false },
	showLabel: { type: 'boolean', default: false },
	leftImageLabel: { type: 'string', default: 'Before' },
	rightImageLabel: { type: 'string', default: 'After' },
};

const migrate = ( { beforeImageAlt, afterImageAlt, ...rest } ) => ( {
	...rest,
	beforeImageAlt: beforeImageAlt || '',
	afterImageAlt: afterImageAlt || '',
} );

const Images = ( {
	beforeImageUrl,
	beforeImageId,
	beforeImageAlt,
	afterImageUrl,
	afterImageId,
	afterImageAlt,
} ) => (
	<>
		<img
			src={ beforeImageUrl }
			alt={ beforeImageAlt }
			className={ `wp-image-${ beforeImageId }` }
		/>
		<img
			src={ afterImageUrl }
			alt={ afterImageAlt }
			className={ `wp-image-${ afterImageId }` }
		/>
	</>
);

const dataAttributes = ( a ) => ( {
	'data-hover': a.hover,
	'data-label': a.showLabel,
	'data-lil': a.leftImageLabel,
	'data-ril': a.rightImageLabel,
	'data-vertical': a.verticalMode,
} );

/**
 * Versions 1.5.0 – 1.6.2: useBlockProps.save() and HTML anchor support.
 * The anchor was stored in the markup's id; it is now kept in the block
 * comment so the server-rendered block can output it.
 */
const v16 = {
	attributes: {
		...attributes,
		anchor: {
			type: 'string',
			source: 'attribute',
			attribute: 'id',
			selector: '*',
		},
	},
	supports: {
		html: false,
		anchor: true,
	},
	save( { attributes: a } ) {
		return (
			<div
				{ ...useBlockProps.save( { className: 'icgb-compare-block' } ) }
				{ ...dataAttributes( a ) }
			>
				<Images { ...a } />
			</div>
		);
	},
	migrate,
};

/**
 * Version 1.0.0: read an undefined `className` prop, which was serialised
 * literally as "undefined".
 */
const v1 = {
	attributes,
	save( { attributes: a } ) {
		return (
			<div
				className="undefined icgb-compare-block"
				{ ...dataAttributes( a ) }
			>
				<Images { ...a } />
			</div>
		);
	},
	migrate,
};

export default [ v16, v1 ];
