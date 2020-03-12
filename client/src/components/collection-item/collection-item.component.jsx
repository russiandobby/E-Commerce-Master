import React from 'react';

import { connect } from 'react-redux';



import { addItem } from '../../redux/cart/cart.actions';



import {

  CollectionItemContainer,

  CollectionFooterContainer,

  AddButton,

  BackgroundImage,

  NameContainer,

  PriceContainer

} from './collection-styles.styles';



const CollectionItem = ({ item, addItem }) => {

  const { name, price, imageUrl } = item;



  return (

    <CollectionItemContainer>

      <BackgroundImage className='image' imageUrl={imageUrl} />

      <CollectionFooterContainer>

        <NameContainer>{name}</NameContainer>

        <PriceContainer>{price}</PriceContainer>

      </CollectionFooterContainer>

      <AddButton onClick={() => addItem(item)} inverted>

        Add to cart

      </AddButton>

    </CollectionItemContainer>

  );

};


const mapDispatchToProps = dispatch =>({
  // prop addItem that will take tiem as property and pass it onto our addItem action creator
  addItem: item => dispatch(addItem(item))
})


export default connect(null,mapDispatchToProps) (CollectionItem);
