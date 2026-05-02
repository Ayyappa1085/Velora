import { useEffect, useState } from "react";
// ❌ REMOVE axios
// import axios from "axios";
import "../../styles/AdminProducts.css";
import { CATEGORY_ITEMS } from "../../data/categories";

// ✅ ADD API
import api from "../../utils/api";

const API = "/api/products";
const LOAD_API = "/api/products?limit=1000";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    oldPrice: "",
    category: "Men",
    type: CATEGORY_ITEMS.men[0],
    stock: "",
    image: null,
  });

  // ⚠️ KEEP (not breaking structure)
  const getToken = () => localStorage.getItem("token");

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(LOAD_API);

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      return;
    }

    if (name === "category") {
      const key = value.toLowerCase();

      setForm({
        ...form,
        category: value,
        type: CATEGORY_ITEMS[key][0],
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setEditId(null);

    setForm({
      title: "",
      subtitle: "",
      price: "",
      oldPrice: "",
      category: "Men",
      type: CATEGORY_ITEMS.men[0],
      stock: "",
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("subtitle", form.subtitle);
      data.append("price", form.price);
      data.append("oldPrice", form.oldPrice);
      data.append("category", form.category);
      data.append("type", form.type);
      data.append("stock", Number(form.stock));

      if (form.image) {
        data.append("image", form.image);
      }

      if (editId) {
        // ✅ UPDATE
        await api.put(`${API}/${editId}`, {
          title: form.title,
          subtitle: form.subtitle,
          price: form.price,
          oldPrice: form.oldPrice,
          category: form.category,
          type: form.type,
          stock: Number(form.stock),
        });
      } else {
        // ✅ CREATE
        await api.post(API, data);
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      title: item.title,
      subtitle: item.subtitle || "",
      price: item.price,
      oldPrice: item.oldPrice || "",
      category: item.category,
      type: item.type,

      stock: item.sizeStock?.S ?? item.stock,
      image: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`${API}/${id}`);
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const subOptions =
    categoryFilter === "all" ? [] : CATEGORY_ITEMS[categoryFilter] || [];

  const filtered = products.filter((item) => {
    const text = `${item.title} ${item.type}`.toLowerCase();

    const matchSearch = text.includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" ||
      item.category.toLowerCase() === categoryFilter;

    const matchSubCategory =
      subCategoryFilter === "all" ||
      item.type.toLowerCase() === subCategoryFilter;

    return matchSearch && matchCategory && matchSubCategory;
  });

  const visibleProducts =
    search || categoryFilter !== "all" || subCategoryFilter !== "all"
      ? filtered
      : filtered.slice(0, 6);

  return (
    <div className="admin-products-page">
      <div className="product-form-card">
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            value={form.oldPrice}
            onChange={handleChange}
          />

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Footwear">Footwear</option>
          </select>

          <select name="type" value={form.type} onChange={handleChange}>
            {CATEGORY_ITEMS[form.category.toLowerCase()]?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <div className="form-btns">
            <button type="submit">{editId ? "Update" : "Add Product"}</button>

            {editId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="products-list-card">
        <div className="list-head">
          <h2>Products</h2>
          <span>{visibleProducts.length} items</span>
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubCategoryFilter("all");
            }}
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="footwear">Footwear</option>
          </select>

          <select
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
          >
            <option value="all">All Types</option>

            {subOptions.map((item) => (
              <option key={item} value={item.toLowerCase()}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="empty-products">Loading...</div>
        ) : visibleProducts.length === 0 ? (
          <div className="empty-products">No products found.</div>
        ) : (
          <div className="admin-product-grid">
            {visibleProducts.map((item) => (
              <div className="admin-product-card" key={item._id}>
                <img src={item.image} alt={item.title} />

                <h3>{item.title}</h3>

                <p>₹{item.price}</p>

                <small>
                  {item.category} / {item.type}
                </small>

                <div className="stock-tag">
                  Stock: {item.sizeStock?.S ?? item.stock}
                </div>

                <div className="card-actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
