import Audio from 'react-loader-spinner'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './components/Home'
import Cart from './components/Cart'
// import Header from './components/Header'
import MenuCard from './components/MenuCard'
import NotFound from './components/NotFound'
import camelCase from './camelCase'
import CartContext from './CartContext'
import './App.css'

// const {cartItems, addItemToCart, removeItemFromCart} = useContext(CartContext)

const appStates = ['Success', 'Fail', 'Loading']

const url = 'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const Loader = () => (
  <div className="main-container">
    <Audio
      height="80"
      width="80"
      radius="9"
      color="black"
      ariaLabel="loading"
      wrapperStyle={{border: 'solid'}}
      wrapperClass="loader-class"
    />
  </div>
)

const App = () => {
  const [pageState, setPageState] = useState(appStates[2])
  const [dataList, setData] = useState([])
  const [cartItems, setItemInCart] = useState([])
  const [currentSlabIndex, setCurrentSlab] = useState(0)

  console.log('cart items', cartItems)
  console.log('current slab index', currentSlabIndex)

  function addItemToCart(slabId, dishId) {
    console.log(slabId, dishId)
    setItemInCart(ps =>
      ps.map(slabItem => {
        if (slabItem.menu_category_id === slabId) {
          return {
            ...slabItem,
            category_dishes: slabItem.category_dishes.map(item => {
              if (item.dish_id === dishId) {
                console.log('slabId, dishId condition satisfied')
                return {...item, selectedQuantity: item.selectedQuantity + 1}
              }
              return item
            }),
          }
        }
        return slabItem
      }),
    )
  }

  function removeItemFromCart(slabId, dishId) {
    setItemInCart(ps =>
      ps.map(slabItem => {
        if (slabItem.menu_category_id === slabId) {
          return {
            ...slabItem,
            category_dishes: slabItem.category_dishes.map(item => {
              if (item.dish_id === dishId) {
                return {...item, selectedQuantity: item.selectedQuantity - 1}
              }
              return item
            }),
          }
        }
        return slabItem
      }),
    )
  }

  const fetchData = async () => {
    setPageState(appStates[2])
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      setData(data)
      const dataObj = camelCase(data[0])
      let {tableMenuList} = dataObj
      tableMenuList = tableMenuList.map(ele => ({
        ...ele,
        category_dishes: ele.category_dishes.map(obj => ({
          ...obj,
          selectedQuantity: 0,
        })),
      }))

      console.log('table menu list', tableMenuList)

      // const menuSlabs = tableMenuList.map(e => ({
      //   id: e.menu_category_id,
      //   categoryName: e.menu_category,
      // }))

      setItemInCart(tableMenuList)

      setPageState(appStates[0])
    } else {
      setPageState(appStates[1])
    }
  }

  const FailState = () => (
    <div className="main-container">
      <h1 className="heading">Something went wrong!!!</h1>
      <p className="para">Please try again...</p>
      <button
        type="button"
        aria-label="retry"
        className="retry-button"
        onClick={fetchData}
      >
        retry
      </button>
    </div>
  )

  const SuccessState = ({data}) => {
    // console.log(data)
    const dataObj = camelCase(data[0])
    // let {tableMenuList} = dataObj
    // tableMenuList = tableMenuList.map(ele => ({
    //   ...ele,
    //   category_dishes: ele.category_dishes.map(obj => ({
    //     ...obj,
    //     selectedQuantity: 0,
    //   })),
    // }))

    // console.log('table menu list', tableMenuList)

    // setItemInCart(tableMenuList)

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addItemToCart,
          removeItemFromCart,
          currentSlabIndex,
          setCurrentSlab,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home data={dataObj} />} />
            <Route path="/menucard" element={<MenuCard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  switch (pageState) {
    case appStates[0]:
      return <SuccessState data={dataList} />
    case appStates[1]:
      return <FailState />
    default:
      return <Loader />
  }
}
export default App
