import {useContext} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const VegLogo = () => (
  <span className="logo-container veg">
    <span className="logo-circle veg-circle"> </span>
  </span>
)

const NonVegLogo = () => (
  <span className="logo-container nonveg">
    <span className="logo-circle nonveg-circle"> </span>
  </span>
)

export default ({itemDetails, currentSlab}) => {
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    selectedQuantity,
  } = itemDetails

  const {addItemToCart, removeItemFromCart} = useContext(CartContext)

  const itemCount = selectedQuantity

  const addButton = () => {
    // setCount(ps => ps + 1)
    addItemToCart(currentSlab.id, dishId)
  }
  const minusButton = () => {
    if (itemCount > 0) {
      // setCount(ps => ps - 1)
      removeItemFromCart(currentSlab.id, dishId)
    }
  }
  const dishprice = dishPrice?.toString().concat(' ', dishCurrency)
  return (
    <li className="menu-dish-item">
      <div className="dish-description-container">
        {dishType === 1 ? <NonVegLogo /> : <VegLogo />}
        <div className="menu-dish-details">
          <h2 className="dish-name">{dishName}</h2>
          <p className="dish-price">{dishprice}</p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability ? (
            <div className="dish-count-container">
              <button
                onClick={minusButton}
                className="control-buttons"
                type="button"
                aria-label="Minus button"
              >
                -
              </button>
              <p className="quantity">{itemCount}</p>
              <button
                onClick={addButton}
                className="control-buttons"
                type="button"
                aria-label="add button"
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available-tag">Not available</p>
          )}
          {addonCat.length > 0 && (
            <p className="customization-note">Customizations available</p>
          )}
        </div>
      </div>
      <p className="dish-calories">{dishCalories} calories</p>

      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}
