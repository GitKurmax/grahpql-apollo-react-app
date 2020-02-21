import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount, removeItemFromCart, recountTotal } from './cart.utils'

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [item]!
        RemoveItemFromCart(item: Item!): [item]!
    }

    extend type Item {
        quantity: int
    }
`

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

const GET_CART_ITEMS = gql`
    {
        cartItems  @client
    }
`

const GET_TOTAL = gql`
    {
        total  @client
    }
`

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }, _info) => {
            
            const data = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !data.cartHidden }
            });
            return data.cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }, _info) => {
            const data = cache.readQuery({
                query: GET_CART_ITEMS 
            });

            const newCartItems = addItemToCart(data.cartItems, item);
            const newTotal = recountTotal(newCartItems);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount: getCartItemCount(newCartItems) }
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems, total: newTotal }
            });

            cache.writeQuery({
                query: GET_TOTAL,
                data: {total: newTotal}
            });

            return newCartItems;
        },

        removeItemFromCart: (_root, { item }, { cache }, _info) => {
            const data = cache.readQuery({
                query: GET_CART_ITEMS 
            });

            const newCartItems = removeItemFromCart(data.cartItems, item);
            const newTotal = recountTotal(newCartItems);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount: getCartItemCount(newCartItems) }
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            cache.writeQuery({
                query: GET_TOTAL,
                data: {total: newTotal}
            });

            return newCartItems;
        },

        clearItem: (_root, { item }, { cache }, _info) => {
            
            const data = cache.readQuery({
                query: GET_CART_ITEMS 
            });

            const newCartItems = data.cartItems.filter(
                cartItem => cartItem.id !== item.id
              );

            const newTotal = recountTotal(newCartItems);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount: getCartItemCount(newCartItems) }
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            cache.writeQuery({
                query: GET_TOTAL,
                data: {total: newTotal}
            });

            return newCartItems;
        }
    } 
}