import "../css/FeatureCard.css";

function FeatureCard({ title, description, buttonText, imageSrc, imageAlt, imagePosition = "left", onClick }) {
  return (
    <div className="feature-card">
      <div className="feature-content">
        {imagePosition === "left" && (
          <img src={imageSrc} alt={imageAlt} />
        )}
        <div className="information">
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={onClick}>{buttonText}</button>
        </div>
        {imagePosition === "right" && (
          <img src={imageSrc} alt={imageAlt} />
        )}
      </div>
    </div>
  );
}

export default FeatureCard;