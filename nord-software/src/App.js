import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import AddNew from "./AddNew";
import UserList from "./UserList";
import axios from "axios";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nextId: 0
    };
    this.getRandom();
  }
  
  getRandom(){
    let newUser = {};
    const amount = 20;
    const url = "https://randomuser.me/api";
    for (let i = 0; i < amount; i++){
      axios.get(url)
        .then(({data}) => {
          newUser.name = data.results[0].name.first + " " + data.results[0].name.last;
          newUser.email = data.results[0].email;
          newUser.number = data.results[0].cell;
          this.handleSave(newUser);
        });
    }
  }
  
  handleSave = (user) => {
    this.setState((prevState, props) => {
      const newUser = {...user, id: this.state.nextId};
      return {
        nextId: prevState.nextId + 1,
        users: [...this.state.users, newUser],
      };
    });
  }
  
  handleSort = (key) => {
    let newUsers;
    switch (key) {
      case 'name':
        newUsers = _.sortBy(this.state.users, "name");
        break;
      case "email":
        newUsers = _.sortBy(this.state.users, "email");
        break;      
      case "number":
        newUsers = _.sortBy(this.state.users, "number");
        break;      
      default:
        console.log("default sort?");
    }
    this.setState({users: newUsers});
  }
  
  handleEditUser = (user) => {
    this.setState((prevState, props) => {
      const newUsers = prevState.users;
      const index = _.findIndex(newUsers, {id: user.id});
      newUsers.splice(index, 1, user);
      
      return {
        users: newUsers
      };
    });
  }
  
  onDelete = (id) => {
    const users = this.state.users.filter(user => user.id !== id);
    this.setState({users});
  }
  
  render() {
    return (
      
      <div className="App">
        <div className="App-container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Nord Software</h1>
          </header>
          <div className="Content">
            <div id="content-title">
              <h2>List of participants</h2>
            </div>
            <AddNew onSave = {this.handleSave} />
            <UserList handleSort={this.handleSort} onEdit = {this.handleEditUser} onDelete={this.onDelete} users = {this.state.users} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
