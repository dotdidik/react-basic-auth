import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      posts: [],
      anggota:[]
    };
  }
  

  componentDidMount() {
      axios.get('https://reduxblog.herokuapp.com/api/posts?key=didik')
        .then ( r => {
            this.setState({ posts:r.data });
            console.log('ini response server', r.data)
      });
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
          <NavbarBrand href="/">HOMEPAGE</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
              <NavItem>
                <Link to="/anggota"> Anggota </Link>
              </NavItem>
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
            <Container>
                <Row>
                    <Col className='d-flex'>
                        {
                            this.state.posts.map(post =>
                                <Col md='4' key={post.id}>
                                    <Card>
                                        <CardImg style={{maxHeight:'120px'}} 
                                        top width="100%" 
                                        src={post.categories}/>
                                        <CardBody>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardText>{post.content}</CardText>
                                        </CardBody>
                                    </Card>
                                </Col>    
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </section>
        <section>
          <hr/>
          <Container>
            <h1>Angoota</h1>
                <Row>
                    <Col className='d-flex'>
                        {
                            this.state.anggota.map(ang =>
                                <Col md='4' key={ang.id}>
                                    <Link to={`/${ang.id}`}>
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