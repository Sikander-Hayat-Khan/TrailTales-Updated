import { useState } from "react";
import api from "../api/axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Navbar = ({
  logo,
  setAuthMode,
  setAuthModalOpen,
  isProfileDropdownOpen,
  setProfileDropdownOpen,
  setProfileModalOpen,
  isLoggedIn,
  handleLogout,
  handleToast,
  user,
}: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>TrailTales.</span>
      </div>

      <div className="nav-links">
        {!isLoggedIn && (
          <>
            <button
              className="btn-login"
              onClick={() => {
                setAuthMode("login");
                setAuthModalOpen(true);
              }}
              aria-label="Login"
            >
              Login
            </button>
            <button
              className="btn-signup"
              onClick={() => {
                setAuthMode("signup");
                setAuthModalOpen(true);
              }}
              aria-label="Sign Up"
            >
              Sign Up
            </button>
          </>
        )}

        <div className="profile-menu-container">
          <button
            className="btn-profile-header"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            aria-label="User Profile Menu"
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
            style={isLoggedIn && user?.avatarColor ? { backgroundColor: user.avatarColor, border: "none" } : {}}
          >
            <i className="ph ph-user" style={{ fontSize: "1.2rem", color: isLoggedIn && user?.avatarColor ? "#fff" : "inherit" }}></i>
          </button>
          <div
            id="profile-dropdown"
            className={`profile-dropdown ${
              isProfileDropdownOpen ? "active" : ""
            }`}
            role="menu"
          >
            <div className="dropdown-info">
              <span className="user-name">
                {isLoggedIn && user 
                  ? (user.username.includes("@") ? user.username.split("@")[0] : user.username)
                  : "Guest User"}
              </span>
              <span className="user-email">{isLoggedIn && user ? user.email : "Guest@trailtales.com"}</span>
            </div>
            <hr />
            <button
              className="dropdown-item"
              onClick={() => {
                setProfileDropdownOpen(false);
                setProfileModalOpen(true);
              }}
              role="menuitem"
            >
              <i className="ph ph-user"></i> My Profile
            </button>
            <button 
              className="dropdown-item"
              onClick={(e: any) => {
                e.preventDefault();
                alert("Settings feature coming soon!");
              }}
              role="menuitem"
            >
              <i className="ph ph-gear"></i> Settings
            </button>
            <hr />
            {isLoggedIn && (
              <button 
                className="dropdown-item logout-link" 
                onClick={(e: any) => {
                  e.preventDefault();
                  handleLogout();
                }}
                role="menuitem"
              >
                <i className="ph ph-sign-out"></i> Log Out
              </button>
            )}
            {isLoggedIn && (
              <button 
                className="dropdown-item delete-profile-link" 
                onClick={(e: any) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                  setProfileDropdownOpen(false);
                }}
                role="menuitem"
              >
                <i className="ph ph-trash"></i> Delete Profile
              </button>
            )}
          </div>
        </div>
      </div>
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          try {
            const res = await api.delete("/profile");
            if (res.status === 200) {
              handleToast("Profile Deleted", "Your profile has been successfully deleted.", "success");
              handleLogout();
            } else {
              handleToast("Error", "Failed to delete profile. Please try again.", "error");
            }
          } catch (err) {
            console.error("Error deleting profile:", err);
            handleToast("Error", "An unexpected error occurred while deleting your profile.", "error");
          } finally {
            setShowDeleteModal(false);
          }
        }}
        title="Delete Profile?"
        message="Are you sure you want to delete your profile? This will permanently delete all your memories, messages, and friend requests. This action cannot be undone."
      />
    </nav>
  );
};

export default Navbar;

