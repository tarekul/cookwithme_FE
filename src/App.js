import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

//=====Container
import Navbar from './components/Logo'
import Home from './containers/Landing'
import SignInHome from './containers/SignInHome'
import CreateRecipe from './containers/CreateRecipe/Create'
import RecipePage from './containers/RecipePage/RecipePage'
import Footer from './components/Footer'
import Member from './components/Member'
import LoginSignup from './containers/LoginSignup/LoginSignup';
import Landing from './containers/Landing';
//====Context
import firebase from './firebase';
import AuthContext from './contexts/auth';

const Err = () => {
  return (<>
    <h2 className='headerSpace'>404 Missing Page.</h2>
  </>)
}
class App extends Component {
  state = {
    user: null,
  }
  
  componentDidMount = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user =>{
      if(user) {
        this.setState({user});
      }
      else {
        this.setState({user: null})
      }
    })
  }

  componentWillUnmount = () => {
    this.unsubsribe();
  }
  
  render() {
   return( <>
 <HashRouter>
          <Route path='/' component={Navbar} />
          <Route path='/' component={Member} />
          <Switch>
            <Route path='/' exact component={ Landing} />
            {/* <Route path = '/home' exact component = {SignInHome} /> */}
            <Route path='/login' exact component={LoginSignup} />
            <Route path='/create' exact component={CreateRecipe} />
            <Route path='/recipepage' exact component={RecipePage} />
            <Route component={Err} />
          </Switch>
          <Route path='/' component={Footer} />
      </HashRouter>
    </>);
  }
}


export default App;
