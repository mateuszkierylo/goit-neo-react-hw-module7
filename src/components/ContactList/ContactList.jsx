import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/selectors";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {contacts.length > 0 ? (
        contacts.map(({ id, name, number }) => (
          <li key={id} className="container">
            <Contact
              name={name}
              number={number}
              id={id}
            />
          </li>
        ))
      ) : (
        <p className={css.message}>No contacts found</p>
      )}
    </ul>
  );
};

export default ContactList;
