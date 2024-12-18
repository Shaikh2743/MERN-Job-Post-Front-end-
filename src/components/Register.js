import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', values);
          toast.success(response.data.message);  // Show success notification
          navigate('/login');  // Navigate to login on success
        } catch (error) {
          toast.error(error.response?.data?.message || 'Registration failed');  // Show error notification
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <Field name="username" type="text" placeholder="Username" />
        <ErrorMessage name="username" component="div" className="error" />

        <Field name="email" type="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" className="error" />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="div" className="error" />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Register;
