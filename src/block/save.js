
const Save = ({ attributes, className }) => {
    const { beforeImageUrl, beforeImageId, beforeImageAlt, afterImageUrl, afterImageId, afterImageAlt, hover, showLabel, leftImageLabel, rightImageLabel, verticalMode } = attributes; 
    return(
        <div className={`${className} icgb-compare-block`} data-hover={hover} data-label={showLabel} data-lil={leftImageLabel} data-ril={rightImageLabel} data-vertical={verticalMode}>
            <img src={beforeImageUrl} alt={beforeImageAlt} className={`wp-image-${beforeImageId}`} />
            <img src={afterImageUrl} alt={afterImageAlt} className={`wp-image-${afterImageId}`} />
        </div>
    );
}
export default Save; 