import React, { Component } from 'react';
import axios from 'axios';

class DetailPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo:[],
      user:[],
      album:[]
    }
  }
  componentWillMount() {
    this.fetchDetailPhoto();
    this.fetchUser();
  }
  fetchDetailPhoto() {
    let albumPhotoUrl = "https://jsonplaceholder.typicode.com"+this.props.location.pathname;
    let albumUrl = "https://jsonplaceholder.typicode.com/albums";
    axios.get(albumPhotoUrl).then ( res => {
      this.setState({
        photo: res.data
      })
      axios.get(albumUrl).then ( res => {
        res.data.map((album,id) => (
          (this.state.photo.albumId == album.id) ? this.setState({album:album}) : ''
        ))
      })

    })
  }
  fetchUser() {
    let userUrl = "https://jsonplaceholder.typicode.com/users/";
    return axios.get(userUrl).then ( res => {
      this.setState({
        user: res.data
      })
    })
  }
  render() {
    return(
      <div className="page container pt-5 pb-5">
        <div className="row">
          <div className="col-md-6 col-12 order-md-2">
            <h3 className="color-red">{this.state.photo.title}</h3>
            <p><span className="">{this.state.album.title}</span> - <span className="color-blue-sea">
              {
                this.state.user.map((user,id) => (
                  (user.id == this.state.album.userId) ?
                    user.name : ''
                ))
              }
            </span></p>
          </div>
          <div className="col-md-6 col-12 order-md-1">
          <img src={this.state.photo.url} alt="" className="img-fluid"/></div>
        </div>
      </div>
    )
  }
}

export default DetailPhotos;
