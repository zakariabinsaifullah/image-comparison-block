/* eslint-disable no-shadow */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button, TextControl } from '@wordpress/components';
const { Fragment } = wp.element;

import ReactCompareImage from 'react-compare-image';

// editor style
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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
        verticalMode
    } = attributes;
    return (
        <Fragment>
            <InspectorControls>
                <a href="https://beaf.gutenbergkits.com" target="_blank" rel="nofollow noreferrer" className="icgb-beaf-pro">
                    {__('Get Beaf Pro', 'image-comparision-block')}
                </a>
                <PanelBody title={__('Images Options')} initialOpen={false}>
                    <div className="icgb__image-options">
                        <div className="icgb__before-image-wrapper">
                            <div className="title">{__('Before Image', 'image-comparision-block')}</div>
                            <div className="edit-options">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={media =>
                                            setAttributes({
                                                beforeImageUrl: media.url,
                                                beforeImageId: media.id,
                                                beforeImageAlt: media.alt
                                            })
                                        }
                                        allowedTypes={['image']}
                                        value={beforeImageId}
                                        render={({ open }) => {
                                            return (
                                                <Button label={__('Edit Image', 'image-comparision-block')} onClick={open} icon="edit" />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                                <Button
                                    icon="trash"
                                    onClick={() =>
                                        setAttributes({
                                            beforeImageUrl: '',
                                            beforeImageId: null,
                                            beforeImageAlt: ''
                                        })
                                    }
                                />
                            </div>
                        </div>
                        {beforeImageUrl ? (
                            <img src={beforeImageUrl} alt={beforeImageAlt} className="card-image" />
                        ) : (
                            <MediaUpload
                                onSelect={newImage =>
                                    setAttributes({
                                        beforeImageUrl: newImage.sizes.full.url,
                                        beforeImageId: newImage.id,
                                        beforeImageAlt: newImage.alt
                                    })
                                }
                                type="image"
                                value={beforeImageId}
                                render={({ open }) => (
                                    <Button style={{ border: `1px solid #ccc` }} icon="upload" onClick={open}>
                                        {__('Upload Image', 'image-comparision-block')}
                                    </Button>
                                )}
                            />
                        )}
                        <div className="icgb__after-image-wrapper">
                            <div className="title">{__('After Image', 'image-comparision-block')}</div>
                            <div className="edit-options">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={media =>
                                            setAttributes({
                                                afterImageUrl: media.url,
                                                afterImageId: media.id,
                                                afterImageAlt: media.alt
                                            })
                                        }
                                        allowedTypes={['image']}
                                        value={afterImageId}
                                        render={({ open }) => {
                                            return (
                                                <Button label={__('Edit Image', 'image-comparision-block')} onClick={open} icon="edit" />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                                <Button
                                    icon="trash"
                                    onClick={() =>
                                        setAttributes({
                                            afterImageUrl: '',
                                            afterImageId: null,
                                            afterImageAlt: ''
                                        })
                                    }
                                />
                            </div>
                        </div>
                        {afterImageUrl ? (
                            <img src={afterImageUrl} alt={afterImageAlt} className="card-image" />
                        ) : (
                            <MediaUpload
                                onSelect={newImage =>
                                    setAttributes({
                                        afterImageUrl: newImage.sizes.full.url,
                                        afterImageId: newImage.id,
                                        afterImageAlt: newImage.alt
                                    })
                                }
                                type="image"
                                value={afterImageId}
                                render={({ open }) => (
                                    <Button style={{ border: `1px solid #ccc` }} icon="upload" onClick={open}>
                                        {__('Upload Image', 'image-comparision-block')}
                                    </Button>
                                )}
                            />
                        )}
                    </div>
                </PanelBody>
                <PanelBody title={__('Compare Options')} initialOpen={false}>
                    <ToggleControl
                        label="Vertical Mode"
                        checked={verticalMode}
                        onChange={() => setAttributes({ verticalMode: !verticalMode })}
                    />
                    <ToggleControl label="Start on Hover" checked={hover} onChange={() => setAttributes({ hover: !hover })} />
                    <ToggleControl label="Show Labels" checked={showLabel} onChange={() => setAttributes({ showLabel: !showLabel })} />
                    {showLabel && (
                        <Fragment>
                            <TextControl
                                label="Before Image Label"
                                value={leftImageLabel}
                                onChange={leftImageLabel => setAttributes({ leftImageLabel })}
                            />
                            <TextControl
                                label="After Image Label"
                                value={rightImageLabel}
                                onChange={rightImageLabel => setAttributes({ rightImageLabel })}
                            />
                        </Fragment>
                    )}
                </PanelBody>
            </InspectorControls>

            <div
                {...useBlockProps({
                    className: 'icgb-compare-block'
                })}
            >
                {beforeImageUrl && afterImageUrl ? (
                    <ReactCompareImage
                        leftImage={beforeImageUrl}
                        rightImage={afterImageUrl}
                        handleSize={50}
                        hover={hover}
                        leftImageLabel={showLabel ? leftImageLabel : null}
                        rightImageLabel={showLabel ? rightImageLabel : null}
                        vertical={verticalMode}
                    />
                ) : (
                    <p className="icgb-empty-images">{__('Please select images to compare', 'image-comparision-block')}</p>
                )}
            </div>
        </Fragment>
    );
}
