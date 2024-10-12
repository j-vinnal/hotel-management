'use client';

import SearchBar from '@/components/SearchBar';
import { RoomContext } from '@/states/contexts/RoomContext';
import { SearchContext } from '@/states/contexts/SearchContext';
import { useContext, useEffect, useState } from 'react';
import { FaBed, FaStar } from 'react-icons/fa';

const HotelBookingPage = () => {
  const { rooms, loading, error, fetchRooms } = useContext(RoomContext)!;
  const { startDate, endDate, guestCount } = useContext(SearchContext)!;

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const messages = [
    'Affordable Modern Rooms',
    'Affordable Design Rooms',
    'Affordable Seamless Rooms',
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [ratings, setRatings] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 120) {
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

  useEffect(() => {
    if (rooms.length > 0) {
      const initialRatings: { [key: string]: string } = {};
      rooms.forEach((room) => {
        initialRatings[room.id!] = (Math.random() * (5 - 3) + 3).toFixed(1);
      });
      setRatings(initialRatings);
    }
  }, [rooms]);

  useEffect(() => {
    if (error) return;
    fetchRooms({ guestCount, startDate, endDate });
  }, [fetchRooms, error]);

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
            className={`d-flex flex-column justify-content-center mx-auto search-bar position-absolute top-50 start-50 translate-middle w-75 ${isSearchVisible ? 'hidden' : 'visible'}`}
            style={{ zIndex: 1100 }}>
            <div className="d-flex flex-column align-items-center mb-2">
              <h3
                className={`me-3 text-white ${isSearchVisible ? 'hidden' : 'visible'}`}
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                {messages[currentMessageIndex]}
              </h3>
            </div>

            <div
              className="d-flex justify-content-center mx-auto"
              style={{  width: 'fit-content' }}>
              <SearchBar />
            </div>
          </div>
        </section>

        <div className="container py-5 mt-4">
          {error && <p className="text-danger">Error: {error}</p>}
          {!error && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {loading && <p>Loading rooms...</p>}
              {rooms.map((room) => (
                <div key={room.id} className="col">
                  <div
                    className="card h-100 shadow-sm"
                    style={{
                      height: '400px',
                      transition: 'transform 0.3s ease',
                    }}>
                    <img
                      src={room.imageUrl}
                      className="card-img-top"
                      alt={room.roomName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{room.roomName}</h5>
                      <p className="card-text mb-4" style={{ fontSize: '0.9em' }}>
                        Room {room.roomNumber}
                      </p>
                      <p className="card-text">
                        <FaBed className="text-secondary me-2" />
                        {room.bedCount} bed{room.bedCount > 1 ? 's' : ''}
                      </p>
                    
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h4">
                          ${room.price}
                          <small className="text-muted"> /night</small>
                        </span>
                        <div className="d-flex align-items-center">
                          <FaStar className="text-warning me-1" />
                          <span>{ratings[room.id!]}</span>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default HotelBookingPage;
