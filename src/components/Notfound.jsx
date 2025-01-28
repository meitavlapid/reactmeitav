import { useNavigate } from "react-router-dom";
import React from "react";

function NotFound() {
  let nav = useNavigate();
  return (
    <>
      <div className="container text-center">
        <h1 className="notfound m-5">
          <i className="fa-solid fa-exclamation fa-bounce fa-xl text-danger "></i>
          404 Not Found
          <i className="fa-solid fa-exclamation fa-bounce fa-xl text-danger"></i>
        </h1>
      </div>
      <button className="btn btn-warning m-5 w-25" onClick={() => nav(-1)}>
        GO BACK
      </button>
    </>
  );
}

export default NotFound;
