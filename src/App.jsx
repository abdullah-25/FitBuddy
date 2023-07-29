import GetStarted from "./components/GetStarted/GetStarted";
import SignUp from "./components/SignUp/SignUp";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Workout from "./components/Workout/Workout";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/workout/1" element={<Workout />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
