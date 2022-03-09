import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss'
// import Box from '@mui/material/Box';
// import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import valid from "card-validator";


import './style.scss';

// const currencies = [
//     {
//         value: 'USD',
//         label: '$',
//     },
//     {
//         value: 'EUR',
//         label: '€',
//     },
//     {
//         value: 'BTC',
//         label: '฿',
//     },
//     {
//         value: 'JPY',
//         label: '¥',
//     },
// ];


const validationSchema = yup.object({
    // currency: yup
    //     .number('Enter your Address')
    //     .required('The Address is Required'),
    method: yup
        .string("You need to choose a Payment method")
        .required("You need to choose a Payment method"),
    paypalEmail: yup
        .string('You need to insert the email to continue')
        .email("You need to insert a valid email to continue")
        .required("You need to insert the email to continue"),
    cardHolder: yup
        .string('Enter your Postal Code')
        .min(2, 'The name is to short')
        .max(50, 'The name is to big')
        .required('The name is required'),
    cardNumber: yup
        .string()
        .test(
            'test-number',
            'Credit Card is Valid',
            value => valid.number(value).isValid
        )
        .required("This field is required"),
    expiredDate: yup
        .number('Enter your City')
        .required("This field is required"),
    cvc: yup
        .number('Enter your Address')
        .required('The Address is Required'),
    conditions: yup
        .boolean('Enter your Postal Code')
        .required('Postal Code is Required'),
});

const Payment = () => {
    const formik = useFormik({
        initialValues: {
            currency: '',
            method: null,
            paypalEmail: '',
            cardNumber: '',
            expiredDate: '',
            cvc: '',
            cardHolder: '',
            conditions: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // eslint-disable-next-line 
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className='formSection'>
            <form onSubmit={formik.handleSubmit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <TextField
                    name='currency'
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    helperText="Please select your currency"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> */}
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Payment Method</FormLabel>
                    <RadioGroup
                        fullWidth
                        id="method"
                        name="method"
                        label="method"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        value={formik.values.method}
                        onChange={formik.handleChange}
                        error={formik.touched.method && Boolean(formik.errors.method)}
                        helperText={formik.touched.method && formik.errors.method}
                    >
                        <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                        <FormControlLabel value="creditCard" control={<Radio />} label="Credit card" />
                    </RadioGroup>
                </FormControl>

                {(formik.values.method === 'paypal') ?
                    <TextField
                        fullWidth
                        id="paypalEmail"
                        name="paypalEmail"
                        label="Paypal Email"
                        value={formik.values.paypalEmail}
                        onChange={formik.handleChange}
                        error={formik.touched.paypalEmail && Boolean(formik.errors.paypalEmail)}
                        helperText={formik.touched.paypalEmail && formik.errors.address}
                    /> :
                    <>
                        <TextField
                            fullWidth
                            id="cardHolder"
                            name="cardHolder"
                            label="Card Holder"
                            type="cardHolder"
                            value={formik.values.cardHolder}
                            onChange={formik.handleChange}
                            error={formik.touched.cardHolder && Boolean(formik.errors.cardHolder)}
                            helperText={formik.touched.cardHolder && formik.errors.cardHolder} />

                        <TextField
                            fullWidth
                            id="cardNumber"
                            name="cardNumber"
                            label="Card Number"
                            type="cardNumber"
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                            helperText={formik.touched.cardNumber && formik.errors.cardNumber} />

                        <DatePicker
                            fullWidth
                            views={["year", "month"]}
                            id="expiredDate"
                            name="expiredDate"
                            label="Expiration Date"
                            value={formik.values.expiredDate}
                            onChange={formik.handleChange}
                            error={formik.touched.expiredDate && Boolean(formik.errors.expiredDate)}
                            helperText={formik.touched.expiredDate && formik.errors.expiredDate} />

                        <TextField
                            fullWidth
                            id="cvc"
                            name="cvc"
                            label="CVC/CVV"
                            type="cvc"
                            value={formik.values.cvc}
                            onChange={formik.handleChange}
                            error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                            helperText={formik.touched.cvc && formik.errors.cvc} />
                    </>
                }
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Next
                </Button>
                </MuiPickersUtilsProvider>
            </form>
        </div>
    )
}

export default Payment;