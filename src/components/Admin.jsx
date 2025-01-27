import { UserProvider } from "../hooks/UserContext";
const MyComponent = () => {
  // const { user, logoutUser, isLoggedIn } = UserProvider();

  return (
    <div>
      {isLoggedIn ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};
