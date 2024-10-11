'use client';

import { useSearch } from '@/states/contexts/SearchContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Identity from './Identity';

export default function Header() {
  const {
    guests,
    setGuests,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
  } = useSearch();
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const isHomePage = pathname === '/';

    if (!isHomePage) {
      setIsSearchVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 140) {
        setIsSearchVisible(true);
      } else {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Set initial visibility based on scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Dependency on pathname

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <nav className="navbar py-3 navbar-expand-sm navbar-toggleable-sm navbar-light bg-white">
        <div className="container">
          <Link href="/" className="navbar-brand">
            Hotel X
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-center">
            <ul
              className={`navbar-nav flex-grow-1 search-container ${isSearchVisible ? 'visible' : 'hidden'}`}>
              <div
                className="d-flex justify-content-center mx-auto "
                style={{ zIndex: 20000, height: '70px', width: 'fit-content' }}>
                <div className="d-flex align-items-center h-100 rounded bg-white py-1 px-2 shadow bg-light">
                  {/* Dropdown for guest selection */}
                  <div className="me-2">
                    <select
                      className="form-select"
                      aria-label="Guests select"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      style={{ paddingLeft: '20px', fontSize: '20px' }}>
                      <option value="1">Guests: 1</option>
                      <option value="2">Guests: 2</option>
                      <option value="3">Guests: 3</option>
                    </select>
                  </div>

                  {/* Divider */}
                  <div className="mx-3 border-end border-secondary"></div>

                  {/* Check-in input */}
                  <div className="me-2" style={{ maxWidth: '300px' }}>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="checkin"
                        placeholder="DD.MM.YY"
                        value={checkinDate}
                        onChange={(e) => setCheckinDate(e.target.value)}
                      />
                      <label htmlFor="checkin">Check in</label>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-2 border-end border-secondary"></div>

                  {/* Check-out input */}
                  <div className="me-2">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="checkout"
                        placeholder="DD.MM.YY"
                        value={checkoutDate}
                        onChange={(e) => setCheckoutDate(e.target.value)}
                      />
                      <label htmlFor="checkout">Check out</label>
                    </div>
                  </div>

                  {/* Search button */}
                  <button className="btn btn-dark text-white ms-4">
                    Search
                  </button>
                </div>
              </div>
            </ul>
            <Identity />
          </div>
        </div>
      </nav>
    </header>
  );
}
