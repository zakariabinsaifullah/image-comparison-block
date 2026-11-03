/**
 * Editor component for the Image Compare block.
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useRefEffect } from '@wordpress/compose';
import { BlockIcon, HandleArrows } from './icons';
import { ALLOWED_MEDIA_TYPES } from './image-control';
import Inspector from './inspector';
import initImageCompare from './slider';
import { clampPercent, getWrapperProps } from './utils';

const SIDES = {
	before: {
		url: 'beforeImageUrl',
		id: 'beforeImageId',
		alt: 'beforeImageAlt',
	},
	after: {
		url: 'afterImageUrl',
		id: 'afterImageId',
		alt: 'afterImageAlt',
	},
};

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		beforeImageUrl,
		beforeImageId,
		beforeImageAlt,
		afterImageUrl,
		afterImageId,
		afterImageAlt,
		verticalMode,
		hover,
		startingPoint,
		showLabel,
		leftImageLabel,
		rightImageLabel,
	} = attributes;

	const hasImages = !! ( beforeImageUrl && afterImageUrl );
	const start = clampPercent( startingPoint );

	const selectImage = ( side ) => ( media ) => {
		if ( ! media?.url ) {
			return;
		}
		setAttributes( {
			[ SIDES[ side ].url ]: media.url,
			[ SIDES[ side ].id ]: media.id,
			[ SIDES[ side ].alt ]: media.alt || '',
		} );
	};

	const selectImageUrl = ( side ) => ( url ) =>
		setAttributes( {
			[ SIDES[ side ].url ]: url,
			[ SIDES[ side ].id ]: undefined,
			[ SIDES[ side ].alt ]: '',
		} );

	const removeImage = ( side ) => () =>
		setAttributes( {
			[ SIDES[ side ].url ]: undefined,
			[ SIDES[ side ].id ]: undefined,
			[ SIDES[ side ].alt ]: '',
		} );

	const swapImages = () =>
		setAttributes( {
			beforeImageUrl: afterImageUrl,
			beforeImageId: afterImageId,
			beforeImageAlt: afterImageAlt,
			afterImageUrl: beforeImageUrl,
			afterImageId: beforeImageId,
			afterImageAlt: beforeImageAlt,
		} );

	const sliderRef = useRefEffect(
		( node ) => ( hasImages ? initImageCompare( node ) : undefined ),
		[ hasImages, verticalMode, hover, start ]
	);

	const blockProps = useBlockProps( {
		ref: sliderRef,
		...getWrapperProps( attributes ),
		'data-hover': hover ? 'true' : 'false',
		'data-start': start,
	} );

	const inspector = (
		<Inspector
			attributes={ attributes }
			setAttributes={ setAttributes }
			clientId={ clientId }
			selectImage={ selectImage }
			removeImage={ removeImage }
		/>
	);

	if ( ! hasImages ) {
		const renderSide = ( side, label ) => {
			const url = attributes[ SIDES[ side ].url ];

			if ( url ) {
				return (
					<div className="icgb-placeholder__preview">
						<img src={ url } alt="" />
						<span className="icgb-placeholder__badge">
							{ label }
						</span>
						<Button
							variant="secondary"
							size="compact"
							onClick={ removeImage( side ) }
						>
							{ __( 'Remove', 'image-compare-block' ) }
						</Button>
					</div>
				);
			}

			return (
				<MediaPlaceholder
					icon={ BlockIcon.src }
					labels={ {
						title: label,
						instructions: __(
							'Upload an image, pick one from your media library, or insert from a URL.',
							'image-compare-block'
						),
					} }
					onSelect={ selectImage( side ) }
					onSelectURL={ selectImageUrl( side ) }
					accept="image/*"
					allowedTypes={ ALLOWED_MEDIA_TYPES }
				/>
			);
		};

		return (
			<>
				{ inspector }
				<div { ...blockProps }>
					<div className="icgb-placeholder">
						{ renderSide(
							'before',
							__( 'Before image', 'image-compare-block' )
						) }
						{ renderSide(
							'after',
							__( 'After image', 'image-compare-block' )
						) }
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			{ inspector }
			<BlockControls group="other">
				<ToolbarGroup>
					<ToolbarButton
						icon="image-flip-horizontal"
						label={ __( 'Swap images', 'image-compare-block' ) }
						onClick={ swapImages }
					/>
				</ToolbarGroup>
				<MediaReplaceFlow
					name={ __( 'Replace before', 'image-compare-block' ) }
					mediaId={ beforeImageId }
					mediaURL={ beforeImageUrl }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept="image/*"
					onSelect={ selectImage( 'before' ) }
					onSelectURL={ selectImageUrl( 'before' ) }
				/>
				<MediaReplaceFlow
					name={ __( 'Replace after', 'image-compare-block' ) }
					mediaId={ afterImageId }
					mediaURL={ afterImageUrl }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					accept="image/*"
					onSelect={ selectImage( 'after' ) }
					onSelectURL={ selectImageUrl( 'after' ) }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<div className="icgb-compare__container">
					<img
						className="icgb-compare__image icgb-compare__image--after"
						src={ afterImageUrl }
						alt={ afterImageAlt }
						draggable="false"
					/>
					<div className="icgb-compare__before">
						<img
							className="icgb-compare__image icgb-compare__image--before"
							src={ beforeImageUrl }
							alt={ beforeImageAlt }
							draggable="false"
						/>
					</div>
					{ showLabel && leftImageLabel && (
						<span className="icgb-compare__label is-before">
							{ leftImageLabel }
						</span>
					) }
					{ showLabel && rightImageLabel && (
						<span className="icgb-compare__label is-after">
							{ rightImageLabel }
						</span>
					) }
					<div
						className="icgb-compare__handle"
						role="slider"
						tabIndex={ 0 }
						aria-label={ __(
							'Image comparison slider',
							'image-compare-block'
						) }
						aria-orientation={
							verticalMode ? 'vertical' : 'horizontal'
						}
						aria-valuemin={ 0 }
						aria-valuemax={ 100 }
						aria-valuenow={ Math.round( start ) }
					>
						<span className="icgb-compare__knob">
							<HandleArrows />
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
