import React, { Component } from 'react';
import axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import  _ from 'lodash';

import Posts from '../../components/Posts';

class DetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: [],
      userPost:[],
      commentPost:[],
      userAlbumPhoto:[],
      isUserLoaded : false
    }
    this.refreshUserAlbum = this.refreshUserAlbum.bind(this);
    this.addPost = this.addPost.bind(this);
  }
  componentWillMount() {
    this.refreshUserInformation();
    this.refreshUserPost();
    this.refreshUserAlbum();
  }

  addPost(e) {
    e.preventDefault();
    var new_post = {
      'title': this.input_subject_post.value,
      'body':this.input_body_post.value,
      'userId':this.props.match.params.id
    }
    if(new_post.title == '' || new_post.body == '') {
      alert('Please fill correctly');
    } else {
      this.props.addPost(new_post);
    }
  }
  refreshUserInformation(){
    let userUrl = "https://jsonplaceholder.typicode.com/users/"+this.props.match.params.id;
    axios.get(userUrl).then ( res => {
      this.setState({
        userInformation: res.data,
        isUserLoaded : true
      })
    }).catch((error)=>{
      this.setState({
        userInformation: {},
        isUserLoaded : true
      })
    })
  }

  refreshUserPost(){

  }
  refreshUserAlbum(){
    let userAlbumUrl = "https://jsonplaceholder.typicode.com/albums?userId="+this.props.match.params.id;
    let userPhotoUrl;
    axios.get(userAlbumUrl).then ( res => {
      res.data.map((album,id) => {
          userPhotoUrl = "https://jsonplaceholder.typicode.com/albums/"+album.id+"/photos?_limit=1";
          axios.get(userPhotoUrl).then ( resp => {
            this.setState({
              userAlbumPhoto: [...this.state.userAlbumPhoto,...resp.data]
            });
          });
      })
    })
  }

  render() {
    return (
      <React.Fragment>
          { console.log(_.isEmpty(this.state.userInformation), this.state.isUserLoaded) , this.state.isUserLoaded && _.isEmpty(this.state.userInformation) ?
            <Redirect to={"/"}></Redirect>:
          <div className="page container pt-5 pb-5">
            <div className="d-flex mb-4 align-items-end">
              <div className="user-image">
                <div className="image background-color-blue-sea rounded-circle">
                  <img src={"https://api.adorable.io/avatars/100/"+this.state.userInformation.name+".png"} alt="" className="img-fluid"/>
                </div>
              </div>
              <div className="pl-3"><h2 className="color-blue-sea mb-0">{this.state.userInformation.name}</h2> <p className="color-red font-weight-bold mb-0">({this.state.userInformation.username})</p></div>
            </div>
            <div className="row">
              <div className="col-md-4 col-12 order-md-2 mb-3 mb-md-0">
                <div className="box-shadow-grey mb-3">
                  <h4 className="background-color-blue-sea color-white border-bottom pt-3 pb-3 pl-3 pr-3">Intro</h4>
                  <div className="user-info pt-3 pb-3 pl-3 pr-3">
                    <p className="font-weight-bold mb-0 color-red">Email</p>
                    <p className="mb-3">{this.state.userInformation.email}</p>
                    <p className="font-weight-bold mb-0 color-red">Phone</p>
                    <p className="mb-3">{this.state.userInformation.phone}</p>
                    <p className="font-weight-bold mb-0 color-red">Website</p>
                    <p className="mb-3">{this.state.userInformation.website}</p>
                    <p className="font-weight-bold mb-0 color-red">City</p>
                    <p className="mb-3">{this.state.userInformation.address !== undefined ? this.state.userInformation.address.city : "-"}</p>
                  </div>
                </div>
                <div className="box-shadow-grey">
                  <h4 className="background-color-blue-sea color-white border-bottom pt-3 pb-3 pl-3 pr-3 mb-0">Albums</h4>
                  <div className="row no-gutters">
                    {this.state.userAlbumPhoto.map((photo,id)=>(
                      <div className="col-md-4 col-sm-3 col-4">
                        <Link to={"/albums/"+photo.albumId+"/photos"}>
                          <img key={id} src={photo.thumbnailUrl} className="img-fluid" alt=""/>
                        </Link>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
              <div className="col-md-8 col-12 order-md-1">
                <div className="box-shadow-grey mb-3 pt-3 pl-3 pr-3 pb-3">
                  <form onSubmit={this.addPost}>
                    <input type="text" placeholder="What is the subject?" className="w-100 mb-2 pl-2 pr-2" ref={(a) => this.input_subject_post = a}/>
                    <textarea placeholder="What do you think?" className="w-100 pl-2 pr-2" ref={(a) => this.input_body_post = a}/>
                    <div className="text-right">
                      <button type="submit" className="btn-add-post btn background-color-blue-sea color-white background-color-red-hover color-white w-100">Add Post</button>
                    </div>
                  </form>
                </div>
                <Posts post={this.props.searchByUser(this.props.match.params.id)}/>
              </div>
            </div>
          </div>

          }
      </React.Fragment>
    )
  }
}

export default DetailUser;
