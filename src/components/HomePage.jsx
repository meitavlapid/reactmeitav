import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCards, likeCard } from "../services/cardsService";
import { FaPhone } from "react-icons/fa";
import { useTheme } from "./themeContext";
import { useSearch } from "../hooks/SearchContext";
import { getUserById } from "../services/userServices";
import { toast } from "react-toastify";
import { useUser } from "../hooks/UserContext";

function HomePage() {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedCards, setLikedCards] = useState({});
  const { searchTerm } = useSearch(); // ערך החיפוש מה-Context
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Fetch all cards
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await getAllCards();
        const fetchedCards = response.data || [];
        setAllCards(fetchedCards);
        setCards(fetchedCards.slice(0, 6));
        const likesState = fetchedCards.reduce((acc, card) => {
          acc[card._id] = card.likes.includes(user._id); // בדיקה אם המשתמש אהב את הכרטיס
          return acc;
        }, {});
        setLikedCards(likesState);
        // toast.success("Cards loaded successfully!");
      } catch (err) {
        setError("Failed to load cards. Please try again later.");
        // toast.error("Error loading cards.");
      } finally {
        setLoading(false);
      }
    };
    fetchCards()
      .then(() => {
        toast("This is a toast", { toastId: "uniqueId" });
      })
      .catch((error) => {
        console.error("Error loading cards:", error);
        toast.error("Error loading cards.");
      });
  }, []);

  // Filter cards based on searchTerm
  useEffect(() => {
    const filteredCards = allCards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCards(filteredCards.slice(0, 6));
  }, [searchTerm, allCards]);

  // Load more cards
  const loadMoreCards = () => {
    const nextCards = allCards
      .filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(cards.length, cards.length + 6);
    setCards((prevCards) => [...prevCards, ...nextCards]);
  };

  // Handle like/unlike
  const handleLike = async (id) => {
    try {
      const currentLikedStatus = likedCards[id] || false;
      const isLiked = !currentLikedStatus;

      await likeCard(id, isLiked);
      toast.success(isLiked ? "Liked successfully!" : "Unliked successfully!");

      setLikedCards((prevLikedCards) => ({
        ...prevLikedCards,
        [id]: isLiked,
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
      toast.error("Failed to update like status.");
    }
  };
  return (
    <div className="home-container ">
      <header className="text-center py-4">
        <h1>Welcome</h1>
        <h2>Discover the Best Recommended Businesses!</h2>
      </header>
      {loading ? (
        <div className="spinner-border text-info" role="status"></div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <section className="cards-section">
          {cards.map((card) => (
            <div key={card._id} className="card">
              <img src={card.image.url} alt={card.title} />
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
              <p>{card.description}</p>
              <div className="details">
                <h4>Phone: {card.phone}</h4>
                <h4>
                  Address: {`${card.address.street}, ${card.address.city}`}
                </h4>
                <h4>Card number: {card.bizNumber}</h4>
              </div>
              <div className="actions">
                <button
                  className="phone-icon"
                  onClick={() => handleCall(card.phone)}
                >
                  <FaPhone style={{ backgroundColor: "inherit" }} />
                </button>
                <button
                  className="like-button"
                  onClick={() => handleLike(card._id)}
                  disabled={!user}
                >
                  <i
                    className="fa-solid fa-heart"
                    style={{
                      color: likedCards[card._id] ? "red" : "gray",
                      fontSize: "0.9rem",
                      backgroundColor: "transparent",
                    }}
                  ></i>
                </button>
                <button
                  className="view-button"
                  onClick={() => navigate(`/createcard/${card._id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {!loading && cards.length < allCards.length && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={loadMoreCards}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
