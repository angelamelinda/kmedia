import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:{},
      isCommentFetched:false,
      isFetching: false
    }
    this.fetchComment = this.fetchComment.bind(this);
  }

  componentDidUpdate() {
    if(this.props.post.length > 0 && !this.state.isCommentFetched && !this.state.isFetching)
      this.fetchComment();
  }

  fetchComment() {
      this.setState({
        isFetching: true
      });
      let userCommentUrl;
      this.props.post.map((post,id) => {
        userCommentUrl = "https://jsonplaceholder.typicode.com/post/"+post.id+"/comments?_limit=3";
        axios.get(userCommentUrl).then( resp => {
          let newComment = this.state.comment;
          if(this.state.comment[post.id] === undefined){
            newComment[post.id] = resp.data;
          }
          this.setState({
            comment: newComment,
            isCommentFetched: true,
            isFetching: false
          });
        });
      })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.post.map((post,id) => (
            <div className="box-shadow-grey mb-3" key={id}>
              <Link to={"/posts/"+post.id} className="remove-underline">
                <div className="pt-3 pb-3 pl-3 pr-3 border-bottom">
                  <p className="font-weight-bold mb-0 color-red">{post.title}</p>
                  <p className="mb-0 color-black">{post.body}</p>
                </div>
              </Link>
              <div className="post-overview pb-3">
                  { this.state.comment[post.id] != undefined &&
                    <ul className="list-unstyled border-bottom mb-3  pt-3 pb-3 pl-3 pr-3">
                      { this.state.comment[post.id].map(comment=>(
                        <li>
                          <span className="font-weight-bold">{comment.email} said</span> {comment.body}
                        </li>
                      ))}
                    </ul>
                  }
                  <Link to={"/posts/"+post.id} className="remove-underline text-center d-block color-blue-sea color-red-hover">See More</Link>
              </div>
            </div>
          ))
        }
      </React.Fragment>
    )
  }
}

export default Posts;
