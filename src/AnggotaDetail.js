import React from 'react';
import axios from 'axios';

export default class AnggotaDetail extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            ang : {}
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;
        axios.get(`https://reduxblog.herokuapp.com/api/posts/${params.angId}?key=anggota`)
        .then(res => {
            this.setState({ ang:res.data });
            console.log('ini detail', res.data)
        })
    }

    render() {
        const {ang} = this.state
        return(
            <div>
                <h1>{ang.title}</h1>
                <img src={ang.categories} />
                <h4>{ang.content}</h4>
            </div>
        )
    }
}