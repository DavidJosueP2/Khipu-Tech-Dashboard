import { Link, NavLink } from "react-router-dom";

import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { BRAND, NAV_ITEMS } from "@/data/platform";

export function TopNav() {
  return (
    <nav aria-label="Navegación principal" className="floating-nav">
      <div className="editorial-container floating-nav__inner">
        <Link
          to="/"
          aria-label={"Inicio — " + BRAND.product}
          className="floating-nav__brand"
        >
          <span>
            <strong>Khipu</strong>
            <EditorialSerif optical="display">Tech.</EditorialSerif>
          </span>
        </Link>

        <ul className="floating-nav__list">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.id}>
              <NavLink to={item.path} end className="floating-nav__link">
                {item.label}
                {index < NAV_ITEMS.length - 1 && <span aria-hidden="true">,</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
