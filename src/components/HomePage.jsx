import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCards, likeCard } from "../services/cardsService";
import { FaPhone } from "react-icons/fa";
import { useTheme } from "./themeContext";
import { useSearch } from "../hooks/SearchContext";
import { getUserById } from "../services/userServices";
import { toast } from "react-toastify";
import { useUser } from "../hooks/UserContext";
import { use } from "react";

function HomePage() {
  const [allCards, setAllCards] = useState([]); // כל הקלפים
  const [cards, setCards] = useState([]); // הקלפים שמוצגים
  const [loading, setLoading] = useState(false); // מצב טעינה
  const [error, setError] = useState(null); // מצב שגיאה
  const [likedCards, setLikedCards] = useState({}); // הקלפים שאהובים ע"י המשתמש

  const { searchTerm } = useSearch(); // ערך החיפוש מה-Context
  const { user, loading: userLoading } = useUser();

  const navigate = useNavigate();

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Fetch all cards
  const fetchCards = async () => {
    if (userLoading) {
      console.log("Skipping fetchCards, user not ready.");
      return;
    }

    setLoading(true);

    try {
      console.log("Fetching cards...");
      const response = await getAllCards(); // קריאה ל-API
      const fetchedCards = response.data || [];
      console.log("Fetched cards:", fetchedCards);

      // שמירה של כל הכרטיסים
      setAllCards(fetchedCards);

      // הצגת עד 6 כרטיסים ראשוניים
      setCards(fetchedCards.slice(0, 6));
      if (user && user._id) {
        // עדכון מצב הלייקים
        const likesState = fetchedCards.reduce((acc, card) => {
          acc[card._id] = card.likes.includes(user._id); // בדוק אם המשתמש אהב את הכרטיס
          return acc;
        }, {});
        setLikedCards(likesState);
        console.log("Likes state updated:", likesState);
      } else {
        // אם אין משתמש מחובר, נאתחל את מצב הלייקים לכל `false`
        setLikedCards({});
      }
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError("Failed to load cards.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("User loading:", userLoading);
    console.log("Current user:", user);

    if (userLoading === true) {
      console.log("Skipping fetchCards, user not ready.");
      return;
    }

    fetchCards(); // קריאה לטעינת הכרטיסים
  }, [user, userLoading]);

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
      toast.success(isLiked ? "Liked successfully!" : "Unliked successfully!", {
        toastId: "uniqueId",
      });

      setLikedCards((prevLikedCards) => ({
        ...prevLikedCards,
        [id]: isLiked,
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
      toast.error("Failed to update like status.", { toastId: "uniqueId" });
    }
  };

  // בזמן שהמשתמש עדיין בטעינה, הצג הודעה מתאימה
  if (userLoading) {
    return <div>Loading user data...</div>;
  }
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
                {user && (
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
                )}

                <button
                  className="view-button"
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      navigate(`/card/${card._id}`);
                    }
                  }}
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
