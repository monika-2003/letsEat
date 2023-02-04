import React from 'react'
import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, {id: action.id, name: action.name, price: action.price, quantity: action.quantity, size: action.size}]

      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1);
        return newArr;

      case "DROP":
        let emptyArr = [];
        return emptyArr;

      case "UPDATE":
        let arr = [...state]
        arr.find((food, idx)=> {
          if(food.id === action.id) {
            console.log("UPDATE",typeof( action.quantity + food.quantity));
            arr[idx] = {...food, quantity: parseInt(action.quantity), price: action.price}
          }
          return arr
        })
        return arr
        
    default :
      console.log("ERROR");
  }
}

export function CartProvider({children}) {

    const[state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value = {dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);