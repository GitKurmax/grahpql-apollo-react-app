import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionItem from './collection-item.component';

const ADD_ITEM = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItemContainer = ({item}) => (
    <Mutation mutation={ADD_ITEM}>
        {
            addItemToCart => {
             return <CollectionItem addItem={item => addItemToCart({variables: {item}})} item={item} />}
        }
    </Mutation>
);

export default CollectionItemContainer;