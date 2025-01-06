import { all } from "axios";
import { useParams } from "react-router-dom";
import { getCardId } from "../services/cardsService";
import { useEffect, useState } from "react";

function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getCardId(id);
        console.log("Fetched card:", response);
        setCard(response);
      } catch (err) {
        console.log("Error fetching card:", err);
        setError("Failed to load card. Please try again later.");
      }
    };

    fetchCard();
  }, [id]);
  if (error) {
    return <div>{error}</div>;
  }
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card-details">
        <h1>{card.title}</h1>
        <img
          src={card.image || "default-image.png"}
          alt={card.title}
          onError={(e) => (e.target.src = "default-image.png")}
        />
        <p>{card.description}</p>
        <p>Phone: {card.phone}</p>
        <p>Address: {card.address}</p>
        <p>Card number: {card.bizNumber}</p>
      </div>
      <button
        className="btn btn-warning m-5 w-25"
        onClick={() => window.history.back()}
      >
        back
      </button>
    </>
  );
}

export default CardDetails;
