import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React, {Component} from "react";


Amplify.configure(awsconfig)

export default withAuthenticator(class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'test',
      message: 'test',
      titleArray:[["How to use horizontal partitioning?","deal with problems when we try to use horizontal partitioning"],
      ["How to use vertical partitioning","deal with problems when we try to use vertical partitioning"]]
    };

  }



  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      title: this.state.title,
      message: this.state.message
    }
    this.state.titleArray.push([this.state.title,this.state.message])
    this.forceUpdate()
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
            <ul>
            {
                this.state.titleArray.map((item,index)=>{
                return <li>
                  <p>{item[0]}</p>
                  <p>{item[1]}</p>
                   <hr />
                </li>
                })
            }
        </ul> 
          }
        </div>
      </div>
    );
  }
})
