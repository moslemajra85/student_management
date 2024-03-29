import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';

const AddStudentForm = ({ onSuccess }) => {
  const bottomMargin = { marginBottom: '12px' };
  const tagStyle = { color: 'red', marginBottom: '12px' };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'First Name is Required.';
        } else if (values.firstName.length < 3) {
          errors.firstName = 'First Name Must Be At Least 3 Characters Long.';
        }
        if (!values.lastName) {
          errors.lastName = 'Last Name is Required.';
        } else if (values.lastName.length < 3) {
          errors.lastName = 'Last Name Must Be At Least 3 Characters Long.';
        }
        if (!values.email) {
          errors.email = 'Email Required.';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address.';
        }
        if (!values.gender) {
          errors.gender = 'Gender Required';
        } else if (
          !['MALE', 'FEMALE', 'male', 'female'].includes(values.gender)
        ) {
          errors.gender = 'Gender Must Be (MALE, FEMALE, male, female)';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSuccess(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={bottomMargin}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder="First Name"
          />
          {errors.firstName && touched.firstName && errors.firstName && (
            <Tag style={tagStyle}>
              {errors.firstName && touched.firstName && errors.firstName}
            </Tag>
          )}
          <Input
            style={bottomMargin}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder="Last Name"
          />
          {errors.lastName && touched.lastName && errors.lastName && (
            <Tag style={tagStyle}>
              {errors.lastName && touched.lastName && errors.lastName}
            </Tag>
          )}
          <Input
            style={bottomMargin}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email e.g example@gmail.Com"
          />
          {errors.email && touched.email && errors.email && (
            <Tag style={tagStyle}>
              {errors.email && touched.email && errors.email}
            </Tag>
          )}

          <Input
            style={bottomMargin}
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder="Gender e.g Male or Female"
          />
          {errors.gender && touched.gender && errors.gender && (
            <Tag style={tagStyle}>
              {errors.gender && touched.gender && errors.gender}
            </Tag>
          )}

          <Button onClick={submitForm} type="primary" disabled={!isValid}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddStudentForm;
