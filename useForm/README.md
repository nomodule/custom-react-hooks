# `useForm`

React form hook that is similar to Formik.

Accepts following things

```js
{
  initialValues, validate, onSubmit;
}
```

Returns following things

```js
{
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
}
```

## Usage

```js
import { useForm } from "./useForm";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function LoginForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (values.password && values.password.length < 8) {
        errors.password = "Password should be at least 8 characters long";
      }

      return errors;
    },
    onSubmit: async ({ values, setSubmitting }) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      setSubmitting(false);
    },
  });

  const { email, password } = values;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={email}
          placeholder="email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <br />
        <br />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          placeholder="password"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <br />
        <br />
        <input type="submit" value="login" disabled={isSubmitting} />
      </form>
      <pre>
        {JSON.stringify(
          {
            values,
            errors,
            touched,
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default LoginForm;
```
