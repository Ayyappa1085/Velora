import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

function Searchbar({ showSearch, setShowSearch, query, setQuery }) {
  // 👇 fallback for desktop (old behavior)
  const [localShow, setLocalShow] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  const isMobileMode = showSearch !== undefined;

  if (isMobileMode) {
    return (
      <div className="search-container">
        <input
          type="text"
          className="search-input active"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            if (query === "") setShowSearch(false);
          }}
          autoFocus
        />
      </div>
    );
  }

  // 👉 Desktop original behavior
  return (
    <div className="search-container">
      {!localShow ? (
        <FaSearch className="search-icon" onClick={() => setLocalShow(true)} />
      ) : (
        <input
          type="text"
          className="search-input active"
          placeholder="Search products..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onBlur={() => {
            if (localQuery === "") setLocalShow(false);
          }}
          autoFocus
        />
      )}
    </div>
  );
}

export default Searchbar;