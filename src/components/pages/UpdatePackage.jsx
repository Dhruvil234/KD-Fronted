import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKENDAPI;
const updatepackage = `${API}/api/updatepackage`;

const cities = [
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Goa", label: "Goa" },
  { value: "Hyderabad", label: "Hyderabad" },
];

let usergivencity = "";

export const UpdatePackage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [fileInfo, setFileInfo] = useState(null);
  const [userholidayPackage, setUserHolidayPackage] = useState(null);
  const [userPackageName, setUserPackageName] = useState("");
  const [userPackageDuration, setUserPackageDuration] = useState("");
  const [userPackageCity, setUserPackageCity] = useState("");
  const [userPackageService, setUserPackageService] = useState("");
  const [userPackagePrice, setUserPackagePrice] = useState("");
  const [userholidayimage, setuserholidayimage] = useState("");
  const [userpackageid, setuserpackageid] = useState("");
  useEffect(() => {
    if (location.state && location.state.holidayPackage) {
      const receivedPackage = location.state.holidayPackage;

      setUserHolidayPackage(location.state.holidayPackage);
      setUserPackageName(receivedPackage.holidayName);
      setUserPackageDuration(receivedPackage.duration);
      setUserPackageCity(receivedPackage.city);
      setUserPackageService(receivedPackage.service);
      setUserPackagePrice(receivedPackage.price);
      setuserholidayimage(receivedPackage.holidayImage);
      setuserpackageid(receivedPackage._id);
      // Set usergivencity to the city name from receivedPackage
      usergivencity = receivedPackage.city;

      console.log("Received holiday package:", receivedPackage);
      console.log("usercity" + userPackageCity);
      console.log("usergivencity:", usergivencity);
    }
  }, [location.state]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileInfo(file);
  };

  const validateFileFormat = (file) => {
    if (file) {
      const validFormats = [".jpeg", ".jpg", ".png"];
      const fileExtension = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (validFormats.includes(fileExtension)) {
        return file.name;
      } else {
        return "File format should be JPEG, JPG, or PNG";
      }
    }
    return "";
  };

  const formik = useFormik({
    initialValues: {
      holidayName: userPackageName,
      duration: userPackageDuration,
      city: userPackageCity,
      service: userPackageService,
      price: userPackagePrice,
    },
    validationSchema: Yup.object({
      holidayName: Yup.string().trim().required("Holiday Name is required"),
      duration: Yup.string().trim().required("Duration is required"),
      city: Yup.string().trim().required("City is required"),
      service: Yup.string().trim().required("Service is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${updatepackage}/${userpackageid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          resetForm();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      resetForm();
      navigate("/Adminpage");
    },
  });

  // Initialize selectedCity state with the corresponding city object
  const [selectedCity, setSelectedCity] = useState(
    userPackageCity
      ? cities.find((city) => city.value === userPackageCity)
      : null
  );

  return (
    <div className="updatepackagediv">
      <h2 className="updatepackagetag">Update Package Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="holidayimagediv">
          <label className="holidayimagelabel">Holiday Image:</label>
          <img
            src={userholidayimage}
            alt="Holiday"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "10px",
              marginTop: "-10px",
              marginLeft: "30px",
            }}
          />
        </div>
        <div className="holidaynamediv">
          <label className="holidaynamelabel">Holiday Name:</label>
          <input
            type="text"
            className="inputtypetext"
            placeholder="Enter Package Name"
            maxLength={45}
            value={formik.values.holidayName || userPackageName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="holidayName"
          />
        </div>
        {formik.touched.holidayName && formik.errors.holidayName ? (
          <div className="holidaynamevalidation">
            {formik.errors.holidayName}
          </div>
        ) : null}
        <div className="holidaydurationdiv">
          <label className="holidaydurationlabel">Duration :</label>
          <input
            type="text"
            className="inputtypeduration"
            placeholder="1 Day / 1 Night"
            value={formik.values.duration || userPackageDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="duration"
          />
        </div>
        {formik.touched.duration && formik.errors.duration ? (
          <div className="holidaydurationvalidation">
            {formik.errors.duration}
          </div>
        ) : null}
        <div className="holidaycitydiv">
          <label className="holidaycitylabel">City :</label>
          <Select
            id="city"
            name="city"
            className="holidaycityinput"
            placeholder="Select City"
            options={cities}
            value={
              usergivencity
                ? { value: usergivencity, label: usergivencity }
                : null
            } // Set usergivencity as the value if it exists
            onChange={(selectedOption) => {
              formik.setFieldValue("city", selectedOption.value);
              setSelectedCity(selectedOption);
              setUserPackageCity(selectedOption.value);
              console.log("Selected City:", selectedOption);
            }}
          />
        </div>
        {formik.touched.city && formik.errors.city ? (
          <div className="holidaycityvalidation">{formik.errors.city}</div>
        ) : null}
        <div className="holidayservicediv">
          <label className="holidayservicelabel">Service :</label>
          <input
            type="text"
            className="inputtypeservice"
            placeholder="Enter Service"
            maxLength={20}
            value={formik.values.service || userPackageService}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="service"
          />
        </div>
        {formik.touched.service && formik.errors.service ? (
          <div className="holidayservicevalidation">
            {formik.errors.service}
          </div>
        ) : null}
        <div className="holidaypricediv">
          <label className="holidaypricelabel">Price :</label>
          <input
            type="number"
            placeholder="Enter Price"
            autoComplete="off"
            className="inputtypeforprice"
            value={formik.values.price || userPackagePrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="price"
          />
        </div>
        {formik.touched.price && formik.errors.price ? (
          <div className="holidayspricevalidation">{formik.errors.price}</div>
        ) : null}
        <button type="submit" className="addpackage-button">
          Update Package
        </button>
      </form>
    </div>
  );
};
