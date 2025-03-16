import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from "./redux/selectors";
import { fetchContacts } from "./redux/contactsOps";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);

  useEffect(() => {
    console.log('here')
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mainTitle">Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}

export default App;
