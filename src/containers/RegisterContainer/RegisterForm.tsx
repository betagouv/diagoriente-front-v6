import React, { FunctionComponent } from "react";
import InputComponent from "components/Register/Input";
import Checkbox from "components/Register/Checkbox";
import { FormControl, FormLabel } from "components/Register/FormController";
import FormComment from "components/Register/FormComment";
import { useFormik } from "formik";

const RegisterForm: FunctionComponent = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="flex flex-col w-full">
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <FormControl>
            <FormLabel htmlFor="firstName">Prénom *</FormLabel>
            <InputComponent id="firstName" name="firstName" type="text" placeholder="ex : Léna" />
          </FormControl>
        </div>
        <div className="mb-7">
          <FormControl>
            <FormLabel>Nom de famille *</FormLabel>
            <InputComponent type="text" placeholder="ex : MAZILU" />
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel>Email *</FormLabel>
            <InputComponent checked={true} type="email" isInvalid={false} placeholder="test@test.dev" />
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel>Mot de passe *</FormLabel>
            <InputComponent checked={true} type="password" isInvalid={true} />
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel />
            <FormComment>
              <div>Votre mot de passe doit comporter 12 caractères minimum, dont :</div>
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
            <FormLabel>Ville de résidence</FormLabel>
            <InputComponent />
          </FormControl>
        </div>
        <div className="mb-3">
          <FormControl>
            <FormLabel>Code groupe</FormLabel>
            <InputComponent />
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
