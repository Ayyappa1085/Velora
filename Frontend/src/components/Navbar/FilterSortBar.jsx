import {
  useState,
  useEffect,
} from "react";

function FilterSortBar({
  onSortClick,
  showSortMenu,
  setSortType,
  filters,
  setFilters,
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

  const applyFilter = (
    key,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        prev[key] === value
          ? ""
          : value,
    }));
  };

  const clearAll = () => {
    setFilters({
      price: "",
      size: "",
      color: "",
    });
    setShowFilter(false);
  };

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

            <div
              onClick={() =>
                applyFilter(
                  "price",
                  "0-999"
                )
              }
            >
              ₹0 - ₹999
            </div>

            <div
              onClick={() =>
                applyFilter(
                  "price",
                  "1000-1999"
                )
              }
            >
              ₹1000 - ₹1999
            </div>

            <div
              onClick={() =>
                applyFilter(
                  "price",
                  "2000+"
                )
              }
            >
              ₹2000+
            </div>

            <div className="menu-title">
              Size
            </div>

            {["S", "M", "L", "XL"].map(
              (size) => (
                <div
                  key={size}
                  onClick={() =>
                    applyFilter(
                      "size",
                      size
                    )
                  }
                >
                  {size}
                </div>
              )
            )}

            <div className="menu-title">
              Color
            </div>

            {[
              "Black",
              "White",
              "Blue",
              "Grey",
            ].map((color) => (
              <div
                key={color}
                onClick={() =>
                  applyFilter(
                    "color",
                    color.toLowerCase()
                  )
                }
              >
                {color}
              </div>
            ))}

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