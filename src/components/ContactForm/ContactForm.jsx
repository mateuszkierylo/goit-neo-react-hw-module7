import { Formik, Form, Field, ErrorMessage, getIn } from "formik";
import { addContact } from "../../redux/contactsOps";
import { selectIsLoading } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import clsx from "clsx";

const initialValues = {
  name: "",
  number: "",
};

const getStyles = (errors, touched, fieldName) => {
  return getIn(errors, fieldName) && getIn(touched, fieldName) ? "invalid" : "";
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const submitHandler = ({ name, number }, { resetForm }) => {
    dispatch(addContact({ name, number }));
    resetForm();
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="form container">
          <div className="inputContainer">
            <label>Name</label>
            <Field
              className={clsx(
                "input",
                getStyles(errors, touched, "name", isValid)
              )}
              type="text"
              name="name"
              placeholder="Contact name"
            />
            <ErrorMessage className="error" name="name" component="span" />
          </div>

          <div className="inputContainer">
            <label>Phone Number</label>
            <Field
              className={clsx("input", getStyles(errors, touched, "phone"))}
              type="text"
              name="number"
              placeholder="000-00-00"
            />
            <ErrorMessage className="error" name="number" component="span" />
          </div>

          <button
            className={clsx("button", "primary", "selfCenter")}
            type="submit"
            disabled={!isValid || !dirty || isLoading}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
