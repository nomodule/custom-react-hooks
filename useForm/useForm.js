import { useEffect, useState } from "react";

function touchAllInputs(inputs) {
  const touchedInputs = {};
  inputs.forEach((input) => {
    touchedInputs[input] = true;
  });
  return touchedInputs;
}

export function useForm({ initialValues, validate, onSubmit }) {
  const listOfInputs = Object.keys(initialValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
    setErrors(validate(newValues));
  };

  const handleBlur = (event) => {
    setErrors(validate(values));
    setTouched((s) => ({ ...s, [event.target.name]: true }));
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setSubmitting(false);
    }

    if (!Object.keys(errors).length && isSubmitting) {
      onSubmit({ values, setSubmitting });
    }
  }, [isSubmitting]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setTouched(touchAllInputs(listOfInputs));
    setSubmitting(true);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  };
}
