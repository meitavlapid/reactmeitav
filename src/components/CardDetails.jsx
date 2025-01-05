import { all } from "axios";
import { useParams } from "react-router-dom";
import { getCardId } from "../services/cardsService";
import { useEffect, useState } from "react";

function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState({});

  useEffect(() => {
    try {
      const fetchCard = async () => {
        const card = await getCardId(id);
        setCard(card);
      };
      fetchCard();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="card-details">
        <h1>{card.title}</h1>
        <img src={card.image} alt={card.title} />
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
