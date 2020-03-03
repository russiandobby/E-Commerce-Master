import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/DeerLogo.svg';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import {HeaderContainer,LogoContainer,OptionsContainer,OptionDiv,OptionLink} from './header.styles';

import './header.styles.scss';

const Header =({currentUser,hidden})=>(
    <HeaderContainer>
         <LogoContainer to='/'>
            <Logo className='logo' />
         </LogoContainer>
         <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
               currentUser ?
               <OptionDiv onClick={()=>auth.signOut()}>SIGN OUT</OptionDiv>
               :
               <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
         </OptionsContainer>
        { 
      //   if tru render nothing if not render the cart
         hidden ? null :
        <CartDropdown/>
        }
    </HeaderContainer>
);

// state is rootreducer top level
// we want rootreducer -> goes to userReducer -> and gets currentUser

// const mapStateToProps = state =>({
//    currentUser: state.user.currentUser
// })


const mapStateToProps = createStructuredSelector({
   currentUser:selectCurrentUser,
   hidden:selectCartHidden
});

export default connect(mapStateToProps)( Header);
