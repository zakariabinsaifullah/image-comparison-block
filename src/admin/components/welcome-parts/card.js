import Icons from './icons';

const Card = ({ icon, title, description, action }) => {
    return (
        <div className="card-wrapper">
            {icon && <div className="card-icon">{Icons[icon]}</div>}
            {title && <h3 className="card-title">{title}</h3>}
            {description && <p className="card-description">{description}</p>}
            {action && (
                <a className="card-actions" href={action.link} target="_blank" rel="noopener noreferrer">
                    {action.label}
                </a>
            )}
        </div>
    );
};

export default Card;
