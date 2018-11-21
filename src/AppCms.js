import React from 'react';
import store from 'store';
import isLoggedIn from './helpers/is_logged_in';
import { Redirect } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { 
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Button,
    Row,
    Col,
    Table,
    Modal, 
    ModalHeader, 
    ModalBody, 
    Form,
    FormGroup
} from 'reactstrap';

import axios from 'axios'

export default class AppCms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            title: '',
            categories: '',
            content: '',
            modal: false,

        }
        this.toggle = this.toggle.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    
    handleTitleChange = event => {this.setState({ title: event.target.value })}
    handleCategoriesChange = event => {this.setState({ categories: event.target.value })}
    handleContentChange = event => {this.setState({ content: event.target.value })}
    
    handleSubmit = event => {
        event.preventDefault();
        
        axios.post('http://reduxblog.herokuapp.com/api/posts?key=didik',
            { title: this.state.title, categories: this.state.categories, content: this.state.content },)
            .then(response => {
                console.log(response);
                console.log(response.data);
                window.location.reload();
                alert('article was added')
            });
            
    }

    componentDidMount() {
        axios.get('http://reduxblog.herokuapp.com/api/posts?key=didik')
          .then ( response => {
              this.setState({ posts:response.data });
              console.log('ini response server', response.data)
          })
    }
    
    handleRemove = postId => {
            const posts = [...this.state.posts];
            axios.delete(`http://reduxblog.herokuapp.com/api/posts/${postId}?key=didik`)
                .then(res => {
                    console.log(res)
                    alert('removed');
                    this.setState({posts:posts});
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
            })
    }



    handleLogout = (e) => {
        store.remove('loggedIn');
        this.props.history.push('/login')
    }



    render() {
        if (!isLoggedIn()) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">DASHOBOARD</NavbarBrand>
                        <Nav className="ml-auto" navbar>

                        <NavItem>
                        <button onClick={this.handleLogout}>Logout</button>
                        </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                <Container>
                <Row>
                    {/* <Col className='d-flex'>
                        {
                            this.state.posts.map(post =>
                                <Col md='4' key={post.id}>
                                    <Card>
                                        <CardImg style={{maxHeight:'120px'}} top width="100%" src={post.categories} alt="Card image cap" />
                                            <CardBody>
                                            <CardTitle>{post.title}</CardTitle>
                                            <CardText>{post.content}</CardText>
                                            <Button onClick={(e) => this.handleRemove(post.id)} color="danger">Delete</Button>
                                        </CardBody>
                                    </Card>
                                </Col>    
                            )
                        }
                    </Col> */}
                    
                </Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Images</th>
                                <th>Content</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map((post, index) => 
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{post.title}</td>
                                            <td><img style={{maxWidth:'90px'}} src={post.categories} /></td>
                                            <td>{post.content}</td>
                                            <td><Button onClick={(e) => this.handleRemove(post.id)} color="danger">Delete</Button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Row>
                        <Col>
                        <div>
                            <Button color="warning" onClick={this.toggle}>Add data</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <label>
                                            Title: <input type='text' name='this.state.title' onChange={this.handleTitleChange} />
                                        </label>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Image URL: <input type='text' name='this.state.categories' onChange={this.handleCategoriesChange} />
                                        </label>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Content: <input type='text' name='this.state.content' onChange={this.handleContentChange} />
                                        </label>
                                    </FormGroup>
                                    <Button color="primary" type="submit">Add Data</Button>
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </Form>
                            </ModalBody>
                            </Modal>
                        </div> 
                        </Col>
                    </Row>
            </Container>
            </div>
        )
    }
}
