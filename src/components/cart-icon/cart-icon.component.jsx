import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';
import {ReactComponent as ShoppingIcon} from '../../assets/bag.svg';
import './cart-icon.styles.scss';


const CartIcon = ({toggleCartHidden,itemCount}) =>(
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);


const mapDispatchToProps  = dispatch =>({
  
  toggleCartHidden: ()=> dispatch(toggleCartHidden())
  });


const mapStateToProps = createStructuredSelector({
  // {cart:{cartItems}}
// we dont want to keep rerendering this component unless its necessary so use reselct lib
  // itemCount: cartItems.reduce((accumalatedQuantity,cartItem) => accumalatedQuantity + cartItem.quantity,0)
  itemCount:selectCartItemsCount
});

export default connect(mapStateToProps,mapDispatchToProps)  (CartIcon);
