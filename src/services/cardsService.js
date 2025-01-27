import axios from "axios";

//get all card
export function getAllCards() {
  return axios.get(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`
  );
}
//get s specific card by id
export async function getCardId(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("You are not logged in. Redirecting to login page...");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    const response = await axios.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "erorr fetching card:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || error.message);
  }
}
export async function getAllMyCards(id) {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards `,

    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

//get all my cards`

// export async function getAllMyCards() {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       throw new Error("No token found in localStorage. Redirecting to login.");
//     }

//     const response = await axios.get(
//       "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized: Redirecting to login");
//     }
//     throw error;
//   }
// }

//add new card
export async function addCard(cardData) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page...");
      window.location.href = "/login"; // Redirect to login page
      return;
    }
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      data: cardData,
    };

    const response = await axios.request(config);
    console.log("Card added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating card:",
      error.response?.data || error.message
    );
  }
}

export async function updateCard(id, cardData) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    throw new Error("Authentication token is missing");
  }

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: cardData,
  };
  try {
    const response = await axios.request(config);
    console.log("Card updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating card:",
      error.response?.data || error.message
    );
    throw error;
  }
}

//delete a specific card

export async function deleteCard(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    throw new Error("Authentication token is missing");
  }

  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    console.log("Card deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting card:",
      error.response?.data || error.message
    );
  }
}

//like/unlike a specific card

export async function likeCard(id, isLiked) {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    like: isLiked,

    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .request(config)

    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

//patch biz card number
export async function bizCard(id, cardData) {
  const token = localStorage.getItem("token");

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: cardData,
  };

  const response = await axios
    .request(config)

    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}
