import logo from "../../assets/logo/logo.png";
import "../../components/GetStarted/GetStarted.scss";
import { Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="container">
      <div className="center-content">
        <div className="container__img">
          <img src={logo} alt="logo" className="container__img" />
        </div>
        <h1>Welcome to FitBuddy</h1>
        <p className="p">Keep Track of Your Gym's Progress</p>
      </div>
      <div className="container__btns">
        <div className="btn-wrapper">
          <Link to="/signup">
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
              width={"300px"}
              className="container__btns--btn"
              mb={5}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"teal.400"}
              color={"white"}
              _hover={{
                bg: "teal.500",
              }}
              width={"300px"}
              className="container__btns--btn"
              mb={10}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
