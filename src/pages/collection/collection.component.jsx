import React from "react";
import CollectionItem from '../../components/collection-item/collection-item.component';

import {connect} from 'react-redux';
import {selectCollection} from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({collection}) =>
{
    console.log(collection);
    return(
    // will return an object with categoryId field = to wha route we want like /hats or /jackets
    //match.params.collectionId
    
    <div className='category'>
        <h2>Collection Page </h2>
    </div>
);}

// ownProps props of the component we wrapping in our connect
// Need to pass state cause unline other selectors this one
// needs a part of the state depneding on url param
// selectCollection returns a function so we pass is state
const mapStateToProps = (state, ownProps)=>({
    collection:selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps) (CollectionPage);