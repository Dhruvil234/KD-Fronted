import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKENDAPI;
const ForgotPasswordapi = `${API}/api/sendotp`;

let userotp="";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // Yup validation schema
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    otp: yup.string().when('showOtpField', {
      is: true,
      then: yup.string().required('OTP is required'),
    }),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting values:", values);
      try {
        if (!showOtpField) {
          // Send email to API to get OTP
          const response = await fetch(ForgotPasswordapi, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: values.email }),
          });

          if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message);
              userotp=responseData.frontendotp;
              setUserEmail(values.email);
            setShowOtpField(true);
          } else {
            const errorData = await response.json();
            console.error('Sending OTP failed:', errorData);
          }
        } else {
          if (values.otp === userotp) {
            alert("OTP Match Sucessfully!.");
            navigate('/change-password',{ state: { userEmail: values.email } });
          } else {
            alert('Invalid OTP. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error during OTP process:', error);
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
    <div className="ForgotContainer" style={containerStyle}>
      <h3 className="forgotTag">Forgot Password</h3>
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

{showOtpField && (
          <>
            <input
              type="text"
              id="otp"
              name="otp"
              autoComplete="off"
              placeholder="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.otp && formik.errors.otp && (
              <div className="error">{formik.errors.otp}</div>
            )}
    </>
        )}
        <button type="submit" className="forgotbtn">
            {showOtpField ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;