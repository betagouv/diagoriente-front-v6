import React, {
  useState, ChangeEvent, useRef, useCallback,
} from 'react';

import { isNaN, isArray } from 'lodash';
import { isNumberEmpty, isStringEmpty } from 'common/utils/validation';

function changeObject<T extends object>(obj: T, newObject: Partial<T>): T {
  return { ...obj, ...newObject };
}

export function useInput(initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void, boolean];

export function useInput(initialValue: boolean): [boolean, (e: ChangeEvent<HTMLInputElement>) => void, boolean];

export function useInput(
  initialValue: string | boolean,
): [string | boolean, (e: ChangeEvent<HTMLInputElement>) => void, boolean] {
  const [value, valueChange] = useState(initialValue);
  const touched = useRef(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.type !== 'checkbox') {
      e.preventDefault();
    }

    if (!touched.current) touched.current = true;
    valueChange(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  }
  return [value, onChange, touched.current];
}

export interface FormState<T extends { [key: string]: any }> {
  values: T;
  errors: Partial<{ [K in keyof T]: any }>;
  touched: Partial<{ [K in keyof T]: boolean }>;
}

export interface FormActions<T extends { [key: string]: any }> {
  handleChange: (e: ChangeEvent<any>) => void;
  validateForm: () => boolean;
  setValues: (values: Partial<T>) => void;
  setErrors: (errors: Partial<{ [K in keyof T]: any }>) => void;
  setTouched: (touched: Partial<{ [K in keyof T]: boolean }>) => void;
  setAllTouched: (value: boolean) => void;
}

export interface FormOptions<T extends { [key: string]: any }> {
  initialValues: T;
  validation?: Partial<{ [K in keyof T]: (value: T[K], values: T) => any }>;
  required?: (keyof T)[];
}

export function useForm<T extends { [key: string]: any }>(options: FormOptions<T>): [FormState<T>, FormActions<T>] {
  const validationFns: Partial<{ [K in keyof T]: (value: T[K], values: T) => any }> = options.validation || {};
  const required: (keyof T)[] = options.required || [];

  required.forEach((key) => {
    if (!validationFns[key]) {
      if (isArray(options.initialValues[key])) {
        (validationFns as any)[key] = (value: any[]) => (value.length ? '' : 'Champ vide');
      } else {
        (validationFns as any)[key] = typeof options.initialValues[key] === 'string' ? isStringEmpty : isNumberEmpty;
      }
    }
  });

  const initialTouched: Partial<{ [K in keyof T]: boolean }> = {};
  const initialErrors: Partial<{ [K in keyof T]: any }> = {};
  const keys: (keyof T)[] = Object.keys(options.initialValues) as any;
  const initialValues: T = {} as any;
  keys.forEach((key) => {
    initialTouched[key] = false;
    initialValues[key] = (isNaN(options.initialValues[key]) ? '' : options.initialValues[key]) as any;
  });

  keys.forEach((key) => {
    const value = options.initialValues[key];
    const errorFn = validationFns[key];
    if (errorFn) {
      initialErrors[key] = errorFn(value, initialValues);
    }
  });

  const [values, valuesChange] = useState(initialValues);
  const [touched, touchedChange] = useState(initialTouched);
  const [errors, errorsChange] = useState(initialErrors);

  const validateForm = useCallback(() => {
    const valuesFind: (keyof T)[] = Object.keys(values) as any;
    return !valuesFind.find((key) => errors[key]);
  }, [values, errors]);

  const setTouched = useCallback(
    (nextTouched: Partial<{ [K in keyof T]: boolean }>) => {
      touchedChange(changeObject(touched, nextTouched));
    },
    [touched],
  );

  const setAllTouched = useCallback(
    (value: boolean) => {
      const nextTouched: Partial<{ [K in keyof T]: boolean }> = {};
      const touchedKeys: (keyof T)[] = Object.keys(values) as any;
      touchedKeys.forEach((key) => {
        nextTouched[key] = value;
      });
      touchedChange((prevTouched) => changeObject(prevTouched, nextTouched));
    },
    [values],
  );

  const setErrors = useCallback(
    (nextErrors: Partial<{ [K in keyof T]: any }>) => {
      errorsChange(changeObject(errors, nextErrors));
    },
    [errors],
  );

  const setValues = useCallback(
    (nextValues: Partial<T>) => {
      const valuesKeys: (keyof T)[] = (Object.keys as any)(nextValues);
      const nextErrors: Partial<{ [K in keyof T]: any }> = {};
      const v: T = {} as any;

      valuesKeys.forEach((key) => {
        v[key] = (isNaN(nextValues[key]) ? '' : nextValues[key]) as any;
      });

      const nextState = changeObject(values, v);

      valuesKeys.forEach((key) => {
        const validationFn = validationFns[key];
        if (validationFn) {
          nextErrors[key] = validationFn(nextValues[key] as T[keyof T], nextState);
        }
      });
      setErrors(nextErrors);
      valuesChange(nextState);
    },
    // eslint-disable-next-line
    [setErrors, values],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      /* e.preventDefault(); */
      let { value } = e.target as any;
      if (e.target.type === 'checkbox') value = e.target.checked;
      else if (e.target.type === 'file' && e.target.files) [value] = e.target.files;

      const name: keyof T = e.target.name as any;
      if (!touched[name]) {
        setTouched({ [name]: true } as any);
      }

      setValues({ [name]: value } as any);
    },
    [setValues, setTouched, touched],
  );

  return [
    { values, errors, touched },
    {
      handleChange,
      validateForm,
      setValues,
      setErrors,
      setTouched,
      setAllTouched,
    },
  ];
}
