function TopBar({ hidden }) {
  return (
    <div className={`top-bar ${hidden ? "top-bar-hidden" : ""}`}>
      <p>Hi Mawa ❤️ Welcome To Our Website ❤️</p>
    </div>
  );
}

export default TopBar;
