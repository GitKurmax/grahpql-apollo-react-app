import React from 'react';

import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CheckoutItem from './checkout-item.component';

const ADD_ITEM = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const REMOVE_ITEM = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

const CLEAR_ITEM = gql`
  mutation ClearItem($item: Item!) {
    clearItem(item: $item) @client
  }
`;

const CheckoutItemContainer = ({cartItem, addItemToCart, removeItemFromCart, clearItem}) => (
  <CheckoutItem 
    cartItem={cartItem}
    addItem={item => addItemToCart({variables: {item}})}
    removeItem={item => removeItemFromCart({variables: {item}})}
    clearItem={item => clearItem({variables: {item}})}
/>
)

export default  flowRight([
    graphql(REMOVE_ITEM, {name: 'removeItemFromCart'}),
    graphql(ADD_ITEM, {name: 'addItemToCart'}),
    graphql(CLEAR_ITEM, {name: 'clearItem'})
])
(CheckoutItemContainer);