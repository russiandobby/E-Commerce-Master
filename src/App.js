import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

import './App.css';




class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state ={
  //     currentUser: null
  //   };
  // }

  // need to close connection when unmount
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    // as long as component mounted this connection to firebase is open
    // parameter is what the user state of the auth on firebase
   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     
      // createUserProfileDocument(user);
      // if return is not null
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        // will send back a snapshot of data stored in out database currently
        // get it from our document reference object, also lets us get properties
        userRef.onSnapshot(snapShot =>{
          // console.log(snapShot.data());
          setCurrentUser({
            
              id:snapShot.id,
              ...snapShot.data()
            
          });
          
        });
       
      }
      // otherwise we set user back to null when we sign out
      else{
        setCurrentUser(userAuth);
      }
      
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }




  render(){
    return (
      <div className="App">
        <Header/>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        {/* if we have anything in user stata aka someone loged in we want to redirect back to homepage */}
        <Route  exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'  />) : (<SingInAndSignUpPage/>)}  />
        </Switch>
      </div>
    );
  }

}
// need currentuser so we can know if we need to redirect
// distructure user reducer
const mapStateToProps = ({user}) =>({
  currentUser:user.currentUser
})

const mapDispatchToProps  = dispatch =>({
  // dispatch is way for redux to know that what object we passing it is an action object that i am gonna pass to every reducer
  // so we are dispatdching an object
  // propname
  setCurrentUser: user => dispatch(
    setCurrentUser(user)
  )
});

// App doesnt need state as it only sets it but doesnt use it in anyway
export default connect (mapStateToProps , mapDispatchToProps) (App);
