import axios from "axios";

export async function loginuser(email, password) {
  try {
    const response = await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("API Response:", response);

    if (response && response.data) {
      const token = response.data; // חילוץ הטוקן מהתגובה
      console.log("Token:", token);

      localStorage.setItem("token", token);
      return { token };
    } else {
      throw new Error("Invalid API response: Missing token");
    }
  } catch (error) {
    console.error(
      "Error during login in loginuser:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function registeruser(data) {
  try {
    const response = await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error during registration in registeruser:",
      error.response?.data
    );
    throw error;
  }
}
//get all user
export function getAllUsers() {
  return axios.get(api);
}
//get s specific user by id
export async function getUserById(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found.");
    }
    const response = await axios.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
      // שלח את האימייל והסיסמא בתוך אובייקט
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    console.log("API Response:", response.data); // Debugging: Log the full response
    return await response.data; // מחזיר את הטוקן בתוך אובייקט
  } catch (error) {
    console.error(
      "Error during login in loginuser:",
      error.response?.data || error.message
    );
    throw error; // Propagate the error to the caller
  }
}

//update a specific user
export async function updateUser(id, userData) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    throw new Error("Authentication token is missing");
  }

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    data: userData,
  };
  try {
    const response = await axios.request(config);
    console.log("Card updated successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
}
