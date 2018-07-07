import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Posts extends Component {
  render() {
    return (
      <React.Fragment>
        {
          this.props.post.map((post,id) => (
            <div className="box-shadow-grey mb-3" key={id}>
              <div className="pt-3 pb-3 pl-3 pr-3 border-bottom">
                <p className="font-weight-bold mb-0">{post.title}</p>
                <p className="mb-0">{post.body}</p>
              </div>
              <div className="post-overview pt-2 pb-2 pl-3 pr-3">
                <Link to={"/comments/"+post.id}></Link>
              </div>
            </div>
          ))
        }
      </React.Fragment>
    )
  }
}

export default Posts;
