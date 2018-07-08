import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import ListUser from './containers/ListUser';
import DetailUser from './containers/DetailUser';
import DetailAlbum from './containers/DetailAlbum';
import DetailPhotos from './containers/DetailPhotos';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path='/' component={ListUser} exact/>
            <Route
              path="/users/:id" component={DetailUser}/>
            <Route
              path="/albums/:id/photos" component={DetailAlbum}/>
            <Route
              path="/photos/:id" component={DetailPhotos}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
