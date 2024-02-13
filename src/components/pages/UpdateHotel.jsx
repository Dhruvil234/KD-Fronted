import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 
import { toast } from 'react-toastify';

export const UpdateHotel = () => {
    const [fileInfo, setFileInfo] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null); 
    const cities = [
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Hyderabad', label: 'Hyderabad' },
    ];

    const validateFileFormat = (file) => {
        if (file) {
            const validFormats = ['.jpeg', '.jpg', '.png'];
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (validFormats.includes(fileExtension)) {
                return file.name; 
            } else {
                return 'File format should be JPEG, JPG, or PNG';
            }
        }
        return '';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileInfo(file);
    };

    const formik = useFormik({
        initialValues: {
            hotelName: '',
            rating: '',
            city: '',
            service: '',
            price: '',
        },
        validationSchema: Yup.object({
            hotelName: Yup.string().trim().required('Hotel Name is required'),
            rating: Yup.number()
                .min(0, 'Rating must be at least 0')
                .max(5, 'Rating must be at most 5')
                .required('Rating is required'),
            city: Yup.string().trim().required('City is required'),
            service: Yup.string().trim().required('Service is required'),
            price: Yup.number().required('Price is required'),
        }),
        onSubmit: (values) => {
            console.log("Hotel Name:", values.hotelName);
            formik.resetForm();
            toast.success('Hotel updated successfully!');
        }
    });
    return (
        <div className='updatehoteldiv'>
            <h2 className='updatehoteltag'>Update Hotel Details</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='hotelimagediv'>
                    <label className='hotelimagelabel'>Holiday Image:</label>
                    <input
                        type="file"
                        className='inputypefilehotel'
                        accept=".jpeg, .jpg, .png"
                        onChange={handleFileChange}
                    />
                </div>
                {formik.touched.hotelImage && formik.errors.hotelImage ? (
                    <div className='hotelimagevalidation'>{formik.errors.hotelImage}</div>    
                ) : (
                    <div className='hotelimagevalidation'>{validateFileFormat(fileInfo)}</div>
                )}
                <div className='hotelnamediv'>
                    <label className='hotelnamelabel'>Hotel Name:</label>
                    <input
                        type="text"
                        className='inputtypetexthotel'
                        placeholder="Enter Hotel Name"
                        maxLength={25}
                        {...formik.getFieldProps("hotelName")}
                    />
                </div>
                {formik.touched.hotelName && formik.errors.hotelName ? (
                    <div className='hotelnamevalidation'>{formik.errors.hotelName}</div>
                ) : null}
                <div className='hotelrattingdiv'>
                    <label className='hotelrattinglabel'>Rating :</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className='inputtyperatting'
                        placeholder="Enter Rating (0.0 - 5.0)"
                        {...formik.getFieldProps("rating")}
                    />
                </div>
                {formik.touched.rating && formik.errors.rating ? (
                    <div className='hotelrattingvalidation'>{formik.errors.rating}</div>
                ) : null}
                <div className='hotelcitydiv'>
                    <label className='hotelcitylabel'>City :</label>
                    <Select
                        id='city'
                        name='city'
                        className='hotelcityinput'
                        placeholder='Select City'
                        options={cities}
                        value={selectedCity}
                        onChange={(selectedOption) => {
                            formik.setFieldValue('city', selectedOption.value);
                            setSelectedCity(selectedOption);
                        }}
                    />
                </div>
                {formik.touched.city && formik.errors.city ? (
                    <div className='hotelcityvalidation'>{formik.errors.city}</div>
                ) : null}
                <div className='hotelservicediv'>
                    <label className='hotelservicelabel'>Service :</label>
                    <input
                        type="text"
                        className='inputtypeservicehotel'
                        placeholder="Enter Service"
                        maxLength={20}
                        {...formik.getFieldProps("service")}
                    />
                </div>
                {formik.touched.service && formik.errors.service ? (
                    <div className='hotelservicevalidation'>{formik.errors.service}</div>
                ) : null}
                <div className="hotelpricediv">
                    <label className="hotelpricelabel">Price :</label>
                    <input
                        type="number"
                        placeholder="Enter Price"
                        autoComplete="off"
                        className="inputtypeforpricehotel"
                        {...formik.getFieldProps("price")}
                    />
                </div>
                {formik.touched.price && formik.errors.price ? (
                    <div className='hotelpricevalidation'>{formik.errors.price}</div>
                ) : null}
                <button type='submit' className='addhotel-button'>Update Hotel</button>
            </form>
        </div>
    );
};
