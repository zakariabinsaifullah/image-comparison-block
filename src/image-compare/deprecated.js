/**
 * Version 1.0.0 saved static markup. The block is now rendered on the server,
 * so this entry lets existing posts validate and migrate silently.
 */
const v1 = {
	attributes: {
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
	},
	save( { attributes } ) {
		const {
			beforeImageUrl,
			beforeImageId,
			beforeImageAlt,
			afterImageUrl,
			afterImageId,
			afterImageAlt,
			hover,
			showLabel,
			leftImageLabel,
			rightImageLabel,
			verticalMode,
		} = attributes;

		// v1 read an undefined `className` prop, which was serialised literally.
		return (
			<div
				className="undefined icgb-compare-block"
				data-hover={ hover }
				data-label={ showLabel }
				data-lil={ leftImageLabel }
				data-ril={ rightImageLabel }
				data-vertical={ verticalMode }
			>
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
			</div>
		);
	},
	migrate( { beforeImageAlt, afterImageAlt, ...attributes } ) {
		return {
			...attributes,
			beforeImageAlt: beforeImageAlt || '',
			afterImageAlt: afterImageAlt || '',
		};
	},
};

export default [ v1 ];
