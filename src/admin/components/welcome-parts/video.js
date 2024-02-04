const Video = ({ title, description, videoId, videoWidth = '', videoHeight = '', actions }) => {
    return (
        <div className="video-container">
            {title && <h3 className="video-title">{title}</h3>}
            {description && <p className="video-description">{description}</p>}
            <div className="video-wrapper">
                <iframe
                    title="GutSlider Blocks Video Tutorial"
                    width={videoWidth || 560}
                    height={videoHeight || 315}
                    src={`https://www.youtube.com/embed/${videoId}?controls=0&rel=0`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                />
            </div>
            {actions && (
                <div className="video-actions">
                    {actions.map((action, index) => (
                        <a
                            key={index}
                            className={`video-action ${action.btnType}`}
                            href={action.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {action.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Video;
