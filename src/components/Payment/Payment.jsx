import React, { useContext } from 'react'
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
import valid from "card-validator";
import Checkbox from '@material-ui/core/Checkbox';

// import DatePicker from 'react-date-picker';
// import DatePicker from '@mui/lab/DatePicker';


import './style.scss';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../UseContext';

const curyear = new Date().getFullYear()

const validationSchema = yup.object({
    method: yup
        .string("You need to choose a Payment method")
        .required("You need to choose a Payment method"),
    paypalEmail: yup
        .string()
        .when('method', {
            is: 'paypal',
            then: yup
                .string('You need to insert the email to continue')
                .required("The Email is required")
                .email("You need to insert a valid email to continue"),
        }),
    cardHolder: yup
        .string()
        .when('method', {
            is: 'creditCard',
            then: yup
                .string()
                .min(2, 'The name is to short')
                .max(50, 'The name is to big')
                .required('The name is required')
        }),
    cardNumber: yup
        .string()
        .when('method', {
            is: 'creditCard',
            then: yup
                .string()
                .test(
                    'test-number',
                    'Credit Card need to be Valid',
                    value => valid.number(value).isValid
                )
                .required("This field is required")
        }),
    expiredDateMonth: yup
        .number('Need to choose a month ')
        .when('method', {
            is: 'creditCard',
            then: yup
                .number()
                .min(1, `Month can't be less then 1 `)
                .max(12, `Month can't be more then 12 `)
                .required("This field is required")
        }),
    expiredDateYear: yup
        .number('Need to choose a year ')
        .when('method', {
            is: 'creditCard',
            then: yup
                .number()
                .required("This field is required")
                .min(curyear, `Year can't be less then current year`)
        }),
    cvc: yup
        .string()
        .when('method', {
            is: 'creditCard',
            then: yup
                .string()
                .test('len', 'CVC need to be 3 numbers', val => val.length === 3)
                .required('The CVC is Required'),
        }),
    conditions: yup
        .boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted.")
});

const Payment = () => {
    const location = useHistory();
    const {PaymentData} = useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            method: null,
            paypalEmail: '',
            cardHolder: '',
            cardNumber: '',
            expiredDateMonth: '',
            expiredDateYear: '',
            cvc: ' ',
            conditions: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            PaymentData(values)
            location.push('/checkout/orderConfirm')
        },
    });
    return (
        <div className='formSection'>
            <form onSubmit={formik.handleSubmit}>
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
                        type='text'
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
                            type="text"
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


                        {/* <DatePicker
                            views={['year', 'month']}
                            label="Year and Month"
                            minDate={new Date('2012-03-01')}
                            maxDate={new Date('2023-06-01')}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                        /> */}
                        <div>
                            <TextField
                                fullWidth
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                id="expiredDateMonth"
                                name="expiredDateMonth"
                                label="Expiration Month"
                                type="number"
                                value={formik.values.expiredDateMonth}
                                onChange={formik.handleChange}
                                error={formik.touched.expiredDateMonth && Boolean(formik.errors.expiredDateMonth)}
                                helperText={formik.touched.expiredDateMonth && formik.errors.expiredDateMonth} />


                            <TextField
                                fullWidth
                                id="expiredDateYear"
                                name="expiredDateYear"
                                label="Expiration Year"
                                defaultValue='2022'
                                type="expiredDateYear"
                                value={formik.values.expiredDateYear}
                                onChange={formik.handleChange}
                                error={formik.touched.expiredDateYear && Boolean(formik.errors.expiredDateYear)}
                                helperText={formik.touched.expiredDateYear && formik.errors.expiredDateYear} />
                        </div>


                        {/* <TextField
                            fullWidth
                            type='date'
                            views={["year", "month"]}
                            id="expiredDate"
                            name="expiredDate"
                            label="Expiration Date"
                            value={formik.values.expiredDate}
                            onChange={formik.handleChange}
                            error={formik.touched.expiredDate && Boolean(formik.errors.expiredDate)}
                            helperText={formik.touched.expiredDate && formik.errors.expiredDate} /> */}

                        <TextField
                            fullWidth
                            id="cvc"
                            name="cvc"
                            label="CVC/CVV"
                            type="number"
                            value={formik.values.cvc}
                            onChange={formik.handleChange}
                            error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                            helperText={formik.touched.cvc && formik.errors.cvc} />
                    </>
                }
                <FormControlLabel
                    control={
                        <Checkbox
                            fullWidth
                            color='primary'
                            name='conditions'
                            id='conditions'
                            value={formik.values.checked}
                            onChange={formik.handleChange}
                            error={formik.touched.conditions && Boolean(formik.errors.conditions)}
                            helperText={formik.touched.conditions && formik.errors.conditions}
                            />
                    }
                    label="Accept Terms and Conditions"
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Next
                </Button>
            </form>
        </div>
    )
}
//! credit card = 5309770094740102
export default Payment;