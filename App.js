import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, {Component} from "react";
import Post from './components/Post'
import axios from 'axios'

Amplify.configure(awsconfig)

export default withAuthenticator(class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'test',
      message: 'test',
      postsArray:[]
    };

  }

  componentDidMount() { 
    axios
      .get('http://18.207.140.249/post/allpost')
      .then(response => {
        this.setState({postsArray: response.data})
      })
      .catch(error => {
        console.log(error)
        console.log('get error')
      })

  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      title: this.state.title,
      message: this.state.message
    }
    axios
    .post('http://18.207.140.249/post/create', data)
    .then(res=> console.log(res))
    .catch(err => console.log(err))

    this.componentDidMount()
  }

  handleInputChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <header className="App-header" row>
          <h1>Real Time Study Sessions</h1>
          <div className="Align-right">
            <AmplifySignOut/>
          </div>
        </header>

        <div className="Post-Header">
          <h2>What would you like to study?</h2>
        </div>

        <form onSubmit={this.handleSubmit} className="MakePost">
          <input name="title" placeholder="Title" 
            onChange={this.handleInputChange}></input>
          <br/>
          <textarea name="message" placeholder="message"
            onChange={this.handleInputChange}>
        </textarea>
         <br/>
         <button className="button" type="Submit">Create Post</button>
       </form>

        <div className="Posts-List"> 
          <h2>Active Sessions</h2>
          {
            this.state.postsArray.map((post, index)=> {
              return(
                
                <Post _id= {post._id} title= {post.title} message = {post.message} >

                </Post>
              )
            })
          }
        </div>
      </div>
    );
  }
})