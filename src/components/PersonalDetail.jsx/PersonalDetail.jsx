/* eslint-disable */
import React, { useContext } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AppContext } from '../../UseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './style.scss'

const validationSchema = yup.object({
    fullName: yup
        .string('Enter your Full Name')
        .required('The Name is Required')
        .min(3, 'Name too Short')
        .max(50, 'Name too Big'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required("This field is required"),
    phoneNumber: yup
        .number('Enter your Phone number')
        .required('Phone Number is Required')
        .min(9, 'Password should be of minimum 9 number length'),
});

const PersonalDetail = () => {
    const location = useHistory()
    const { checkForm } = useContext(AppContext)
    const { PersonalData } = useContext(AppContext)
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            checkForm('PERSONAL_DETAIL', true)
            PersonalData(values);
                location.push('/checkout/billingDetail')
        },
    });

    return (
        <div className='formSection'>
            <form  onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    placeholder='Jhon Doe'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    placeholder='JhonDoe@mail.com'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <div className='divSpace'>

                    <PhoneInput
                        fullWidth
                        placeholder='677 898 989'
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        // eslint-disable-next-line
                        onChange={value => formik.values.phoneNumber = value}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        country='es'
                        regions='europe'
                    />
                </div>
                <div className='divSpace'>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
};


export default PersonalDetail;