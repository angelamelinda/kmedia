import React, { Component } from 'react';
import axios from 'axios';
import Posts from '../../components/Posts';
import { Link } from "react-router-dom";

class DetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: [],
      userPost:[],
      commentPost:[],
      userAlbum:[],
      userAlbumPhoto:[],
      userPhoto:[],
    }
    this.refreshUserAlbum = this.refreshUserAlbum.bind(this);
    this.refreshUserPhoto = this.refreshUserPhoto.bind(this);
  }
  componentWillMount() {
    this.refreshUserInformation();
    this.refreshUserPost();
    this.refreshUserAlbum();
  }
  refreshUserInformation(){
    let userUrl = "https://jsonplaceholder.typicode.com/users/"+this.props.match.params.id;
    return axios.get(userUrl).then ( res => {
      this.setState({
        userInformation: res.data
      })
    })
  }
  refreshUserPost(){
    let userPostUrl = "https://jsonplaceholder.typicode.com/posts?userId="+this.props.match.params.id;
    return axios.get(userPostUrl).then ( res => {
      this.setState({
        userPost: res.data
      })
    })
  }
  refreshUserPhoto(){
    let userPhotoUrl;
    this.state.userAlbum.map((album,id) => (
      userPhotoUrl = "https://jsonplaceholder.typicode.com/albums/"+album.id+"/photos",
      axios.get(userPhotoUrl).then ( res => {
        this.setState({
          userPhoto: res.data
        });
      })
    ));
  }
  refreshUserAlbum(){
    let userAlbumUrl = "https://jsonplaceholder.typicode.com/albums/";
    let userPhotoUrl;
    let count = 1;
    axios.get(userAlbumUrl).then ( res => {
      res.data.map((album,id) => (
        (album.userId == this.props.match.params.id) ? (
          userPhotoUrl = "https://jsonplaceholder.typicode.com/albums/"+album.id+"/photos",
          axios.get(userPhotoUrl).then ( res => {
            this.setState({
              userPhoto: res.data
            });
            count = 1;
            this.state.userPhoto.map((photo,id) => (
              (count == 1)?(
                this.setState({
                  userAlbumPhoto: [...this.state.userAlbumPhoto,photo]
                }),count++): ''
              ));
          }),
          this.setState({
            userAlbum: [...this.state.userAlbum, album]
          })
        ):""
      ))
    })
  }
  render() {
    return (
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
          <div className="col-md-4 col-12 order-md-2">
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
                  <div className="col-md-4 col-sm-6 col-12">
                    <Link to={"/albums/"+photo.albumId+"/photos"}>
                      <img key={id} src={photo.thumbnailUrl} className="img-fluid" alt=""/>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
          <div className="col-md-8 col-12 order-md-1">
            <Posts post={this.state.userPost}/>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailUser;
