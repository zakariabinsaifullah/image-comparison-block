// import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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
        <div
            {...useBlockProps.save({
                className: 'icgb-compare-block'
            })}
            data-hover={hover}
            data-label={showLabel}
            data-lil={leftImageLabel}
            data-ril={rightImageLabel}
            data-vertical={verticalMode}
        >
            <img src={beforeImageUrl} alt={beforeImageAlt} className={`wp-image-${beforeImageId}`} />
            <img src={afterImageUrl} alt={afterImageAlt} className={`wp-image-${afterImageId}`} />
        </div>
    );
}
