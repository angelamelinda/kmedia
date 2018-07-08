import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import { PostsProvider, PostsContext } from './providers/posts';

import Header from './components/Header';
import ListUser from './containers/ListUser';
import DetailUser from './containers/DetailUser';
import DetailAlbum from './containers/DetailAlbum';
import DetailPhotos from './containers/DetailPhotos';
import DetailPost from './containers/DetailPost';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <PostsProvider>
        <PostsContext.Consumer>
          { postsState =>
            <Router>
              <div className="App">
                <Header />
                <Switch>
                        <React.Fragment>
                          <Route path='/' component={ListUser} exact/>
                          <Route path="/users/:id" render={(routeProp) =>{
                            return <DetailUser posts={postsState.posts} searchByUser={postsState.searchByUser} addPost={postsState.addPost} match={routeProp.match}/>
                          }}/>
                          <Route path="/posts/:id" render={(routeProp) =>{
                            return <DetailPost posts={postsState.posts} searchByUser={postsState.searchByUser} deletePost={postsState.deletePost} updatePost={postsState.updatePost} searchById={postsState.searchById} match={routeProp.match}/>
                          }}/>
                          <Route path="/albums/:id/photos" component={DetailAlbum}/>
                          <Route path="/photos/:id" component={DetailPhotos}/>
                        </React.Fragment>
                </Switch>
                </div>
            </Router>
          }
        </PostsContext.Consumer>
      </PostsProvider>
    );
  }
}

export default App;
