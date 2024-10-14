'use client';

import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Identity from './Identity';
import { useHotel } from '@/states/contexts/HotelContext';
import { UserContext } from '@/states/contexts/UserContext';


export default function Header() {
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { hotelName } = useHotel();
  const { user } = useContext(UserContext)!;


useEffect(() => {
  console.log('user', JSON.stringify(user, null, 2));
}, [user]);

  useEffect(() => {
  
    const isHomePage = pathname === '/';
    if (!isHomePage) {
      setIsSearchVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 120) {
        setIsSearchVisible(true);
      } else {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <nav className="navbar py-3 navbar-expand-sm navbar-toggleable-sm navbar-light bg-white">
        <div className="container">
          <Link href="/" className="navbar-brand">
            {hotelName || 'Hotel X'}
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
                <SearchBar />
              </div>
            </ul>
            <Identity />
          </div>
        </div>
      </nav>
    </header>
  );
}


