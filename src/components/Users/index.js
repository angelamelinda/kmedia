import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './style.scss';
class Users extends Component {
  render() {
    return (
      <React.Fragment>
          {
            this.props.listUser.map((user, id) => (
              <div className="col-md-4 col-sm-6 col-12 mb-4" key={id}>
                <Link to={"/users/"+user.id} className="d-flex flex-wrap remove-underline user">
                  <div className="image-wrapper w-100">
                    <div className="image background-color-blue-sea">
                      <img src={"https://api.adorable.io/avatars/100/"+user.name+".png"} alt="" className="img-fluid"/>
                    </div>
                  </div>
                  <div>
                    <p className="font-weight-bold mb-0 color-blue-sea">{user.username}</p>
                    <p className="color-dark-grey mb-0">{user.name}</p>
                  </div>
                </Link>
              </div>
            ))
          }
      </React.Fragment>
    )
  }
}

export default Users;
