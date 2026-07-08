import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

const hasEmbeddedMode = (search: string) =>
  new URLSearchParams(search).get('mode') === 'embed';

const isEmbeddedMode = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const hashQueryIndex = window.location.hash.indexOf('?');
  const hashQuery =
    hashQueryIndex > -1 ? window.location.hash.slice(hashQueryIndex + 1) : '';

  return hasEmbeddedMode(window.location.search) || hasEmbeddedMode(hashQuery);
};

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const embedded = isEmbeddedMode();

  const handleBurgerClick = () => {
    setMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {!embedded && <Header onBurgerClick={handleBurgerClick} />}

      <div className="layout-body">
        {!embedded && <Sidebar />} {/* Hidden on mobile via CSS */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {!embedded && mobileMenuOpen && (
        <MobileMenu onClose={handleMenuClose} />
      )}
    </div>
  );
}
