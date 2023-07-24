import logo from "../../assets/logo/logo.png";
import "../../components/GetStarted/GetStarted.scss";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="container">
      <img src={logo} alt="logo" className="container__img" />
      <Link to="/signup">
        <Button colorScheme="teal" variant="solid">
          Get Started
        </Button>
        {/* <button style={{ backgroundColor: "#0d7377", color: "#FFFFFF" }}>
          Get Started
        </button> */}
      </Link>
    </div>
  );
}
