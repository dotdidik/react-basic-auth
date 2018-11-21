import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle } from 'reactstrap';

import { Link } from 'react-router-dom';
import axios from 'axios';

const API_GENRES = 'http://api-museek.herokuapp.com/genres';

export default class AnggotaAll extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      anggota:[]
    };
  }
  

  componentDidMount() {
      axios.get('https://reduxblog.herokuapp.com/api/posts?key=anggota')
        .then ( res => {
          this.setState({ anggota:res.data });
          console.log('ini anggota', res.data)
        })   
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log('ini dari state', this.state.anggota  )
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container>
          <NavbarBrand href="/">ANGGOTA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to='/login'> Login </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
        <section>
          <hr/>
          <Container>
            <h1>Angoota</h1>
                <Row>
                    <Col className='d-flex'>
                        {
                            this.state.anggota.map(ang =>
                                <Col md='4' key={ang.id}>
                                    <Link to={`/anggota/${ang.id}`}>
                                      <Card>
                                          <CardImg style={{maxHeight:'120px'}} 
                                          top width="100%" 
                                          src={ang.categories}/>
                                          <CardBody>
                                          <CardTitle>{ang.title}</CardTitle>
                                          <CardText>{ang.content}</CardText>
                                          </CardBody>
                                      </Card>
                                    </Link>
                                </Col>    
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </section>
      </div>
    );
  }
}