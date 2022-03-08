import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '../Button';

const PersonalDetail = () => {
    return (
        <>
            <h1 className='formSection mb-3'> Personal Detail </h1>

            <Formik
                initialValues={{ fullName: '', email: '', phoneNumber: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.fullName) {
                        errors.fullName = 'Required';
                    }else if(
                        !values.fullName > 2
                    ){
                        errors.fullName = 'this Name is Invalid';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if(!values.phoneNumber){
                        errors.phoneNumber = 'Required'
                    } else if(
                        !values.phoneNumber.length > 9
                    ){
                        errors.phoneNumber = 'Phone Number NOT Valid'
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <section className='formSection'>
                            <div className='mb-3'>
                            <h6>Full Name  </h6>
                                <Field type='text' name='fullName' placeholder='Jhon Doe' />
                                <ErrorMessage name='fullName' component='div' />
                            </div>
                            <div  className='mb-3'>
                            <h6>Email </h6>
                                <Field type="email" name="email" placeholder='myEmail@mail.com'/>
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div  className='mb-3'>
                                <h6>Phone Number </h6>
                                <Field type="phoneNumber" name="phoneNumber"  placeholder='679717429'/>
                                <ErrorMessage name="phoneNumber" component="div" />
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                Next
                            </Button>
                        </section>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default PersonalDetail;