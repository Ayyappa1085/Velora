import MobileSearch from "../MobileSearch";
import FilterSortBar from "./FilterSortBar";

function NavLinks({
  showSearch,
  setShowSearch,
  query,
  setQuery,
  currentCategory,
  navigate,
  showFilterSort,
  isMobile,
  showSortMenu,
  onSortClick,
  setSortType,
}) {
  const showMobileSearch =
    isMobile && showSearch;

  return (
    <div className="nav-left">
      {showMobileSearch ? (
        <MobileSearch
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          query={query}
          setQuery={setQuery}
        />
      ) : showFilterSort ? (
        <FilterSortBar
          showSortMenu={showSortMenu}
          onSortClick={onSortClick}
          setSortType={setSortType}
        />
      ) : (
        <>
          <a
            className={
              currentCategory === "men"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/men")
            }
          >
            MEN
          </a>

          <a
            className={
              currentCategory === "women"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/women")
            }
          >
            WOMEN
          </a>

          <a
            className={
              currentCategory === "kids"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/kids")
            }
          >
            KIDS
          </a>

          <a
            className={
              currentCategory ===
              "footwear"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate(
                "/footwear"
              )
            }
          >
            FOOTWEAR
          </a>
        </>
      )}
    </div>
  );
}

export default NavLinks;