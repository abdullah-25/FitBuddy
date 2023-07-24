import profilepic from "../../assets/images/profile.jpg";
import logo from "../../assets/logo/logo.svg";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="header__top">
        <img src={profilepic} className="header__profile" />
        <img src={logo} className="header__logoheader" />
      </div>
      <div className="header__links">
        <a className="header__links--dashboard">Dashboard</a>
        <Link to="/user/workout">
          <a className="header__links--workout">Workout</a>
        </Link>
      </div>
    </div>
  );
}
