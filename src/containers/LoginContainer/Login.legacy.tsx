import React from 'react';
import InputComponent from 'components/Register/Input';
import { FormControl, FormLabel } from 'components/Register/FormController';
import FormComment from 'components/Register/FormComment';
import useLogin from 'common/container/auth/useLogin';
import AppLayout from 'layouts/AppLayout';
import Button from 'components/design-system/Button';

const LegacyLoginContainer = () => {
  const { user, formik, errorForm, loginState } = useLogin();

  return (
    <>
      <AppLayout className="items-center justify-center">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <FormControl>
                <FormLabel htmlFor="email">Email *</FormLabel>
                <InputComponent
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                  name="email"
                  checked={true}
                  type="email"
                  isInvalid={formik.touched.email && !!formik.errors.email}
                  placeholder="test@test.dev"
                />
              </FormControl>
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="mb-2">
                <FormControl>
                  <FormLabel />
                  <FormComment>
                    <div className="text-lena-pink">{formik.errors.email}</div>
                  </FormComment>
                </FormControl>
              </div>
            )}
            <div className="mb-2">
              <FormControl>
                <FormLabel htmlFor="password">Mot de passe *</FormLabel>
                <InputComponent
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  name="password"
                  checked={true}
                  type="password"
                  isInvalid={formik.touched.password && !!formik.errors.password}
                />
              </FormControl>
            </div>
            <div className="text-center mt-7 pb-10">
              <Button variant="primary" size="md">
                Connexion
              </Button>
            </div>
          </form>
        </div>
      </AppLayout>
    </>
  );
};

export default LegacyLoginContainer;
