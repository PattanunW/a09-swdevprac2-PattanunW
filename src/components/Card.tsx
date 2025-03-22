import React from "react";

interface CardProps {
  venueName: string;
  imgSrc: string; // image
  rating?: number; // Make rating optional
  onRatingChange?: (rating: number) => void; // Make onRatingChange optional
}

const Card: React.FC<CardProps> = ({ venueName, imgSrc, rating, onRatingChange }) => {
  return (
    <div>
      <img src={imgSrc} alt={venueName} width="200" height="150" />
      <h3>{venueName}</h3>
      {/* Conditionally render rating stars if rating and onRatingChange are provided */}
      {rating !== undefined && onRatingChange !== undefined && (
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onRatingChange(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "20px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
