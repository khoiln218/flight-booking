import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
    fullName?: string;
    email?: string;
};

export default function Navbar() {
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

    const user: User = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    // đóng popup khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
            {/* LEFT */}
            <div
                style={styles.logo}
                onClick={() => navigate("/")}
            >
                ✈️ Flight Booking
            </div>

            {/* RIGHT */}
            <div style={styles.rightSection}>

                {/* Avatar */}
                <div
                    style={styles.avatarWrapper}
                    ref={popupRef}
                >
                    <div
                        style={styles.avatar}
                        onClick={() =>
                            setShowProfile(!showProfile)
                        }
                    >
                        {user?.fullName?.trim()
                            .split(" ")
                            .pop()?.charAt(0)?.toUpperCase() ||
                            "U"}
                    </div>

                    {/* POPUP */}
                    {showProfile && (
                        <div style={styles.popup}>
                            {/* User Info */}
                            <div style={styles.userSection}>
                                <div style={styles.popupAvatar}>
                                    {user?.fullName
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>

                                <div>
                                    <h4 style={styles.userName}>
                                        {user?.fullName || "User"}
                                    </h4>

                                    <p style={styles.userEmail}>
                                        {user?.email ||
                                            "example@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            {/* Menu */}
                            <div
                                style={styles.menuItem}
                                onClick={() => {
                                    navigate("/history");
                                    setShowProfile(false);
                                }}
                            >
                                📜 Booking History
                            </div>

                            <div
                                style={styles.menuItem}
                                onClick={() => {
                                    navigate("/profile");
                                    setShowProfile(false);
                                }}
                            >
                                👤 My Profile
                            </div>

                            <div
                                style={styles.logoutButton}
                                onClick={handleLogout}
                            >
                                🚪 Sign Out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

const styles: {
    [key: string]: React.CSSProperties;
} = {
    navbar: {
        height: "70px",
        backgroundColor: "#1976d2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
    },

    logo: {
        fontSize: "22px",
        fontWeight: "bold",
        cursor: "pointer",
    },

    rightSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },

    navButton: {
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: 500,
    },

    avatarWrapper: {
        position: "relative",
    },

    avatar: {
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#fff",
        color: "#1976d2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "18px",
    },

    popup: {
        position: "absolute",
        top: "55px",
        right: 0,
        width: "260px",
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
        zIndex: 999,
    },

    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "18px",
        borderBottom: "1px solid #eee",
    },

    popupAvatar: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#1976d2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "20px",
    },

    userName: {
        margin: 0,
        color: "#222",
        fontSize: "16px",
    },

    userEmail: {
        margin: "4px 0 0",
        color: "#777",
        fontSize: "13px",
    },

    menuItem: {
        padding: "14px 18px",
        cursor: "pointer",
        color: "#333",
        borderBottom: "1px solid #f1f1f1",
        transition: "0.2s",
    },

    logoutButton: {
        padding: "14px 18px",
        cursor: "pointer",
        color: "#d32f2f",
        fontWeight: "bold",
    },
};