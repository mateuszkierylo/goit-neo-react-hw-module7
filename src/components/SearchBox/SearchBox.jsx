import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchRequest = useSelector((state) => state.filters.name);
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="inputContainer  container">
      <label htmlFor="search">Find contacts by name</label>
      <input
        name="search"
        type="text"
        className="input"
        value={searchRequest}
        onChange={handleChange}
        placeholder="Search ..."
      />
    </div>
  );
};

export default SearchBox;
