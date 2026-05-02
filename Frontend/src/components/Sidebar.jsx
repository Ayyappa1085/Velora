import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";
import { CATEGORY_ITEMS } from "../data/categories";

const Sidebar = () => {
  const navigate = useNavigate();
  const { category, item } = useParams();

  if (!CATEGORY_ITEMS[category]) return null;

  return (
    <aside className="sidebar">
      <ul>
        {CATEGORY_ITEMS[category].map((sub) => (
          <li
            key={sub}
            className={item === sub ? "active" : ""}
            onClick={() => navigate(`/${category}/${sub}`)}
          >
            {sub.toUpperCase()}
          </li>
        ))}
      </ul>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>
    </aside>
  );
};

export default Sidebar;
