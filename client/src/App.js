import React,{useEffect} from 'react';
import styled from 'styled-components';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {GlobalStyle} from './global.style';

import { selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';






const App =({checkUserSession,currentUser})=> {
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);



  // constructor(){
  //   super();
  //   this.state ={
  //     currentUser: null
  //   };
  // }

  // need to close connection when unmount
 

  // componentDidMount(){
  //   checkUserSession();
  //   // as long as component mounted this connection to firebase is open
  //   // parameter is what the user state of the auth on firebase
  // //  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     
  // //     // createUserProfileDocument(user);
  // //     // if return is not null
  // //     if(userAuth){
  // //       const userRef = await createUserProfileDocument(userAuth);

  // //       // will send back a snapshot of data stored in out database currently
  // //       // get it from our document reference object, also lets us get properties
  // //       userRef.onSnapshot(snapShot =>{
  // //         // console.log(snapShot.data());
  // //         setCurrentUser({
            
  // //             id:snapShot.id,
  // //             ...snapShot.data()
            
  // //         });
          
  // //       });
       
  // //     }
  // //     // otherwise we set user back to null when we sign out
     
  // //       setCurrentUser(userAuth);
  // //       // we dont want to pass id or path so will need a new array
  // //       // addCollectionAndDocuments('collections',collectionArray.map(({title,items})=>({
  // //       //   title,
  // //       //   items
  // //       // })));   
  // //   })
  // }






    return (
      <div className="App">
        <GlobalStyle />
        <Header/>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  exact path='/checkout' component={CheckoutPage}/>
        {/* if we have anything in user stata aka someone loged in we want to redirect back to homepage */}
        <Route  exact path='/signin' render={() => currentUser ? (<Redirect to='/'  />) : (<SingInAndSignUpPage/>)}  />
        </Switch>
      </div>
    );
  }


// need currentuser so we can know if we need to redirect
// distructure user reducer
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  
})


const mapDispatchToProps = dispatch =>({
  checkUserSession:()=>dispatch(checkUserSession())
});

// App doesnt need state as it only sets it but doesnt use it in anyway
export default connect (mapStateToProps,mapDispatchToProps) (App);
