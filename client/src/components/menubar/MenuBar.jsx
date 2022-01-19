import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menubar = user ? (
    <Menu pointing secondary size="massive" color="blue">
      <Menu.Item name={user.email} active as={Link} to="/home" />
      <Menu.Menu position="right">
        <Menu.Item
          name="dashboard"
          active={activeItem === "dashboard"}
          onClick={handleItemClick}
          as={Link}
          to="/dashboard"
        />
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="blue">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
}

export default MenuBar;

// import React from "react";
// import { Segment, Menu, Button } from "semantic-ui-react";
// import { NavLink } from "react-router-dom";

// const MenuBar = () => {
//   return (
//     <div>
//       <Segment inverted>
//         <Menu inverted secondary>
//           <NavLink to="/">
//             <Menu.Item name="Home" />
//           </NavLink>
//           <Menu.Menu position="right">
//             <NavLink to="/login">
//               <Menu.Item name="Login" />
//             </NavLink>
//             <NavLink to="/register">
//               <Menu.Item name="Signup" />
//             </NavLink>
//           </Menu.Menu>
//         </Menu>
//       </Segment>
//     </div>
//   );
// };

// export default MenuBar;
