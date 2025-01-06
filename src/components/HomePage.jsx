import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCards, likeCard } from "../services/cardsService";
import { FaPhone, FaHeart } from "react-icons/fa";

function HomePage() {
  const [allCards, setAllCards] = useState([]); // כל הכרטיסים
  const [cards, setCards] = useState([]); // הכרטיסים שמוצגים כרגע
  const [loading, setLoading] = useState(false); // מצב טעינה
  const [error, setError] = useState(null); // מצב שגיאה
  const [likedCards, setLikedCards] = useState({});

  const navigate = useNavigate();

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`; // יכנס לחלון החיוג עם המספר
  };

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true); // מצב טעינה
      try {
        const response = await getAllCards(); // מביא את כל הכרטיסים
        setAllCards(response.data); // שומר את כל הכרטיסים
        setCards(response.data.slice(0, 6)); // מציג את ה-6 הראשונים
        setLoading(false); // עדכון מצב טעינה
        setLikedCards(
          response.data.reduce((acc, card) => {
            acc[card._id] = card.likes;
            return acc;
          }, {})
        );
      } catch (err) {
        setError("Failed to load cards. Please try again later.");
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  // פונקציה שמטפלת בגלילה למטה
  const loadMoreCards = () => {
    setLoading(true); // מצב טעינה
    const nextCards = allCards.slice(cards.length, cards.length + 6);
    setCards((prevCards) => [...prevCards, ...nextCards]);
    setLoading(false); // עדכון מצב טעינה
  };
  const handleLike = (cardId) => {
    const currentLikedStatus = likedCards[cardId] || false; // אם אין לייק, נחשב כרשום כ-`false`
    const newLikedStatus = !currentLikedStatus; // הופכים את הסטטוס של הלייק

    console.log("Before Update:", likedCards); // Debugging: לפני עדכון

    setLikedCards((prevLikedCards) => {
      // עדכון רק את הכרטיס הנבחר עם הסטטוס החדש
      const updatedLikedCards = { ...prevLikedCards, [cardId]: newLikedStatus };
      console.log("Updated liked cards:", updatedLikedCards); // Debugging: אחרי עדכון
      return updatedLikedCards;
    });

    // קריאה לפונקציה לעדכון הסטטוס ב-API
    likeCard(cardId, newLikedStatus)
      .then(() => {
        console.log(`Card ${cardId} liked status updated to ${newLikedStatus}`);
      })
      .catch((err) => {
        console.error("Error updating like status:", err);
      });
  };

  const handleView = (id) => {
    navigate(`/business/${id}`);
  };

  const handleEdit = (id) => {
    alert(`עריכת כרטיס עסק ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הכרטיס?")) {
      alert(`כרטיס עסק ${id} נמחק.`);
    }
  };

  return (
    <div className="home-container">
      <header className="text-center py-4">
        <h1>Welcome</h1>
        <h2>Discover the Best Recommended Businesses!</h2>
      </header>
      {loading ? (
        <div className="spinner-border text-info" role="status"></div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <section className="cards-section d-flex justify-content-space-between ">
          {cards.map((card) => (
            <div key={card.id} className="card mx-3 my-3">
              <img src={card.image.url} alt={card.title} />
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
              <p>{card.description}</p>
              <div className="details mt-3">
                <p>Phone: {card.phone}</p>
                <p>
                  Address: {card.address.city}, {card.address.state},{" "}
                  {card.address.country},{card.address.houseNumber},{" "}
                  {card.address.street}
                </p>
                <p>Card number: {card.bizNumber}</p>
              </div>
              <div
                className="card-actions justify-content-space-between
               bg-light py-2  rounded-bottom 
               
               "
              >
                <button
                  className="phone-icon"
                  onClick={() => handleCall(card.phone)}
                  style={{ cursor: "pointer" }}
                >
                  <FaPhone size={15} color="#007BFF" />{" "}
                  {/* שינוי צבע האייקון */}
                </button>
                <button
                  className="like-button"
                  onClick={() => handleLike(card.id)}
                >
                  <i
                    className={`fa fa-heart ${
                      likedCards[card.id] ? "liked" : ""
                    }`}
                    style={{ color: likedCards[card.id] ? "red" : "gray" }} // צבע אדום אם יש לייק
                  ></i>
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/createcard/${card.id}`)}
                  style={{ cursor: "pointer" }}
                  title="View Business"
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
      {loading && <p>Loading cards...</p>}
    </div>
  );
}

export default HomePage;
