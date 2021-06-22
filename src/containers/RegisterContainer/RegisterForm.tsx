import React, { FunctionComponent } from "react";
import InputComponent from "components/Register/Input";
import Checkbox from "components/Register/Checkbox";
import { FormControl, FormLabel } from "components/Register/FormController";
import FormComment from "components/Register/FormComment";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from 'yup';

const RegisterForm: FunctionComponent = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      city: "",
      codeGroup: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Ce champ est obligatoire'),
      lastName: Yup.string().required('Ce champ est obligatoire'),
      email: Yup.string().email('Votre adresse e-mail est invalide').required('Ce champ est obligatoire'),
      password: Yup.string().min(6, "Votre mot de passe doit comporter 6 caractères minimum").required("Ce champ est obligatoire"),
      city: Yup.string().required("Ce champ est obligatoire"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="firstName">Prénom *</FormLabel>
            <InputComponent isInvalid={!!formik.errors.firstName} value={formik.values.firstName} onChange={formik.handleChange} id="firstName"
                            name="firstName" type="text" placeholder="ex : Léna" />
          </FormControl>
        </div>
        {formik.errors.firstName ? <div className="mb-4">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div className="text-lena-pink">{formik.errors.firstName}</div>
            </FormComment>
          </FormControl>
        </div> : null}
        <div className={
          clsx(
            formik.errors.lastName ? "mb-2" : "mb-7"
          )
        }>
          <FormControl>
            <FormLabel htmlFor="lastName">Nom de famille *</FormLabel>
            <InputComponent isInvalid={!!formik.errors.lastName} value={formik.values.lastName} onChange={formik.handleChange} id="lastName" name="lastName"
                            type="text" placeholder="ex : MAZILU" />
          </FormControl>
        </div>
        {formik.errors.lastName ? <div className="mb-7">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div className="text-lena-pink">{formik.errors.lastName}</div>
            </FormComment>
          </FormControl>
        </div> : null}
        <div className="mb-2">
          <FormControl>
            <FormLabel htmlFor="email">Email *</FormLabel>
            <InputComponent value={formik.values.email} onChange={formik.handleChange} id="email" name="email"
                            checked={true} type="email" isInvalid={!!formik.errors.email} placeholder="test@test.dev" />
          </FormControl>
        </div>
        {formik.errors.lastName ? <div className="mb-3">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div className="text-lena-pink">{formik.errors.lastName}</div>
            </FormComment>
          </FormControl>
        </div> : null}
        <div className="mb-3">
          <FormControl>
            <FormLabel htmlFor="password">Mot de passe *</FormLabel>
            <InputComponent value={formik.values.password} onChange={formik.handleChange} id="password" name="password"
                            checked={true} type="password" isInvalid={!!formik.errors.password} />
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div>Votre mot de passe doit comporter 6 caractères minimum, dont :</div>
              <ul className="list-disc ml-4 mt-1">
                <li className="font-bold">1 majuscule</li>
                <li className="font-bold">1 minuscule</li>
                <li className="font-bold">1 chiffre</li>
                <li className="font-bold">1 caractère spécial</li>
              </ul>
            </FormComment>
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel htmlFor="city">Ville de résidence</FormLabel>
            <InputComponent isInvalid={!!formik.errors.city} value={formik.values.city} onChange={formik.handleChange} id="city" name="city" />
          </FormControl>
        </div>
        {formik.errors.city ? <div className="mb-3">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div className="text-lena-pink">{formik.errors.city}</div>
            </FormComment>
          </FormControl>
        </div> : null}
        <div className="mb-3">
          <FormControl>
            <FormLabel htmlFor="codeGroup">Code groupe</FormLabel>
            <InputComponent value={formik.values.codeGroup} onChange={formik.handleChange} id="codeGroup"
                            name="codeGroup" />
          </FormControl>
        </div>
        <div className="mt-4 flex justify-center">
          <Checkbox
            required={true}
            label={
              <>
                J'accepte les{" "}
                <span className="text-lena-blue-dark font-bold">
                conditions d'utilisation
              </span>{" "}
                de Diagoriente
              </>
            }
          />
        </div>
        <div className="text-center mt-7 pb-10">
          <button className="bg-lena-pink w-full text-white font-bold md:w-72 py-3 rounded-md">Finaliser mon
            inscription
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
