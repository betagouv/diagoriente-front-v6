import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Ce champ est invalide',
    required: 'Ce champ est requis',
  },
  string: {
    email: 'Entrez une adresse e-mail valide',
  },
});
