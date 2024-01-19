import IconDownArrow from "../icons/IconDownArrow"
import { UserAuth } from "../context/AuthContext"
import { useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import './Navbar.scss'


const Navbar = () => {

  const [menuVisible, setMenuVisible] = useState(false);
  const {user, logOut} = UserAuth();
  const today = new Date();
  const {theme, setTheme} = useContext(ThemeContext);

  const handleMenuVisibility = () => {
    setMenuVisible(current => !current);
  }

  const themeHandler = (th) => {
    switch(th) {
      case 'light':
        console.log(th);
        setTheme(`light`);
        break;
      case 'dark':
        console.log(th);
        setTheme(`dark`);
        break;
      case 'bg-1':
        console.log(th);
        setTheme('bg-1');
        break;
      case 'bg-2':
        setTheme('bg-2');
        break;
      case 'bg-3':
        setTheme('bg-3');
        break;
      case 'bg-4':
        setTheme('bg-4');
        break;
      default:
        setTheme('light');
        break;
    };
  }
  

  // const themeHandler = (th) => {
  //   switch(theme){
  //     case 'light':
  //       console.log(th);
  //       setTheme('light');
  //       break;
  //     case 'dark':
  //       console.log(th);
  //       setTheme('dark');
  //       break;
  //     case 'bg-1':
  //       console.log(th);
  //       setTheme('bg-1');
  //       break;
  //     case 'bg-2':
  //       setTheme('bg-2');
  //       break;
  //     case 'bg-3':
  //       setTheme('bg-3');
  //       break;
  //     case 'bg-4':
  //       setTheme('bg-4');
  //       break;
  //     default:
  //       setTheme('light');
  //       break;
  //   }
  // }

  return (
    <div className="navbar">
      <div className="date">
        <h1>My Day</h1>
        <p className="date">{today.toDateString()}</p>
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
          <button className="submenu-icon" aria-label="submenu" onClick={handleMenuVisibility}>
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
          <button onClick={handleMenuVisibility} className="submenu-btn" aria-label="submenu">
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
        <div className="themes-box">
          <div className="theme-option dark" onClick={() => themeHandler('dark')}></div>
          <div className="theme-option light" onClick={() => themeHandler('light')}></div>
          <div className="theme-option bg-img1" onClick={() => themeHandler('bg-1')}></div>
          <div className="theme-option bg-img2" onClick={() => themeHandler('bg-2')}></div>
          <div className="theme-option bg-img3" onClick={() => themeHandler('bg-3')}></div>
          <div className="theme-option bg-img4" onClick={() => themeHandler('bg-4')}></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;