import {IoCartOutline} from 'react-icons/io5'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../CartContext'
import './index.css'

const Header = () => {
  console.log('header called')
  const {cartItems} = useContext(CartContext)
  let itemsInCart = 0
  cartItems.forEach(dishItem => {
    dishItem.category_dishes.forEach(dish => {
      if (dish.selectedQuantity > 0) {
        itemsInCart += dish.selectedQuantity
      }
    })
  })
  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="site-name">UNI Resto Cafe</h1>
      </Link>
      <Link to="/cart">
        <div className="cart-name-bucket">
          <p className="cart-name">My Orders</p>
          <IoCartOutline height="15px" className="cart-logo" />
          <p className="items-count">{itemsInCart}</p>
        </div>
      </Link>
    </div>
  )
}

export default Header
