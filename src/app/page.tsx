'use client';

import SearchBar from '@/components/SearchBar';
import { FaBed, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const HotelBooking = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const messages = [
    'Affordable Modern Rooms',
    'Affordable Design Rooms',
    'Affordable Seamless Rooms',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 140) {
        setIsSearchVisible(true);
      } else {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      beds: 2,
      price: 299,
      rating: 4.5,
      image:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      name: 'Executive Room',
      beds: 1,
      price: 199,
      rating: 4.2,
      image:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 3,
      name: 'Family Suite',
      beds: 3,
      price: 399,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  return (
    <div className="font-montserrat min-vh-100">
      <main>
        <section className="hero position-relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Hotel exterior"
            className="img-fluid w-100"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />


          <div
            className={`d-flex flex-column justify-content-center mx-auto search-bar position-absolute top-50 start-50 translate-middle w-75  ${isSearchVisible ? 'hidden' : 'visible'}`}>
            <div className="d-flex flex-column align-items-center mb-2">
              <h3
                className={`me-3 text-white ${isSearchVisible ? 'hidden' : 'visible'}`}
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                {messages[currentMessageIndex]}
              </h3>
            </div>
            <SearchBar />
          </div>


          
        </section>

        <div className="container py-5 mt-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {rooms.map((room) => (
              <div key={room.id} className="col">
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    height: '400px',
                    transition: 'transform 0.3s ease',
                  }}>
                  <img
                    src={room.image}
                    className="card-img-top"
                    alt={room.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text">
                      <FaBed className="text-secondary me-2" />
                      {room.beds} bed{room.beds > 1 ? 's' : ''}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h4">
                        ${room.price}
                        <small className="text-muted"> /night</small>
                      </span>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" />
                        <span>{room.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary mt-3 w-100">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelBooking;
