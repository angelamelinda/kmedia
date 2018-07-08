import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Modal } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'

class DetailPost extends Component {
  constructor(props) {
    super(props);
    let postdata = props.searchById(this.props.match.params.id);
    this.state = {
      post : postdata.length == 0 ? -1 : postdata[0],
      comments:[],
      modal: false,
      userId: postdata[0].userId,
      isUpdating: false
    }

    let userCommentUrl = "https://jsonplaceholder.typicode.com/post/"+this.props.match.params.id+"/comments";
    axios.get(userCommentUrl).then( resp => {
      this.setState({
        comments: resp.data
      });
    });
    this.saveComment = this.saveComment.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
   this.setState({
     modal: !this.state.modal
   });
 }

  componentDidUpdate(){
    let postdata = this.props.searchById(this.props.match.params.id);
    if( !_.isEqual(postdata[0],this.state.post) ){
        if(postdata.length == 0){
            this.setState({
                post:postdata[0],
            });
        } else {
            this.setState({
                post:postdata[0],
                userId:postdata[0].userId,
                isUpdating:false
            });
        }
    }
  }

  saveComment(e){
    e.preventDefault();
    let newcomment = {
      email: this.input_comment_email.value,
      body:this.input_comment_body.value,
      name: this.input_comment_name.value,
      postId: this.state.post.id
    }
    if(newcomment.email == '' || newcomment.body == '' || newcomment.name == '') {
      alert('Please fill correctly');
    } else {
      let userCommentUrl = "https://jsonplaceholder.typicode.com/comments";
      axios.post(userCommentUrl, newcomment).then( resp => {
        this.setState({
          comments: [...this.state.comments,resp.data]
        });
      });
      this.input_comment_email.value = '';
      this.input_comment_body.value = '';
      this.input_comment_name.value = '';
    }
  }

  updatePost(e){
    e.preventDefault();
    let newpost = {
      id: this.state.post.id,
      title: this.input_subject_post.value,
      body:this.input_body_post.value,
      userId: this.state.post.userId
    }
    this.props.updatePost(newpost);
    this.setState({
        isUpdating:true
    });
    this.toggle();
  }

  deletePost(e){
    e.preventDefault();
    let newpost = {
      id: this.state.post.id,
      title: this.state.title,
      body:this.state.body,
      userId: this.state.post.userId
    }
    this.props.deletePost(newpost);
  }

  render() {
    return(
      <div className="page container pt-5 pb-5">
          {this.state.isUpdating == true && <div className="loader d-flex align-items-center justify-content-center"><h2 className="color-white">Updating...</h2></div>}
            { this.state.post == -1 || this.state.post == undefined ?
              <Redirect to={"/users/"+this.state.userId} /> :
              <React.Fragment>
              <Link to={"/users/"+this.state.userId} className="remove-underline mb-3 d-inline-block color-blue-sea color-red-hover">Back</Link>
              <div className="box-shadow-grey mb-3">
                <div className="pt-3 pb-3 pl-3 pr-3 border-bottom">
                  <p className="font-weight-bold mb-0 color-red">{this.state.post.title}</p>
                  <p className="mb-2 color-black">{this.state.post.body}</p>
                  <button onClick={this.toggle} className="background-color-blue-sea border-0 background-color-red-hover color-white">Edit Post</button>
                  <button onClick={this.deletePost} className="background-color-red border-0 background-color-blue-sea-hover ml-2 color-white">Delete Post</button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <form onSubmit={this.updatePost} className="p-3">
                    <label className="font-weight-bold color-red">Subject</label>
                    <input ref={(a) => this.input_subject_post = a} type="text" value={this.state.post.title} className="w-100 mb-2"/>
                    <label className="font-weight-bold color-red">Body</label>
                    <textarea ref={(a) => this.input_body_post = a} cols="30" rows="10" className="w-100 mb-2">{this.state.post.body}</textarea>
                    <button type="submit" className="w-100 background-color-blue-sea background-color-red-hover color-white">Save Post</button>
                  </form>
                </Modal>
                <div className="post-overview pb-3">
                  { this.state.comments.length > 0 &&
                    <ul className="border-bottom pb-3 pl-3 pr-3 pt-3 mb-3 list-unstyled">
                      { this.state.comments.map(comment=>(
                        <li>
                          <span className="font-weight-bold">{comment.email} said</span> {comment.body}
                        </li>
                      ))}
                    </ul>
                  }
                  <form className="d-flex flex-wrap pl-3 pr-3" onSubmit={this.saveComment}>
                    <div className="d-flex w-100 mb-2 flex-wrap">
                      <input type="text" ref={(a) => this.input_comment_name = a} placeholder="Name" className="w-100 pl-2 pr-2 mb-2"/>
                      <input type="text" ref={(a) => this.input_comment_email = a} placeholder="Email" className="w-100 pl-2 pr-2"/>
                    </div>
                    <div className="d-flex w-100">
                      <input type="text" ref={(a) => this.input_comment_body = a} placeholder="Comments.." className="w-100 pl-2 pr-2"/>
                      <button className="background-color-blue-sea background-color-red-hover color-white border-0 pl-3 pr-3 cursor-pointer">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
              </React.Fragment>
            }
      </div>
    )
  }
}

export default DetailPost;
