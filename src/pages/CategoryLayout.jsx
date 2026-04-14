import { useParams } from "react-router-dom";

import SidebarSection from "../sections/SidebarSection";
import OffersSection from "../sections/OffersSection";
import ProductsSection from "../sections/ProductsSection";

import { PRODUCTS } from "../data/products";
import "./CategoryLayout.css";

function CategoryLayout() {
  const { category, item } = useParams();

  const isSubCategory = !!item;

  let filteredProducts = isSubCategory
    ? PRODUCTS.filter(
        (p) =>
          p.category.toLowerCase() ===
            category?.toLowerCase() &&
          p.type.toLowerCase() ===
            item?.toLowerCase()
      )
    : [];

  const sortType =
    localStorage.getItem(
      "velora-sort"
    ) || "default";

  if (sortType === "low") {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortType === "high") {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortType === "az") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortType === "za") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div
      className={`category-layout ${
        isSubCategory
          ? "sub-page"
          : "root-page"
      }`}
    >
      {!isSubCategory && (
        <SidebarSection />
      )}

      <div className="content-wrapper">
        {!isSubCategory && (
          <OffersSection />
        )}

        {isSubCategory && (
          <ProductsSection
            products={filteredProducts}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryLayout;