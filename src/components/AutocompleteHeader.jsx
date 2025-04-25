import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

const AutocompleteHeader = ({ doctors }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const matches = doctors
      .filter((doc) =>
        doc.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(matches);
  };

  const updateSearch = (name) => {
    const parsed = queryString.parse(location.search, { arrayFormat: "comma" });
    parsed.q = name;
    const newQuery = queryString.stringify(parsed, { arrayFormat: "comma" });
    navigate(`/?${newQuery}`);
    setInputValue(name);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      updateSearch(inputValue.trim());
    }
  };

  return (
    <div className="autocomplete">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-testid="autocomplete-input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search doctor name..."
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((doc, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              onClick={() => updateSearch(doc.name)}
              style={{ cursor: "pointer" }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteHeader;
