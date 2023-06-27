import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './images/landing-page-img.jpg';
import bar from './images/bar.jpg';
import line from './images/line.jpg';
import map from './images/map.jpg';
import NavBar from '../../components/navigation/navigation';
// import { Link } from 'react-router-dom';

function home() {
  return (
    <>
      <NavBar />
      <Container fluid className='w-100' style={{ marginTop: '7%' }}>
        <Row>
          <Container fluid style={{ padding: '5%', background: `url(${Background})` }}>
            <Container className='text-center text-white' >
              <Row>
                <h1>DIFFERENT GLOBAL ENERGY CONSUMPTION TYPES</h1>
              </Row>

              <Row className='text-center' style={{ marginTop: '5%' }}>
                <h5>Data Analytics by energy consumption</h5>
              </Row>

            </Container>
          </Container>
        </Row>

        <Container className='my-5'>
          <Row style={{ marginTop: '10%' }}>
            <Col className='text-center'>
              <a href='/bar' style={{ textDecoration: 'none' }}>
                <div className='text-black card' style={{ background: `url(${bar})` }} >
                  <h6 style={{ color: 'black' }}>BAR</h6>
                </div>
              </a>
            </Col>

            <Col className='text-center'>
              <a href='/line' style={{ textDecoration: 'none' }}>
                <div className='card' style={{ background: `url(${line})` }}>
                  <h6 style={{ color: 'black' }}>LINE</h6>
                </div>
              </a>
            </Col>

            <Col className='text-center'>
              <a href='/map' style={{ textDecoration: 'none' }}>
                <div className='text-black card' style={{ background: `url(${map})`, backgroundSize: 'cover' }}>
                  <h6 style={{ color: 'black' }}>MAP</h6>
                </div>
              </a>
            </Col>
          </Row>

        </Container>

        <Container fluid className='text-center p-5' >

        </Container>

      </Container>
    </>
  )
}

export default home
