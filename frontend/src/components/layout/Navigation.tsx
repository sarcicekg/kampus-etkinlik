// frontend/src/components/layout/Navigation.tsx
import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

function Navigation() {
  return (
    <nav className="menu" style={{ marginTop: "var(--bosluk-m)" }}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;