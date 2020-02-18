import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

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
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     
      // createUserProfileDocument(user);
      // if return is not null
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        // will send back a snapshot of data stored in out database currently
        // get it from our document reference object, also lets us get properties
        userRef.onSnapshot(snapShot =>{
          // console.log(snapShot.data());
          this.setState({
            currentUser:{
              id:snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
       
      }
      // otherwise we set user back to null when we sign out
      else{
        this.setState({
          currentUser:userAuth
        })
      }
      
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
