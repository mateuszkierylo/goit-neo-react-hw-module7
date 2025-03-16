import { FaUser, FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsOps";
import { selectIsLoading } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contact}>
      <div>
        <p>
          <FaUser className={css.icon} />
          {name}
        </p>
        <p>
          <FaPhone className={css.icon} />
          {number}
        </p>
      </div>
      <button
        disabled={isLoading}
        onClick={() => handleDelete(id)}
        className="button secondary selfCenter"
        type="button"
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
