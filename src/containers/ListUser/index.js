import React, { Component } from 'react';
import axios from 'axios';
import Users from '../../components/Users';

class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: []
    }
  }
  componentWillMount() {
    this.refreshListUser();
  }

  refreshListUser(){
    return axios.get(`https://jsonplaceholder.typicode.com/users`).then ( res => {
      this.setState({
        listUser: res.data
      })
    })
  }
  render() {
    return (
      <div className="page container pt-5 pb-5">
        <h3 className="color-red border-bottom pb-3 mb-4">List Users</h3>
        <div className="row">
            <Users listUser = {this.state.listUser} />
        </div>
      </div>
    )
  }
}

export default ListUser;
