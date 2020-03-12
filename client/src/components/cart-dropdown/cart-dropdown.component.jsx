import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {withRouter} from 'react-router-dom';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import './cart-dropdown.styles.scss';
// dont need to write mapdispatchtoprops, can pass it in 
const CartDropdown = ({cartItems,history , dispatch}) =>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
            cartItems.length ?    
            cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
            :
            <span className='empty-message'>Your Cart is Empty</span>
            }
        </div>
        <CustomButton onClick={()=>{
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }} >GO TO CHECKOUT</CustomButton>
    </div>
)

// {cart:{cartItems}}
const mapStateToProps = createStructuredSelector({
cartItems:selectCartItems
});

export default withRouter(connect(mapStateToProps) (CartDropdown));