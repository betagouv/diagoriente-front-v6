import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAddReco } from 'common/requests/recommendation';
import ThemeContext from 'common/contexts/ThemeContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControlReco, FormLabelReco } from 'components/Register/FormController';
import InputComponent from 'components/Register/Input';
import FormComment from 'components/Register/FormComment';
import Button from 'components/design-system/Button';
import { ReactComponent as ArrowLeftSvg } from 'assets/svg/picto_mail.svg';
import { ReactComponent as CrossIcon } from 'assets/svg/cross3.svg';

const RecommandationMobile = () => {
  const history = useHistory();
  const param: { idSkill: string } = useParams();
  const [addRecoCall, setAddRecoCall] = useAddReco();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [step, setStep] = useState(0);
  const { theme } = useContext(ThemeContext);
  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      confirmEmail: '',
      text: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      confirmEmail: Yup.string().email().required(),
      nom: Yup.string().required(),
      prenom: Yup.string().required(),
      text: Yup.string().required(),
      // MT: Disabled, if we change the regex later we will have login issues
      //  .matches(regexPassword, 'Votre mot de passe est invalide')
    }),
    onSubmit: (values) => {},
  });
  useEffect(() => {
    if (formik.values.nom && formik.values.prenom) {
      formik.setFieldValue(
        'text',
        // eslint-disable-next-line max-len
        `${formik.values.nom} ${formik.values.prenom} a effectué une expérience professionnelle chez vous et sollicite une recommandation de votre part. Vous pouvez l'aider en montrant que vous validez cette expériencesur la plateforme Diagoriente, l'outil ultime pour trouver son orientation et accéder à l'emploi. Bien cordialement,`,
      );
    }
  }, [formik.values.nom, formik.values.prenom]);

  const onAddReco = () => {
    if (param.idSkill) {
      const dataToSend = {
        skill: param.idSkill,
        firstName: formik.values.nom,
        lastName: formik.values.prenom,
        email: formik.values.email,
        message: formik.values.text,
      };
      addRecoCall({ variables: dataToSend });
    }
  };
  useEffect(() => {
    if (setAddRecoCall.data) {
      setStep(2);
    }
  }, [setAddRecoCall.data]);
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              <div className="text-lena-blue-dark font-bold border-b-2 p-4 flex text-lg items-center justify-between">
                <span>Demande de recommandation</span>
                <CrossIcon className="text-lena-blue-dark" onClick={() => history.goBack()} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-center text-lena-blue-dark">Pour mon expérience:</p>
              <p className="text-center text-lena-blue-dark">“{theme?.title}” à :</p>
            </div>
            <div className="flex flex-col mt-8 w-full px-4">
              <form className="w-full">
                <div className="mb-4">
                  <FormControlReco>
                    <FormLabelReco htmlFor="nom" className="text-lena-blue-dark">
                      Nom <span className="text-lena-pink-dark">*</span>
                    </FormLabelReco>
                    <InputComponent
                      value={formik.values.nom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="nom"
                      name="nom"
                      checked={true}
                      type="text"
                      isInvalid={formik.touched.nom && !!formik.errors.nom}
                      required
                      fullWidth
                    />
                  </FormControlReco>
                </div>
                {formik.touched.nom && formik.errors.nom && (
                  <div className="mb-2">
                    <FormControlReco>
                      <FormLabelReco />
                      <FormComment>
                        <div className="text-lena-pink">{formik.errors.nom}</div>
                      </FormComment>
                    </FormControlReco>
                  </div>
                )}
                <div className="mb-4">
                  <FormControlReco>
                    <FormLabelReco htmlFor="prenom" className="text-lena-blue-dark">
                      Prénom <span className="text-lena-pink-dark">*</span>
                    </FormLabelReco>
                    <InputComponent
                      value={formik.values.prenom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="prenom"
                      name="prenom"
                      checked={true}
                      type="text"
                      isInvalid={formik.touched.prenom && !!formik.errors.prenom}
                      required
                      fullWidth
                    />
                  </FormControlReco>
                </div>
                {formik.touched.prenom && formik.errors.prenom && (
                  <div className="mb-2">
                    <FormControlReco>
                      <FormLabelReco />
                      <FormComment>
                        <div className="text-lena-pink">{formik.errors.prenom}</div>
                      </FormComment>
                    </FormControlReco>
                  </div>
                )}
                <div className="mb-4">
                  <FormControlReco>
                    <FormLabelReco htmlFor="email" className="text-lena-blue-dark">
                      Email <span className="text-lena-pink-dark">*</span>
                    </FormLabelReco>
                    <InputComponent
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="email"
                      name="email"
                      checked={true}
                      type="email"
                      isInvalid={formik.touched.email && !!formik.errors.email}
                      required
                      fullWidth
                    />
                  </FormControlReco>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="mb-2">
                    <FormControlReco>
                      <FormLabelReco />
                      <FormComment>
                        <div className="text-lena-pink">{formik.errors.email}</div>
                      </FormComment>
                    </FormControlReco>
                  </div>
                )}
                <div className="mb-4">
                  <FormControlReco>
                    <FormLabelReco htmlFor="confirmEmail" className="text-lena-blue-dark">
                      Confirmation de l'email <span className="text-lena-pink-dark">*</span>
                    </FormLabelReco>
                    <InputComponent
                      value={formik.values.confirmEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="confirmEmail"
                      name="confirmEmail"
                      checked={true}
                      type="email"
                      isInvalid={formik.touched.confirmEmail && !!formik.errors.confirmEmail}
                      required
                      fullWidth
                    />
                  </FormControlReco>
                </div>
                {formik.touched.confirmEmail && formik.errors.confirmEmail && (
                  <div className="mb-2">
                    <FormControlReco>
                      <FormLabelReco />
                      <FormComment>
                        <div className="text-lena-pink">{formik.errors.confirmEmail}</div>
                      </FormComment>
                    </FormControlReco>
                  </div>
                )}
                <div className="text-center mt-6 pb-10 w-full">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setStep(1)}
                    disabled={
                      !formik.values.nom ||
                      !formik.values.prenom ||
                      !formik.values.email ||
                      !formik.values.confirmEmail ||
                      formik.values.email !== formik.values.confirmEmail
                    }
                  >
                    Suivant
                  </Button>
                </div>
              </form>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>
              <p className="text-lena-blue-dark font-bold border-b-2 p-4">Demande de recommandation </p>
            </div>
            <div className="mt-4">
              <p className="text-center text-lena-blue-dark">Pour mon expérience:</p>
              <p className="text-center text-lena-blue-dark">“{theme?.title}” à :</p>
            </div>
            <div className="p-4">
              <div className="mt-10">
                <p className="font-bold text-lena-blue-dark py-2">
                  Message <span>*</span>
                </p>
                <textarea
                  placeholder="ex: J'invente des recettes"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  className="w-full rounded-md ring-0 border-lena-lightgray2 resize-none"
                  id="text"
                  name="text"
                  rows={12}
                />
              </div>
              <p className="text-lena-pink-dark font-bold">Vous pouvez modifier ce message avant de l’envoyer</p>
              <div className="text-center mt-6 w-full">
                <Button variant="secondary" fullWidth onClick={onAddReco}>
                  Suivant
                </Button>
              </div>
              <div className="text-center mt-4">
                <div onClick={() => setStep(0)} className="pointer-cursor">
                  <span className="text-lena-blue-dark">Précédent</span>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="bg-lena-blue-dark h-screen flex flex-col justify-center">
            <div className="flex justify-center pb-12">
              <ArrowLeftSvg />
            </div>
            <div className="px-4">
              <p className="text-bold text-white text-lg text-center py-4">Le message a bien été envoyé !</p>
              <p className="text-white text-lg text-center py-4">
                Une fois rédigée, sa recommandation apparaîtra dans votre carte de compétences.
              </p>
              <div className="text-center mt-6 pb-10 w-full">
                <Button variant="secondary" fullWidth onClick={() => history.goBack()}>
                  J’ai compris
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return <div />;
    }
  };

  return <div className="flex flex-col">{renderStep()}</div>;
};

export default RecommandationMobile;
