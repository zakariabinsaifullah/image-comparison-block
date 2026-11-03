/**
 * Sidebar control for picking one side of the comparison.
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, TextareaControl } from '@wordpress/components';

export const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function ImageControl( {
	label,
	url,
	id,
	alt,
	onSelect,
	onRemove,
	onAltChange,
} ) {
	return (
		<div className="icgb-image-control">
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ onSelect }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={ id }
					render={ ( { open } ) => (
						<div className="icgb-image-control__row">
							<Button
								className="icgb-image-control__thumb"
								onClick={ open }
								label={
									url
										? __(
												'Replace image',
												'image-compare-block'
											)
										: __(
												'Select image',
												'image-compare-block'
											)
								}
								showTooltip={ false }
							>
								{ url ? (
									<img src={ url } alt="" />
								) : (
									<span
										className="icgb-image-control__plus"
										aria-hidden="true"
									>
										+
									</span>
								) }
							</Button>
							<div className="icgb-image-control__meta">
								<p className="icgb-image-control__label">
									{ label }
								</p>
								<div className="icgb-image-control__actions">
									<Button
										variant="secondary"
										size="compact"
										onClick={ open }
									>
										{ url
											? __(
													'Replace',
													'image-compare-block'
												)
											: __(
													'Select',
													'image-compare-block'
												) }
									</Button>
									{ url && (
										<Button
											variant="tertiary"
											size="compact"
											isDestructive
											onClick={ onRemove }
										>
											{ __(
												'Remove',
												'image-compare-block'
											) }
										</Button>
									) }
								</div>
							</div>
						</div>
					) }
				/>
			</MediaUploadCheck>
			{ url && (
				<TextareaControl
					label={ __( 'Alternative text', 'image-compare-block' ) }
					help={ __(
						'Leave empty if the image is decorative.',
						'image-compare-block'
					) }
					value={ alt }
					onChange={ onAltChange }
					rows={ 2 }
					__nextHasNoMarginBottom
				/>
			) }
		</div>
	);
}
