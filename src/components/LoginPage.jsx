import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginuser } from "../services/userServices";
import { toast } from "react-toastify";

function LoginPage() {
  // "email": "ellvis@email.com",
  //   "password": "Abc!123Abc"

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { email, password } = values;
        const token = await loginuser(email, password);

        if (token) {
          console.log("Login successful:", token);
          toast.success("Logged in successfully!", { toastId: "unique-id" });

          localStorage.setItem("token", token.token); // Save token in localStorage
          navigate("/home"); // Navigate to home page
        } else {
          alert("Login failed: Token not found.");
        }
      } catch (error) {
        console.error("Login error:", error.message || error);
        toast.error("Login failed. Please check your credentials.");

        alert(
          error.response?.data?.message ||
            "Login failed: An error occurred. Please check your credentials and try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <h4 className="display-4 text-center mb-4">Login</h4>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            name="email"
            placeholder="Email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            placeholder="Password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />

          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary mb-4 w-100"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          LOGIN
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-warning mb-4 w-100 "
          onClick={() => navigate("/Register")}
        >
          REGISTER
        </button>
      </form>
    </>
  );
}

export default LoginPage;
