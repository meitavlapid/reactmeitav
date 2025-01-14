import axios from "axios";
import { data } from "react-router-dom";
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
      localStorage.setItem("token", response.data);
      return { token: response.data };
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
export async function getUserid(id) {
  try {
    const response = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/id",
      { id }, // שלח את האימייל והסיסמא בתוך אובייקט
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("x-auth-token"),
        },
      }
    );
    console.log("API Response:", response); // Debugging: Log the full response
    if (response && response.data) {
      return { token: response.data }; // מחזיר את הטוקן בתוך אובייקט
    } else {
      throw new Error("Invalid API response: Missing token");
    }
  } catch (error) {
    console.error(
      "Error during login in loginuser:",
      error.response?.data || error.message
    );
    throw error; // Propagate the error to the caller
  }
}

//add new user
export function addUser(newCustomer) {
  return axios.post(api, newCustomer);
}

//update a specific user
export function updateUser(cusid, updatedCustomer) {
  return axios.put(`${api}/${cusid}`, updatedCustomer);
}

//delete a specific user

export function deleteUser(cusid) {
  return axios.delete(`${api}/${cusid}`);
}

// check if user exists
export function checkUserExists(Cusemail) {
  return axios.get(`${api}?email=${Cusemail}`);
}

// check if user password exists
export function checkUserPasswordExists(Cusemail) {
  return axios.get(`${api}?password=${Cusemail}`);
}
