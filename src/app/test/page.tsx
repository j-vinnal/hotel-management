'use client';

import styles from '@/app/Home.module.css';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';

import hotelImage from '../../../public/images/Hotel.avif';

const TestPage = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const headerHeight = document.querySelector('.header')?.clientHeight || 0;
    setIsFixed(window.scrollY > headerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Header */}
      <header
        className={`header d-flex justify-content-between align-items-center`} style={{position: 'sticky', top: 0, zIndex: 1000}}>
        <div className='hotel-name'>Hotel X</div>
        <div className='welcome-section d-flex align-items-center'>
          <span>Hello, John Doe</span>
          <button className='profile-button btn btn-primary rounded-circle ms-2'>
            J
          </button>
        </div>
      </header>

      {/* Main Image and Search Bar */}
      <div className='position-relative'>
        <Image
          src={hotelImage.src}
          alt='Hotel Image'
          layout='responsive'
          width={1600}
          height={450}
          className='main-image'
        />
        <div
          id='searchBar'
          className= {`${styles.searchBar} ${isFixed ? styles.fixed : ''} d-flex bg-white shadow-lg rounded p-3 `}>
          <Form.Select className='me-2'>
            <option>Guests: 1</option>
            <option value='2'>Guests: 2</option>
            <option value='3'>Guests: 3</option>
          </Form.Select>
          <FormControl
            type='date'
            className='me-2'
            placeholder='Check-in Date'
          />
          <FormControl
            type='date'
            className='me-2'
            placeholder='Check-out Date'
          />
          <Button variant='dark' className='me-2'>
            Search
          </Button>
          <Button variant='outline-dark'>Clear</Button>
        </div>
      </div>

      {/* Rooms Section */}
      <Container className='rooms-container mt-5'>
        <Row>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room1.jpg'
                alt='Room 1'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Luxury Room</Card.Title>
                <Card.Text>
                  A spacious room with a beautiful view of the ocean.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room2.jpg'
                alt='Room 2'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Deluxe Room</Card.Title>
                <Card.Text>
                  A modern room with all the amenities you need for a
                  comfortable stay.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room3.jpg'
                alt='Room 3'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Standard Room</Card.Title>
                <Card.Text>
                  A cozy room perfect for a short stay or a budget-friendly
                  trip.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room1.jpg'
                alt='Room 1'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Luxury Room</Card.Title>
                <Card.Text>
                  A spacious room with a beautiful view of the ocean.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room2.jpg'
                alt='Room 2'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Deluxe Room</Card.Title>
                <Card.Text>
                  A modern room with all the amenities you need for a
                  comfortable stay.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room3.jpg'
                alt='Room 3'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Standard Room</Card.Title>
                <Card.Text>
                  A cozy room perfect for a short stay or a budget-friendly
                  trip.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room1.jpg'
                alt='Room 1'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Luxury Room</Card.Title>
                <Card.Text>
                  A spacious room with a beautiful view of the ocean.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room2.jpg'
                alt='Room 2'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Deluxe Room</Card.Title>
                <Card.Text>
                  A modern room with all the amenities you need for a
                  comfortable stay.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='room-card'>
              <Image
                src='/room3.jpg'
                alt='Room 3'
                layout='responsive'
                width={600}
                height={400}
              />
              <Card.Body>
                <Card.Title>Standard Room</Card.Title>
                <Card.Text>
                  A cozy room perfect for a short stay or a budget-friendly
                  trip.
                </Card.Text>
                <Button variant='primary'>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestPage;
