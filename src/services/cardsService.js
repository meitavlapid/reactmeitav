import axios from "axios";
import { number } from "yup";

//get all card
export function getAllCards() {
  return axios.get(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
  );
}
//get s specific card by id
export function getCardId(id) {
  return axios.get(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65422172e443ec28a252c27d"
  );
}

//get all my cards`
export function getAllMyCards() {
  return axios.get(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
  );
}

//add new card
export async function addCard(cardData) {
  try {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      alert("You are not logged in. Redirecting to login page...");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    const response = await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      cardData,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding card:", error.message || error);
    throw error;
  }
}

//update a specific card
export function updateCard() {
  return axios.put(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65424d35cb6bcb58697bab4a"
  );
}

//delete a specific card

export function deleteCard() {
  return axios.delete(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65424d35cb6bcb58697bab4a"
  );
}

// check if card exists
export function checkCardExists(Cuserank) {
  return axios.get(`${api}?rank=${Cuserank}`);
}

//like/unlike a specific card

export function likeCard(cardId, userId) {
  return axios
    .patch(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      { cardId, userId },

      { liked: { cardId: cardId } },
      {
        headers: {
          "x-auth-token": "your-auth-token",
        },
      }
    )
    .then((response) => {
      console.log("Card liked successfully", response.data);
    })
    .catch((error) => {
      console.error("Error updating like status", error);
    });
}

//patch biz card number
export function bizCard() {
  return axios.patch(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65422172e443ec28a252c27d"
  );
}
