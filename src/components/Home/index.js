import {useNavigate} from 'react-router-dom'
import './index.css'

function Home(props) {
  console.log(props)
  const navigate = useNavigate()
  const {data} = props
  const {restaurantName, restaurantImage} = data
  
  return (
    <div className="home-main-container">
      <div className="home-container">
        <h1 className="home-heading">
          *---- Wellcome to ----*
          <br />
          <span className="span-heading">{restaurantName}</span>
        </h1>
        <img
          src={restaurantImage}
          alt={restaurantName}
          className="restaurant-image"
        />
        <button
          className="menu-button"
          type="button"
          aria-label="Menu Cart button"
          onClick={() => {
            navigate('/menucard')
          }}
        >
          Food Menu
        </button>
      </div>
    </div>
  )
}

export default Home
