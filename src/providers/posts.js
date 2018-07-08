import React, { Component } from 'react';
import axios from 'axios';

const PostsContext = React.createContext();
class PostsProvider extends React.Component {
  constructor(props){
    super(props);

    this.addPost = this.addPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.searchById = this.searchById.bind(this);
    this.searchByUser = this.searchByUser.bind(this);
    this.fetchAllPosts = this.fetchAllPosts.bind(this);

    this.state ={
      posts:[],
      addPost: this.addPost,
      updatePost:this.updatePost,
      deletePost:this.deletePost,
      searchById:this.searchById,
      searchByUser:this.searchByUser
    };
  }

  componentWillMount(){
    this.fetchAllPosts();
  }

  fetchAllPosts(){
    let userPostUrl = "https://jsonplaceholder.typicode.com/posts";
    axios.get(userPostUrl).then ( res => {

      this.setState({
        posts:res.data
      });
    });
  }

  addPost (newPost) {
    let postUrl = "https://jsonplaceholder.typicode.com/posts";
    axios.post(postUrl, newPost).then ( res => {
      this.setState({
        posts: [...this.state.posts, res.data]
      });
    });
  }

  updatePost(newPost){
    let postUrl = "https://jsonplaceholder.typicode.com/posts/"+newPost.id;
    axios.patch(postUrl, newPost).then ( res => {
      let filtered =this.state.posts.filter((post) => {
        return post.id != res.data.id;
      });
      this.setState({
        posts: [ ...filtered, res.data]
      });
    });
  }

  deletePost(newPost){
    let postUrl = "https://jsonplaceholder.typicode.com/posts/"+newPost.id;
    axios.delete(postUrl).then( res => {
      let filtered =this.state.posts.filter((post) => {
        return post.id != newPost.id;
      });
      this.setState({
        posts: filtered
      });
    });
  }

  searchByUser(user_id){
    return this.state.posts.filter((post) => {
      return post.userId == user_id;
    });
  }

  searchById(post_id) {
    console.log(this.state.posts, post_id);
    return this.state.posts.filter((post) => {
      return post.id == post_id;
    });
  }

  render() {
    return (
      <PostsContext.Provider value={this.state}>
        { this.state.posts.length > 0 ?  this.props.children : "LOADING" }
      </PostsContext.Provider>
    )
  }
}

export{
  PostsContext, PostsProvider
}
