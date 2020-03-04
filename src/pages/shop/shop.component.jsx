import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");
    // // get this data now
    // // when ever collection gets updated/changed we will get the snapshoot
    // collectionRef.onSnapshot(async snapshot => {
    //   // will need to transform data into right format and add missing pieces like route
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    //  Promise Style Note:we will only get new data when we remount our shop
    // collectionRef.get().then( snapshot => {

    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    // Fetch Pattern caan get objects but its extremely nested
    // fetch('https://firestore.googleapis.com/v1/projects/e-store-b69d6/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections));
  }

  render() {
    const { match, isCollectionFetching } = this.props;

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
          render={props => (
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
