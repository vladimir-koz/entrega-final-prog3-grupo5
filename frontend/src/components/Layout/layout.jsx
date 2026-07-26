import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <main className="dashboard-content">{children}</main>
      </div>
    </>
  );
}

export default Layout;
