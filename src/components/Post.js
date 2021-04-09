import "./Post.css";
import {Card,CardActionArea} from "@material-ui/core";

import React, { Component } from 'react'


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: props._id,
            title: props.title,
            message: props.message
        };
    }
    
    handleClick = (event) => {
        event.preventDefault()
        const data = this.state._id
        console.log(data)
    }

    render() {

        return (
            <div className="Post"> 
                <Card hoverable="true" onClick={this.handleClick}>
                    <CardActionArea>
                        <h1>{this.state.title}</h1>
                        <p1>{this.state.message}</p1>
                    </CardActionArea>
                </Card>
            </div>

        )
    }
}

export default Post