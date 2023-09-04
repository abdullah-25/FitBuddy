import logo from "../../assets/logo/logo.png";
import "../../components/GetStarted/GetStarted.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="container">
      <img src={logo} alt="logo" className="container__img" />
      <h1>Welcome to FitBuddy</h1>
      <p>Keep Track of Your Gym's Progress</p>
      <Link to="/signup">
        <Button colorScheme="teal" variant="solid" mt={10} mr={2}>
          Get Started
        </Button>
      </Link>
      <Link to="/signin">
        <Button colorScheme="teal" variant="outline" mt={10} mr={3}>
          Log In
        </Button>
      </Link>
    </div>
  );
}
