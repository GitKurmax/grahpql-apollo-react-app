import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';


import CheckoutPage from './checkout.component';

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_TOTAL = gql`
  {
    total @client
  }
`;

const CheckoutPageContainer = ({total:{total}, cartItems:{cartItems}}) => {
  return <CheckoutPage total={total}  cartItems={cartItems}/>
}

export default flowRight([
  graphql(GET_TOTAL, {name: 'total'}),
  graphql(GET_CART_ITEMS, {name: 'cartItems'})
])
(CheckoutPageContainer);