import React from 'react';
import AppHeader from 'layouts/AppHeader';
import { Link } from 'react-router-dom';
import useLogin from 'common/container/auth/useLogin';
import BgRegister from '../../assets/images/bg/bg-register.jpg';
import HeroRegister from '../../assets/illu/hero-register.png';
import { FormControl, FormLabel } from '../../components/Register/FormController';
import InputComponent from '../../components/Register/Input';
import FormComment from '../../components/Register/FormComment';
import Button from '../../components/design-system/Button';

const LoginContainer = () => {
  const { user, formik, errorForm, loginState } = useLogin();

  return (
    <div>
      <AppHeader />
      <div className="md:h-screen w-full flex-1 flex flex-row">
        <div className="flex-1 px-8 pt-8 md:px-16 md:pt-16 bg-lena-lightgray z-10 flex flex-col space-y-16">
          <div className="text-center md:text-left">
            <h2 className="font-bold md:font-medium text-lena-blue-dark text-3xl mb-2">Connexion</h2>
            <Link to="/inscription" className="text-lena-turquoise-dark font-bold">
              Je n'ai pas encore de compte
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <FormControl>
                  <FormLabel htmlFor="email">Email de connexion *</FormLabel>
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
        </div>
        <div
          className="bg-lena-blue h-full hidden xl:flex items-center"
          style={{
            width: 568,
            background: `url(${BgRegister}) no-repeat center`,
            backgroundSize: 'cover',
          }}
        >
          <div className="invisible xl:visible relative">
            <img placeholder="blurred" src={HeroRegister} alt="Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
