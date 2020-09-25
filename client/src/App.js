import React,{useEffect,lazy,Suspense} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';


import {GlobalStyle} from './global.style';

import { selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(()=> import('./pages/homepage/homepage.component'));
const ShopPage = lazy(()=> import('./pages/shop/shop.component'));
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout.component'));

const Contact = lazy(()=> import('./pages/contact/contact.component'));

const SingInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));






const App =({checkUserSession,currentUser})=> {
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);


    return (
      <div className="App">
        <GlobalStyle />
        <Header/>
        <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
        <Route exact path='/' component={HomePage}/>
       
        <Route  path='/shop' component={ShopPage}/>
        <Route  exact path='/checkout' component={CheckoutPage}/>
        <Route  exact path='/contact' component={Contact}/>
        {/* if we have anything in user stata aka someone loged in we want to redirect back to homepage */}
        <Route  exact path='/signin' render={() => currentUser ? (<Redirect to='/'  />) : (<SingInAndSignUpPage/>)}  />
        </Suspense>
        </ErrorBoundary>
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
