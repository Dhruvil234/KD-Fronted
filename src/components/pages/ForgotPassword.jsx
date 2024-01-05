import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const ForgotPassword = () => {
  // Yup validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    // otp: yup.string().required("OTP is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      // otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Submitting values:", values);
      
    },
  });
  const containerStyle = {
    backgroundImage: 'url("https://wallpapers.com/images/hd/microsoft-teams-blur-background-2560-x-1440-h8us0dd16jbes4ho.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  

  return (
    <div className="ForgotContainer" style={containerStyle}>
      <h3>Forgot Password</h3>
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
          <div className="error">{formik.errors.email}</div>
        )}

        { <input
          type="text"
          id="otp"
          name="otp"
          autoComplete="off"
          placeholder="Enter OTP"/>
         /* value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        
        {formik.touched.otp && formik.errors.otp && (
          <div className="error">{formik.errors.otp}</div>
        )} */}

        <button type="submit" className="savebutton">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
