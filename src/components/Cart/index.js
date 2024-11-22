import {useContext} from 'react'
import CartContext from '../../CartContext'
import MenuItem from '../MenuItem'
import Header from '../Header'
import camelCase from '../../camelCase'
import './index.css'

function Cart() {
  const {cartItems} = useContext(CartContext)
  const cartList = []
  cartItems.forEach(dishCategory => {
    dishCategory.category_dishes.forEach(item => {
      if (item.selectedQuantity > 0) {
        cartList.push({
          ...camelCase(item),
          categoryId: dishCategory.menu_category_id,
        })
      }
    })
  })
  console.log('Items in cart are', cartList)
  return (
    <div className="cart-main-container">
      <Header />
      {cartList.length > 0 && (
        <ul className="cart-list-container">
          {cartList.map(item => (
            <MenuItem
              key={item.dishId}
              itemDetails={item}
              currentSlab={{id: item.categoryId}}
            />
          ))}
        </ul>
      )}
      {cartList.length === 0 && (
        <h1 className="no-items-tag">No items in Cart</h1>
      )}
    </div>
  )
}
export default Cart
