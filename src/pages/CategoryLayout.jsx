import { useParams } from "react-router-dom";

import SidebarSection from "../sections/SidebarSection";
import OffersSection from "../sections/OffersSection";
import ProductsSection from "../sections/ProductsSection";

import { PRODUCTS } from "../data/products";
import "./CategoryLayout.css";

function CategoryLayout() {
  const { category, item } = useParams();

  const isSubCategory = !!item;

  const filteredProducts = isSubCategory
    ? PRODUCTS.filter(
        (p) =>
          p.category.toLowerCase() === category?.toLowerCase() &&
          p.type.toLowerCase() === item?.toLowerCase()
      )
    : [];

  return (
    <div className="category-layout">

      {!isSubCategory && <SidebarSection />}

      <div className="content-wrapper">

        {!isSubCategory && <OffersSection />}

        {isSubCategory && (
          <ProductsSection products={filteredProducts} />
        )}

      </div>
    </div>
  );
}

export default CategoryLayout;