import { isNaN } from 'lodash';

export function isNumberEmpty(value: any) {
  if (value !== '' && !isNaN(value - 0)) return false;
  return true;
}

export function isStringEmpty(value: string) {
  if (value) return '';
  return 'Champ vide';
}

export function isArrayEmpty(values: any[]) {
  if (values.length) return '';
  return 'Champ vide';
}

export function validateEmail(email: string) {
  if (!email) return 'Email vide';
  // eslint-disable-next-line
  const re =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(`${email}`.toLowerCase())) {
    return '';
  }
  return 'Votre adresse e-mail doit être valide (exemple@domain.com)';
}
export function hasUppercase(s: string) {
  return /[A-Z]/g.test(s);
}
export function hasLowercase(s: string) {
  return /[a-z]/g.test(s);
}
export function hasNumber(s: string) {
  return /[0-9]/g.test(s);
}
export function hasSpecial(s: string) {
  return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g.test(s);
}
export function validatePassword(password: string) {
  if (password) {
    if (password.length < 6) {
      return `Votre mot de passe doit comporter au moins six caractères 
      avec des lettres minuscules et majuscules, des chiffres et des symboles`;
    }
    if (!hasNumber(password) || !hasUppercase(password) || !hasLowercase(password) || !hasSpecial(password)) {
      return `Votre mot de passe doit comporter au moins six caractères 
      avec des lettres minuscules et majuscules, des chiffres et des symboles`;
    }
  }

  return '';
}
