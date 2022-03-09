import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';



const validationSchema = yup.object({
    country: yup
        .string("This field is required")
        .required("This field is required"),
    region: yup
        .string("This field is required")
        .required("This field is required"),
    city: yup
        .string('Enter your City')
        .required("This field is required"),
    address: yup
        .string('Enter your Address')
        .required('The Address is Required'),
    postCode: yup
        .number('Enter your Postal Code')
        .required('Postal Code is Required')
        .min(5, 'Postal Code should be of minimum 5 number length'),
});

const Billing = () => {

    const formik = useFormik({
        initialValues: {
            country: null,
            region: '',
            city: '',
            address: '',
            postCode: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('>>>>>>>>>>>>>>>>>>>>>')
            // eslint-disable-next-line 
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className='formSection'>
            <form onSubmit={formik.handleSubmit}>
                <div className='regionClass row'>
                    <div className='col-8'>
                        <CountryDropdown
                            id="country"
                            name="country"
                            label="Select Country"
                            value={formik.values.country}
                            onChange={(_, e) => formik.handleChange(e)}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                    </div>
                    <div className='col-4'>
                        <RegionDropdown
                            country={formik.values.country}
                            id="region"
                            name="region"
                            label="Select region"
                            value={formik.values.region}
                            onChange={(_, e) => formik.handleChange(e)}
                            error={formik.touched.region && Boolean(formik.errors.region)}
                            helperText={formik.touched.region && formik.errors.region}
                        />
                    </div>
                </div>

                <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Full Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                    fullWidth
                    id="postCode"
                    name="postCode"
                    label="Postal Code"
                    type="postCode"
                    value={formik.values.postCode}
                    onChange={formik.handleChange}
                    error={formik.touched.postCode && Boolean(formik.errors.postCode)}
                    helperText={formik.touched.postCode && formik.errors.postCode}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Next
                </Button>
            </form>
        </div>
    );
};


export default Billing;