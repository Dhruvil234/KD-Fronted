// ChangePassword.jsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';

const ChangePassword = () => {
  
    // Yup validation schema
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values ,{resetForm}) => {
      console.log("Submitting values:", values);
      // Add logic for changing the password
      // For now, just display a message in the console
      console.log("Password changed successfully!");
      toast.success("Password changed successfully!");

      resetForm();
    },
  });
  const containerStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/hd/microsoft-teams-blur-background-2560-x-1440-h8us0dd16jbes4ho.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="ChangePasswordContainer" style={containerStyle}>
      <h3>Change Password</h3>
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

        <button type="submit" className="savebtn">Save Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
