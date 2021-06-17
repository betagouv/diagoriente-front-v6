import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { validateEmail, validatePassword } from 'common/utils/validation';

const LoginContainer = () => {
  const initialValues = { email: '', password: '' };
  const validateForm = (values: { email: string; password: string }) => {
    const errors = {} as { email: string; password: string };
    if (!values.email) {
      errors.email = 'Required';
    } else if (validateEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else {
      errors.password = validatePassword(values.password);
    }
    return errors;
  };
  return (
    <div>
      <span>Login</span>
      <div>
        <Formik
          initialValues={initialValues}
          validate={(values) => validateForm(values)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="example@domain.com" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginContainer;
