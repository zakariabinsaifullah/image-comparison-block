/**
 * Sidebar controls for the Image Compare block.
 *
 * Settings tab: Images, Slider, Labels.
 * Styles tab:   Handle, Labels (plus core Border, Dimensions and Shadow supports).
 */

/* eslint-disable @wordpress/no-unsafe-wp-apis -- ToolsPanel, ToggleGroupControl and the color
   dropdown are the components core blocks use for their own sidebars. */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	FontSizePicker,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import ImageControl from './image-control';
import { clampPercent, getLabelPosition } from './utils';

const HANDLE_DEFAULTS = {
	handleStyle: undefined,
	handleColor: undefined,
	handleBackground: undefined,
	handleSize: undefined,
	lineWidth: undefined,
};

const LABEL_STYLE_DEFAULTS = {
	labelPosition: undefined,
	labelColor: undefined,
	labelBackground: undefined,
	labelFontSize: undefined,
};

function SettingsPanels( {
	attributes,
	setAttributes,
	selectImage,
	removeImage,
} ) {
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
		labelsOnHover,
		leftImageLabel,
		rightImageLabel,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Images', 'image-compare-block' ) }>
				<ImageControl
					label={ __( 'Before image', 'image-compare-block' ) }
					url={ beforeImageUrl }
					id={ beforeImageId }
					alt={ beforeImageAlt }
					onSelect={ selectImage( 'before' ) }
					onRemove={ removeImage( 'before' ) }
					onAltChange={ ( value ) =>
						setAttributes( { beforeImageAlt: value } )
					}
				/>
				<ImageControl
					label={ __( 'After image', 'image-compare-block' ) }
					url={ afterImageUrl }
					id={ afterImageId }
					alt={ afterImageAlt }
					onSelect={ selectImage( 'after' ) }
					onRemove={ removeImage( 'after' ) }
					onAltChange={ ( value ) =>
						setAttributes( { afterImageAlt: value } )
					}
				/>
			</PanelBody>

			<PanelBody title={ __( 'Slider', 'image-compare-block' ) }>
				<div className="icgb-inspector-stack">
					<ToggleGroupControl
						label={ __( 'Orientation', 'image-compare-block' ) }
						value={ verticalMode ? 'vertical' : 'horizontal' }
						onChange={ ( value ) =>
							setAttributes( {
								verticalMode: value === 'vertical',
							} )
						}
						isBlock
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					>
						<ToggleGroupControlOption
							value="horizontal"
							label={ __( 'Horizontal', 'image-compare-block' ) }
						/>
						<ToggleGroupControlOption
							value="vertical"
							label={ __( 'Vertical', 'image-compare-block' ) }
						/>
					</ToggleGroupControl>
					<RangeControl
						label={ __(
							'Starting position',
							'image-compare-block'
						) }
						help={ __(
							'How much of the before image is visible when the page loads.',
							'image-compare-block'
						) }
						value={ clampPercent( startingPoint ) }
						onChange={ ( value ) =>
							setAttributes( { startingPoint: value ?? 50 } )
						}
						min={ 0 }
						max={ 100 }
						renderTooltipContent={ ( value ) => `${ value }%` }
						allowReset
						resetFallbackValue={ 50 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Move on hover', 'image-compare-block' ) }
						help={ __(
							'The slider follows the mouse without clicking.',
							'image-compare-block'
						) }
						checked={ !! hover }
						onChange={ ( value ) =>
							setAttributes( { hover: value } )
						}
						__nextHasNoMarginBottom
					/>
				</div>
			</PanelBody>

			<PanelBody
				title={ __( 'Labels', 'image-compare-block' ) }
				initialOpen={ !! showLabel }
			>
				<div className="icgb-inspector-stack">
					<ToggleControl
						label={ __( 'Show labels', 'image-compare-block' ) }
						checked={ !! showLabel }
						onChange={ ( value ) =>
							setAttributes( { showLabel: value } )
						}
						__nextHasNoMarginBottom
					/>
					{ showLabel && (
						<>
							<TextControl
								label={ __(
									'Before label',
									'image-compare-block'
								) }
								value={ leftImageLabel || '' }
								onChange={ ( value ) =>
									setAttributes( { leftImageLabel: value } )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<TextControl
								label={ __(
									'After label',
									'image-compare-block'
								) }
								value={ rightImageLabel || '' }
								onChange={ ( value ) =>
									setAttributes( { rightImageLabel: value } )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __(
									'Only show on hover',
									'image-compare-block'
								) }
								checked={ !! labelsOnHover }
								onChange={ ( value ) =>
									setAttributes( { labelsOnHover: value } )
								}
								__nextHasNoMarginBottom
							/>
						</>
					) }
				</div>
			</PanelBody>
		</InspectorControls>
	);
}

function StylePanels( { attributes, setAttributes, clientId } ) {
	const {
		verticalMode,
		showLabel,
		handleStyle,
		handleColor,
		handleBackground,
		handleSize,
		lineWidth,
		labelPosition,
		labelColor,
		labelBackground,
		labelFontSize,
	} = attributes;

	const colorSettings = useMultipleOriginColorsAndGradients();
	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const colorDropdown = ( settings ) => (
		<ColorGradientSettingsDropdown
			__experimentalIsRenderedInSidebar
			settings={ settings }
			panelId={ clientId }
			{ ...colorSettings }
			gradients={ [] }
			disableCustomGradients
		/>
	);

	const positionOptions = verticalMode
		? [
				[ 'start', __( 'Left', 'image-compare-block' ) ],
				[ 'center', __( 'Center', 'image-compare-block' ) ],
				[ 'end', __( 'Right', 'image-compare-block' ) ],
			]
		: [
				[ 'start', __( 'Top', 'image-compare-block' ) ],
				[ 'center', __( 'Middle', 'image-compare-block' ) ],
				[ 'end', __( 'Bottom', 'image-compare-block' ) ],
			];

	return (
		<InspectorControls group="styles">
			<ToolsPanel
				label={ __( 'Handle', 'image-compare-block' ) }
				panelId={ clientId }
				resetAll={ () => setAttributes( HANDLE_DEFAULTS ) }
				className="icgb-tools-panel"
			>
				<ToolsPanelItem
					label={ __( 'Style', 'image-compare-block' ) }
					hasValue={ () =>
						!! handleStyle && handleStyle !== 'circle'
					}
					onDeselect={ () =>
						setAttributes( { handleStyle: undefined } )
					}
					isShownByDefault
					panelId={ clientId }
				>
					<ToggleGroupControl
						label={ __( 'Style', 'image-compare-block' ) }
						value={ handleStyle || 'circle' }
						onChange={ ( value ) =>
							setAttributes( { handleStyle: value } )
						}
						isBlock
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					>
						<ToggleGroupControlOption
							value="circle"
							label={ __( 'Circle', 'image-compare-block' ) }
						/>
						<ToggleGroupControlOption
							value="square"
							label={ __( 'Square', 'image-compare-block' ) }
						/>
						<ToggleGroupControlOption
							value="line"
							label={ __( 'Line', 'image-compare-block' ) }
						/>
					</ToggleGroupControl>
				</ToolsPanelItem>

				{ colorDropdown( [
					{
						label: __( 'Color', 'image-compare-block' ),
						colorValue: handleColor,
						onColorChange: ( value ) =>
							setAttributes( { handleColor: value } ),
						isShownByDefault: true,
						resetAllFilter: () => ( { handleColor: undefined } ),
						clearable: true,
					},
					...( handleStyle === 'line'
						? []
						: [
								{
									label: __(
										'Background',
										'image-compare-block'
									),
									colorValue: handleBackground,
									onColorChange: ( value ) =>
										setAttributes( {
											handleBackground: value,
										} ),
									isShownByDefault: true,
									resetAllFilter: () => ( {
										handleBackground: undefined,
									} ),
									clearable: true,
								},
							] ),
				] ) }

				<ToolsPanelItem
					label={ __( 'Size', 'image-compare-block' ) }
					hasValue={ () => !! handleSize && handleSize !== 44 }
					onDeselect={ () =>
						setAttributes( { handleSize: undefined } )
					}
					isShownByDefault
					panelId={ clientId }
				>
					<RangeControl
						label={ __( 'Size', 'image-compare-block' ) }
						value={ handleSize ?? 44 }
						onChange={ ( value ) =>
							setAttributes( { handleSize: value } )
						}
						min={ 24 }
						max={ 96 }
						renderTooltipContent={ ( value ) => `${ value }px` }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</ToolsPanelItem>

				<ToolsPanelItem
					label={ __( 'Line width', 'image-compare-block' ) }
					hasValue={ () => !! lineWidth && lineWidth !== 2 }
					onDeselect={ () =>
						setAttributes( { lineWidth: undefined } )
					}
					panelId={ clientId }
				>
					<RangeControl
						label={ __( 'Line width', 'image-compare-block' ) }
						value={ lineWidth ?? 2 }
						onChange={ ( value ) =>
							setAttributes( { lineWidth: value } )
						}
						min={ 0 }
						max={ 10 }
						renderTooltipContent={ ( value ) => `${ value }px` }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</ToolsPanelItem>
			</ToolsPanel>

			{ showLabel && (
				<ToolsPanel
					label={ __( 'Labels', 'image-compare-block' ) }
					panelId={ clientId }
					resetAll={ () => setAttributes( LABEL_STYLE_DEFAULTS ) }
					className="icgb-tools-panel"
				>
					<ToolsPanelItem
						label={ __( 'Position', 'image-compare-block' ) }
						hasValue={ () => !! labelPosition }
						onDeselect={ () =>
							setAttributes( { labelPosition: undefined } )
						}
						isShownByDefault
						panelId={ clientId }
					>
						<ToggleGroupControl
							label={ __( 'Position', 'image-compare-block' ) }
							value={ getLabelPosition( attributes ) }
							onChange={ ( value ) =>
								setAttributes( { labelPosition: value } )
							}
							isBlock
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							{ positionOptions.map( ( [ value, label ] ) => (
								<ToggleGroupControlOption
									key={ value }
									value={ value }
									label={ label }
								/>
							) ) }
						</ToggleGroupControl>
					</ToolsPanelItem>

					{ colorDropdown( [
						{
							label: __( 'Text', 'image-compare-block' ),
							colorValue: labelColor,
							onColorChange: ( value ) =>
								setAttributes( { labelColor: value } ),
							isShownByDefault: true,
							resetAllFilter: () => ( { labelColor: undefined } ),
							clearable: true,
						},
						{
							label: __( 'Background', 'image-compare-block' ),
							colorValue: labelBackground,
							onColorChange: ( value ) =>
								setAttributes( { labelBackground: value } ),
							isShownByDefault: true,
							resetAllFilter: () => ( {
								labelBackground: undefined,
							} ),
							clearable: true,
						},
					] ) }

					<ToolsPanelItem
						label={ __( 'Font size', 'image-compare-block' ) }
						hasValue={ () => !! labelFontSize }
						onDeselect={ () =>
							setAttributes( { labelFontSize: undefined } )
						}
						isShownByDefault
						panelId={ clientId }
					>
						<FontSizePicker
							fontSizes={
								Array.isArray( fontSizes ) ? fontSizes : []
							}
							value={ labelFontSize }
							onChange={ ( value ) =>
								setAttributes( {
									labelFontSize:
										typeof value === 'number'
											? `${ value }px`
											: value || undefined,
								} )
							}
							withReset={ false }
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			) }
		</InspectorControls>
	);
}

export default function Inspector( props ) {
	return (
		<>
			<SettingsPanels { ...props } />
			<StylePanels { ...props } />
		</>
	);
}
