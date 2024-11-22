import {createContext} from 'react'

const CartContext = createContext()

// function CartItems({children}) {
//   const [cartItems, setItemInCart] = useState([])

//   function addItemToCart(slabId, dishId) {
//     setItemInCart(ps =>
//       ps.map(slabItem => {
//         if (slabItem.meny_category_id === slabId) {
//           return {
//             ...slabItem,
//             category_dishes: category_dishes.map(item => {
//               if (item.dish_id === dishId) {
//                 return {...item, selectedQuantity: item.selectedQuantity + 1}
//               }
//               return item
//             }),
//           }
//         }
//         return slabItem
//       }),
//     )
//   }

//   function removeItemFromCart(slabId, dishId) {
//     setItemInCart(ps =>
//       ps.map(slabItem => {
//         if (slabItem.meny_category_id === slabId) {
//           return {
//             ...slabItem,
//             category_dishes: category_dishes.map(item => {
//               if (item.dish_id === dishId) {
//                 return {...item, selectedQuantity: item.selectedQuantity - 1}
//               }
//               return item
//             }),
//           }
//         }
//         return slabItem
//       }),
//     )
//   }

//   return (
//     <CartContext.Provider
//       value={{cartItems, addItemToCart, removeItemFromCart}}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

export default CartContext
