import { useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import BagDrawer from "../components/BagDrawer";

function MainLayout() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const categoryRoots = [
    "/men",
    "/women",
    "/kids",
    "/footwear",
  ];

  const hideFooter =
    path === "/wishlist" ||
    path === "/login" ||
    path === "/register" ||
    path === "/account/profile" ||
    path === "/account/orders" ||
    path === "/account/track" ||
    path === "/checkout" ||
    path === "/order-summary" ||
    path === "/payment" ||
    categoryRoots.includes(path);

  useEffect(() => {
    const isMobile =
      window.innerWidth <= 768;

    const lockScroll =
  (isMobile &&
    categoryRoots.includes(path)) ||
  path.startsWith("/account");

    if (lockScroll) {
      document.documentElement.style.overflow =
        "hidden";
      document.body.style.overflow =
        "hidden";
    } else {
      document.documentElement.style.overflow =
        "";
      document.body.style.overflow =
        "";
    }

    return () => {
      document.documentElement.style.overflow =
        "";
      document.body.style.overflow =
        "";
    };
  }, [path]);

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}

      <BagDrawer />
    </div>
  );
}

export default MainLayout;