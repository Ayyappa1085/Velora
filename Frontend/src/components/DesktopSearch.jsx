import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

function DesktopSearch() {
  const [localShow, setLocalShow] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  const navigate = useNavigate();

  const clean = (text) => text.toLowerCase().trim().replace(/\s+/g, " ");

  const has = (q, words) => words.some((word) => q.includes(word));

  const handleSearch = () => {
    const q = clean(localQuery);

    if (!q) return;

    if (has(q, ["saree", "sarees"])) {
      navigate("/women/sarees");
    } else if (has(q, ["kurta", "kurtas"])) {
      navigate("/women/kurtas");
    } else if (

    /* FIXED: kids before men shirts */
      has(q, [
        "kshirts",
        "kidss",
        "polo",
        "polos",
        "tshirts",
        "tshirt",
        "kid shirts",
        "kids shirt",
      ])
    ) {
      navigate("/kids/shirts");
    } else if (
      has(q, [
        "kidspants",
        "kids pants",
        "kidpants",
        "kidspant",
        "kpants",
        "kpants",
      ])
    ) {
      navigate("/kids/pants");
    } else if (has(q, ["shirt", "shirts"])) {
      navigate("/men/shirts");
    } else if (has(q, ["jean", "jeans", "pants", "pant"])) {
      navigate("/men/jeans");
    } else if (has(q, ["watch", "watches"])) {
      navigate("/men/watches");
    } else if (has(q, ["sneaker", "sneakers", "footware", "footwares"])) {
      navigate("/footwear/sneakers");
    } else if (has(q, ["shoe", "shoes", "formal", "formals"])) {
      navigate("/footwear/formal");
    } else if (has(q, ["women", "lady", "girl"])) {
      navigate("/women");
    } else if (has(q, ["men", "man"])) {
      navigate("/men");
    } else if (has(q, ["kid", "kids", "child"])) {
      navigate("/kids");
    } else if (has(q, ["footwear"])) {
      navigate("/footwear");
    } else {
      navigate("/");
    }

    setLocalQuery("");
    setLocalShow(false);
  };

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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          onBlur={() => {
            if (!localQuery) setLocalShow(false);
          }}
          autoFocus
        />
      )}
    </div>
  );
}

export default DesktopSearch;
