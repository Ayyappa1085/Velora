import { useState, useEffect } from "react";

function FilterSortBar({
  onSortClick,
  showSortMenu,
  setSortType,
}) {
  const [showFilter, setShowFilter] =
    useState(false);

  const chooseSort = (type) => {
    setSortType(type);
    onSortClick(false);
  };

  const toggleSort = () => {
    setShowFilter(false);
    onSortClick(!showSortMenu);
  };

  const toggleFilter = () => {
    onSortClick(false);
    setShowFilter(!showFilter);
  };

  const clearAll = () => {
    setShowFilter(false);
  };

  /* Close both on scroll */
  useEffect(() => {
    const closeMenus = () => {
      setShowFilter(false);
      onSortClick(false);
    };

    window.addEventListener(
      "scroll",
      closeMenus,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        closeMenus
      );
  }, [onSortClick]);

  return (
    <div className="filter-sort-wrap">
      {/* FILTER */}
      <div className="sort-box">
        <a onClick={toggleFilter}>
          FILTER
        </a>

        {showFilter && (
          <div className="sort-menu filter-menu">
            <div className="menu-title">
              Price Range
            </div>

            <div>₹0 - ₹999</div>
            <div>₹1000 - ₹1999</div>
            <div>₹2000+</div>

            <div className="menu-title">
              Size
            </div>

            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>

            <div className="menu-title">
              Color
            </div>

            <div>Black</div>
            <div>White</div>
            <div>Blue</div>
            <div>Grey</div>

            <div
              className="clear-btn"
              onClick={clearAll}
            >
              Clear Filters
            </div>
          </div>
        )}
      </div>

      {/* SORT */}
      <div className="sort-box">
        <a onClick={toggleSort}>
          SORT
        </a>

        {showSortMenu && (
          <div className="sort-menu">
            <div
              onClick={() =>
                chooseSort("low")
              }
            >
              Price Low to High
            </div>

            <div
              onClick={() =>
                chooseSort("high")
              }
            >
              Price High to Low
            </div>

            <div
              onClick={() =>
                chooseSort("az")
              }
            >
              Name A-Z
            </div>

            <div
              onClick={() =>
                chooseSort("za")
              }
            >
              Name Z-A
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSortBar;