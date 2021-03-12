import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'


function App() {
  return (
    <div className="App">
      <img src={logo} style={{ maxWidth: '10%', margin: '0.1rem' }} alt="logo" />
      <h1 style={{ display: 'inline', fontSize: '3.5rem', color: 'navy' }}>Say Hello To Your POTLUCK PLANNER</h1>
      <h2 style={{ display: 'inline', fontSize: '2.5rem', color: 'navy' }}>Let's Start Cooking</h2>
      <Container>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="First and Last Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Example@email.com" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">Register Now!</Button>
      </Form>
      </Container>
      <h3 style={{ display: 'inline', fontSize: '2.5rem', color: 'navy' }}>Already a member?</h3>
      <h3 style={{ display: 'inline', fontSize: '2.5rem', color: 'navy', fontWeight: 'bold' }}>LOG IN HERE</h3>
    </div>
  );
}

export default App;
