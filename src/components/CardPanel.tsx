"use client";

import { useReducer } from "react";
import Link from "next/link";
import Card from "@/components/Card";

// Mock data stored in a Map
const mockVenues = new Map([
  ["001", { name: "The Bloom Pavilion", img: "/img/thebloompavilion.jpg" }],
  ["002", { name: "Spark Space", img: "/img/sparkspace.jpg" }],
  ["003", { name: "The Grand Table", img: "/img/thegrandtable.jpg" }],
]);

// Define types for state and actions
type RatingState = Map<string, number>;

type RatingAction =
  | { type: "SET_RATING"; vid: string; rating: number }
  | { type: "REMOVE_VENUE"; vid: string };

function ratingReducer(state: RatingState, action: RatingAction): RatingState {
  switch (action.type) {
    case "SET_RATING":
      return new Map(state).set(action.vid, action.rating);
    case "REMOVE_VENUE":
      const newState = new Map(state);
      newState.delete(action.vid);
      return newState;
    default:
      return state;
  }
}

const CardPanel: React.FC = () => {
  const initialRatings: RatingState = new Map(
    Array.from(mockVenues.keys()).map((vid) => [vid, 0])
  );

  const [ratings, dispatch] = useReducer(ratingReducer, initialRatings);

  const handleRatingChange = (vid: string, rating: number) => {
    dispatch({ type: "SET_RATING", vid, rating });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          paddingRight: "20px",
        }}
      >
        {Array.from(mockVenues.entries()).map(([vid, venue]) => (
          <div key={vid} className="card-container">
            {/* Only render the image in the Card component */}
            <Card
              venueName={venue.name}
              imgSrc={venue.img}
              rating={ratings.get(vid) ?? 0}
              onRatingChange={(rating) => handleRatingChange(vid, rating)}
            />
            <Link href={`/venue/${vid}`}>
              <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Show venue list with ratings */}
      <div style={{ marginTop: "30px" }}>
        <h3>Venue List with Ratings</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {Array.from(ratings.entries()).map(([vid, rating]) => {
            const venue = mockVenues.get(vid);
            if (!venue) return null; // Ensure venue exists before rendering

            return (
              <li key={vid} data-testid={vid} style={{ fontSize: "18px", margin: "5px 0" }}>
                {venue.name}: {"⭐".repeat(rating) + "☆".repeat(5 - rating)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardPanel;
