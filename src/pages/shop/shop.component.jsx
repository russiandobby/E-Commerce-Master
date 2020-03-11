import React,{useEffect} from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionPageContainer from "../collection/collection.container";

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';



// const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);


const ShopPage =({ fetchCollectionsStart,match })=> {

  useEffect(()=>{
    fetchCollectionsStart();
  },[fetchCollectionsStart]);

  // componentDidMount() {
    
  //   fetchCollectionsStart();

  //   // const { updateCollections } = this.props;
  //   // const collectionRef = firestore.collection("collections");
  //   // // get this data now
  //   // // when ever collection gets updated/changed we will get the snapshoot
  //   // collectionRef.onSnapshot(async snapshot => {
  //   //   // will need to transform data into right format and add missing pieces like route
  //   //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   //   updateCollections(collectionsMap);
  //   //   this.setState({ loading: false });
  //   // });

  //   //  Promise Style Note:we will only get new data when we remount our shop
  //   // collectionRef.get().then( snapshot => {

  //   //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   //   updateCollections(collectionsMap);
  //   //   this.setState({ loading: false });
  //   // });

  //   // Fetch Pattern caan get objects but its extremely nested
  //   // fetch('https://firestore.googleapis.com/v1/projects/e-store-b69d6/databases/(default)/documents/collections')
  //   // .then(response => response.json())
  //   // .then(collections => console.log(collections));
  // }

  
    // const { match } = this.props;

    return (
      // match.path will give us /path
      // need /shop/:category
      <div className="shop-page">
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}

        {/* render takes a function whos paramateres are the the parameters that component will recieve, in our case we need location and match object */}
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }




const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
