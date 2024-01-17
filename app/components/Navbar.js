import IconDownArrow from "../icons/IconDownArrow"
import { UserAuth } from "../context/AuthContext"
import './Navbar.css'
import { useState } from "react"

const Navbar = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const {user, logOut} = UserAuth();
  const today = new Date();

  const handleMenuVisibility = () => {
    setMenuVisible(current => !current);
  }

  return (
    <div className="navbar">
      <div className="date">
        <h1>My Day</h1>
        <h3 className="date">{today.toDateString()}</h3>
      </div>
      <nav>
        <div className="nav-lg">
          {user.photoURL 
          ? <img src={user.photoURL} className="user-img" alt="profile photo" width={50} height={50}/>
          : <img src="/public/images/user.png" className="user-img" alt="profile photo" width={50} height={50}/>
          }
          <div className="user-info" style={{height: 'fit-content'}}>
            <p className="user-name">{user.displayName}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <button className="submenu-icon" onClick={handleMenuVisibility}>
            <IconDownArrow/>
          </button>
          {menuVisible && (
            <div className="collapse collapse-lg">
              <ul>
                <li className="list-item">Theme</li>
                <hr/>
                <li className="list-item" onClick={logOut}>Sign Out</li>
              </ul>
            </div>  
          )}
        </div>
        <div className="nav-sm">
          <button onClick={handleMenuVisibility} className="submenu-btn">
            {user.photoURL 
            ? <img src={user.photoURL} className="user-img" alt="profile photo" width={50} height={50}/>
            : <img src="/public/images/user.png" className="user-img" alt="profile photo" width={50} height={50}/>
            }
          </button>
          {menuVisible && (
            <div className="collapse">
              <ul>
                <li>
                  <p className="user-email">{user.email}</p>
                </li>
                <hr/>
                <li className="list-item">Theme</li>
                <li className="list-item" onClick={logOut}>Sign Out</li>
              </ul>
            </div>
          )}
        </div>
        {/* <div className="themes-box">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div> */}
      </nav>
    </div>
  )
}

export default Navbar;