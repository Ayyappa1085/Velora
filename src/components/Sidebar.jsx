import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";

const itemsMap = {
  men: ["shirts", "jeans", "watches"], // ✅ FIXED
  women: ["sarees", "kurtas"],
  kids: ["shirts", "pants"],
  footwear: ["sneakers", "formal"],
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { category, item } = useParams(); // ✅ FIXED

  if (!itemsMap[category]) return null;

  return (
    <aside className="sidebar">
      <ul>
        {itemsMap[category].map((sub) => (
          <li
            key={sub}
            className={item === sub ? "active" : ""} // ✅ FIXED
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