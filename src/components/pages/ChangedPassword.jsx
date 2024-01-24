// ChangePassword.jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const API = import.meta.env.VITE_BACKENDAPI;
const changepasswordapi = `${API}/api/updatepassword`;
const ChangePassword = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail || "";


   const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: userEmail,
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values ,{resetForm}) => {
      try {
        // Send PATCH request to update password
        const response = await fetch(changepasswordapi, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Password updated successfully:", responseData);
          toast.success("Password updated successfully!");
          resetForm();
          window.location.href='/Login';
        } else {
          const errorData = await response.json();
          console.error('Password update failed:', errorData);
        }
      } catch (error) {
        console.error('Error during password update:', error);
      }
    },
  });
  const containerStyle = {
    backgroundImage: 'url("https://app.shipmonk.com/assets/images/login/@1x/ShipMonk-warehouse-5.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1.5)',
  }

  return (
    <div className="ChangePasswordContainer" style={containerStyle}>
      <h3 className="changeTag">Change Password</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          readOnly
        />
        {formik.touched.email && formik.errors.email && (
          <div className="sperror">{formik.errors.email}</div>
        )}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="sperror">{formik.errors.password}</div>
        )}

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="sperror">{formik.errors.confirmPassword}</div>
        )}

        <button type="submit" className="changebtn">Save Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;