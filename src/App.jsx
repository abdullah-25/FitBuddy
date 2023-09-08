import GetStarted from "./components/GetStarted/GetStarted";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import * as React from "react";
import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Workout from "./components/Workout/Workout";
import { auth } from "./Firebase/Firebase"; // Import your firebase authentication module
import { Spinner, Stack } from "@chakra-ui/react";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const [user, setUser] = useState();
  // Check if a user is already authenticated (e.g., on page reload)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    // Unsubscribe the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <Skeleton />;
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route
            path="/signin"
            element={<SignIn user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<SignUp />} />
          {user ? (
            <Route path="/user" element={<UserProfile user={user} />} />
          ) : (
            <Route path="/user" element={<SignIn user={user} />} />
          )}
          <Route path="/user/workout/1" element={<Workout user={user} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
