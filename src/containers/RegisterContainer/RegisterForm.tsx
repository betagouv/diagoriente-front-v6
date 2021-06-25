import React, { FunctionComponent, useEffect } from 'react';
import InputComponent from 'components/Register/Input';
import Checkbox from 'components/Register/Checkbox';
import { FormControl, FormLabel } from 'components/Register/FormController';
import FormComment from 'components/Register/FormComment';

import clsx from 'clsx';
import useRegister from 'common/container/auth/useRegister';
import { hasLowercase, hasNumber, hasSpecial, hasUppercase } from 'common/utils/validation';
import Button from '../../components/design-system/Button';

const RegisterForm: FunctionComponent = () => {
  const { formik, data, openLocation, onSelect, handelChangeLocation } = useRegister();

  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="firstName">Prénom *</FormLabel>
            <InputComponent
              isInvalid={formik.touched.firstName && !!formik.errors.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="ex : Léna"
            />
          </FormControl>
        </div>
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="mb-4">
            <FormControl>
              <FormLabel />
              <FormComment>
                <div className="text-lena-pink">{formik.errors.firstName}</div>
              </FormComment>
            </FormControl>
          </div>
        ) : null}
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="lastName">Nom de famille *</FormLabel>
            <InputComponent
              isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="ex : MAZILU"
            />
          </FormControl>
        </div>
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="mb-2">
            <FormControl>
              <FormLabel />
              <FormComment>
                <div className="text-lena-pink">{formik.errors.lastName}</div>
              </FormComment>
            </FormControl>
          </div>
        ) : null}
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
              isInvalid={!!formik.touched.email && !!formik.errors.email}
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
              onBlur={formik.handleBlur}
              id="password"
              name="password"
              checked={true}
              type="password"
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
          </FormControl>
        </div>
        <div className="mb-2">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div>
                Votre mot de passe doit comporter{' '}
                <span
                  className={clsx(
                    formik.values.password.length >= 6 ? 'text-lena-blue' : 'text-lena-pink',
                    'font-bold',
                  )}
                >
                  6 caractères minimum
                </span>
                , dont :
              </div>
              <ul className="list-disc ml-4 mt-1">
                <li
                  className={clsx(
                    hasUppercase(formik.values.password) ? 'text-lena-blue' : 'text-lena-pink',
                    'font-bold',
                  )}
                >
                  1 majuscule
                </li>
                <li
                  className={clsx(
                    hasLowercase(formik.values.password) ? 'text-lena-blue' : 'text-lena-pink',
                    'font-bold',
                  )}
                >
                  1 minuscule
                </li>
                <li
                  className={clsx(hasNumber(formik.values.password) ? 'text-lena-blue' : 'text-lena-pink', 'font-bold')}
                >
                  1 chiffre
                </li>
                <li
                  className={clsx(
                    hasSpecial(formik.values.password) ? 'text-lena-blue' : 'text-lena-pink',
                    'font-bold',
                  )}
                >
                  1 caractère spécial
                </li>
              </ul>
            </FormComment>
          </FormControl>
        </div>
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="city">Ville de résidence</FormLabel>
            <InputComponent
              value={formik.values.location}
              onChange={(e) => handelChangeLocation(e)}
              onBlur={formik.handleBlur}
              id="location"
              name="location"
              checked={true}
              isInvalid={formik.touched.location && !!formik.errors.location}
              selectShow={openLocation}
              withSelect={data?.location.map((location) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li className="p-1" onClick={() => onSelect(location)}>
                  {location.postcode} {location.label}
                </li>
              ))}
            />
          </FormControl>
        </div>
        {formik.touched.location && formik.errors.location ? (
          <div className="mb-2">
            <FormControl>
              <FormLabel />
              <FormComment>
                <div className="text-lena-pink">{formik.errors.location}</div>
              </FormComment>
            </FormControl>
          </div>
        ) : null}
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="codeGroup">Code groupe</FormLabel>
            <InputComponent
              value={formik.values.codeGroup}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="codeGroup"
              name="codeGroup"
            />
          </FormControl>
        </div>
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="codeGroup">Structure</FormLabel>
            <InputComponent
              value={formik.values.structure}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="structure"
              name="structure"
            />
          </FormControl>
        </div>
        <div className="mt-4 flex justify-center">
          <Checkbox
            required={true}
            label={
              <>
                J'accepte les <span className="text-lena-blue-dark font-bold">conditions d'utilisation</span> de
                Diagoriente
              </>
            }
          />
        </div>
        <div className="text-center mt-7 pb-10">
          <Button variant="primary" size="md">
            Finaliser mon inscription
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
