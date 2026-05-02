import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Searchbar.css";

function MobileSearch({
  setShowSearch,
  query,
  setQuery,
}) {
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const clean = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, " ");

  const has = (q, words) =>
    words.some((word) => q.includes(word));

  const closeSearch = () => {
    setShowSearch(false);
  };

  const handleSearch = () => {
    const q = clean(query);

    if (!q) return;

    if (has(q, ["saree", "sarees"])) {
      navigate("/women/sarees");
    } else if (has(q, ["kurta", "kurtas"])) {
      navigate("/women/kurtas");
    } else if (has(q, ["shirt", "shirts"])) {
      navigate("/men/shirts");
    } else if (has(q, ["jean", "jeans"])) {
      navigate("/men/jeans");
    } else if (has(q, ["watch", "watches"])) {
      navigate("/men/watches");
    } else if (has(q, ["sneaker", "shoe"])) {
      navigate("/footwear/sneakers");
    } else if (has(q, ["formal"])) {
      navigate("/footwear/formal");
    } else if (has(q, ["women"])) {
      navigate("/women");
    } else if (has(q, ["men"])) {
      navigate("/men");
    } else if (has(q, ["kid"])) {
      navigate("/kids");
    } else {
      navigate("/");
    }

    setQuery("");
    closeSearch();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    const handleOutside = (e) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(e.target)
      ) {
        closeSearch();
      }
    };

    document.addEventListener(
      "keydown",
      handleKey
    );

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    document.addEventListener(
      "touchstart",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKey
      );

      document.removeEventListener(
        "mousedown",
        handleOutside
      );

      document.removeEventListener(
        "touchstart",
        handleOutside
      );
    };
  }, []);

  return (
    <div
      className="search-container"
      ref={boxRef}
    >
      <input
        type="text"
        className="search-input active"
        placeholder="Search products..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch();
        }}
        autoFocus
      />
    </div>
  );
}

export default MobileSearch;