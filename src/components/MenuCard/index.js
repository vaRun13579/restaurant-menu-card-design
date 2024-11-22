import {useContext} from 'react'
import Header from '../Header'
import camelCase from '../../camelCase'
import MenuItem from '../MenuItem'
import CartContext from '../../CartContext'
import './index.css'

const SlabList = ({itemData, slabIndex, selectSlab, selected}) => {
  const {categoryName} = itemData
  // console.log(selected, itemData.id);

  return (
    <li className="slab-list-item">
      <button
        className={`slab-button ${selected ? 'selected-slab' : ''}`}
        type="button"
        aria-label={categoryName}
        onClick={() => {
          selectSlab(slabIndex)
        }}
      >
        {categoryName}
      </button>
    </li>
  )
}

export default () => {
  const {cartItems, currentSlabIndex, setCurrentSlab} = useContext(CartContext)

  const menuSlabs = cartItems.map(e => ({
    id: e.menu_category_id,
    categoryName: e.menu_category,
  }))

  // const [currentSlab, setSlab] = useState(menuSlabs[0])

  const currentSlab = menuSlabs[currentSlabIndex]

  const categoryDishList = cartItems
    .find(ele => ele.menu_category_id === currentSlab.id)
    .category_dishes.map(obj => camelCase(obj))

  console.log('category dishes', categoryDishList)

  return (
    <div className="main-menu-container">
      <Header />
      <ul className="slab-list-container">
        {menuSlabs.map((obj, index) => (
          <SlabList
            key={obj.id}
            selected={obj.id === currentSlab.id}
            itemData={obj}
            slabIndex={index}
            selectSlab={setCurrentSlab}
          />
        ))}
      </ul>
      <ul className="menu-items-list">
        {categoryDishList.map(item => (
          <MenuItem
            itemDetails={item}
            currentSlab={currentSlab}
            key={item.dishId}
          />
        ))}
      </ul>
    </div>
  )
}
