import React from 'react';
import InputComponent from 'components/Register/Input';
import { FormControl, FormLabel } from 'components/Register/FormController';
import FormComment from 'components/Register/FormComment';
import useLogin from 'common/container/auth/useLogin';
import AppLayout from '../../layouts/AppLayout';

const LoginContainer = () => {
  const { user, formik, errorForm, loginState } = useLogin();
  return (
    <AppLayout>
      <span>Login</span>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <FormControl>
              <FormLabel htmlFor="email">Email *</FormLabel>
              <InputComponent
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                name="email"
                checked={true}
                type="email"
                isInvalid={!!formik.errors.email}
                placeholder="test@test.dev"
              />
            </FormControl>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="mb-2">
              <FormControl>
                <FormLabel />
                <FormComment>
                  <div className="text-lena-pink">{formik.errors.email}</div>
                </FormComment>
              </FormControl>
            </div>
          ) : null}
          <div className="mb-2">
            <FormControl>
              <FormLabel htmlFor="password">Mot de passe *</FormLabel>
              <InputComponent
                value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                name="password"
                checked={true}
                type="password"
                isInvalid={!!formik.errors.password}
              />
            </FormControl>
          </div>
          <div className="text-center mt-7 pb-10">
            <button className="bg-lena-pink w-full text-white font-bold md:w-72 py-3 rounded-md">connexion</button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default LoginContainer;
