import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth} from './firebase/firebase.utils';

import './App.css';




class App extends React.Component {
  constructor(){
    super();
    this.state ={
      currentUser: null
    };
  }

  // need to close connection when unmount
  unsubscribeFromAuth = null;

  componentDidMount(){
    // as long as component mounted this connection to firebase is open
   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user})
      console.log(user);
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }




  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  path='/signin' component={SingInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }

}

export default App;
