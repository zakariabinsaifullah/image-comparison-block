const ServiceCard = ({ title, description, actions }) => {
    return (
        <div className="service-card">
            {title && <h3 className="service-tilte">{title}</h3>}
            {description && <p className="service-description">{description}</p>}
            {actions && (
                <div className="service-actions">
                    {actions.map((action, index) => {
                        return (
                            <a key={index} className="service-action" href={action.link} rel="noopener noreferrer" target="_blank">
                                {action.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ServiceCard;
