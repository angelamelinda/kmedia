import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DetailAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumPhotos:[],
      detailAlbum:[],
      users:[],
    }
  }
  componentWillMount() {
    this.refreshAlbumPhoto();
    this.fetchDetailAlbum();
    this.fetchUser();
  }
  refreshAlbumPhoto(){
    let albumPhotoUrl = "https://jsonplaceholder.typicode.com"+this.props.location.pathname;
    return axios.get(albumPhotoUrl).then ( res => {
      this.setState({
        albumPhotos: res.data
      })
    })
  }
  fetchDetailAlbum() {
    let detailAlbumUrl;
    if(this.props.location.pathname.indexOf('photos')){
      detailAlbumUrl = "https://jsonplaceholder.typicode.com"+this.props.location.pathname.replace("photos","");
      return axios.get(detailAlbumUrl).then ( res => {
        this.setState({
          detailAlbum: res.data
        })
      })
    }
  }
  fetchUser() {
    let userUrl = "https://jsonplaceholder.typicode.com/users/";
    return axios.get(userUrl).then ( res => {
      this.setState({
        users: res.data
      })
    })
  }
  render() {
    return(
      <div className="page container pt-5 pb-5">
        <h3 className="color-red">Album {this.state.detailAlbum.title}</h3>
        <p className="border-bottom pb-3 mb-4">
          {
            this.state.users.map((user,id) => (
              (user.id == this.state.detailAlbum.userId) ?
                user.name : ''
            ))
          }
      </p>
        <div className="row no-gutters">
          {
            this.state.albumPhotos.map((photo,id) => (
              <div className="col-md-2 col-sm-3 col-4" key={id}>
                <Link to={"/photos/"+photo.id}>
                  <img src={photo.url} alt="" className="img-fluid"/>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default DetailAlbum;
