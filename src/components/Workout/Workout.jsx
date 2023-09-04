import {
  useControllableState,
  useDisclosure,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SaveBtn from "../SaveBtn/SaveBtn";


import DarkModeNavBar from "../../components/DarkModeNavBar/DarkModeNavBar";
import "./Workout.scss";
import Exercise from "../Exercise/Exercise";

const initialExerciseList = [];

export default function Workout({ user }) {
  const [startWorkoutBtnClick, setstartWorkoutBtnClick] =
    useControllableState(false);
  const [nameExcercise, setNameExcercise] = useControllableState("");
  const [displayExcercise, setDisplayExcercise] = useControllableState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [userID, setUserID] = useState(null);
  const apikey = "https://fitbuddy-abdullah-abc7cdf7ff34.herokuapp.com";

  const modal1 = useDisclosure();
  const modal2 = useDisclosure();

  const [exerciseList, setExerciseList] = useState(initialExerciseList);
  const [result, setResult] = useState([]);

  const exerciseOptions = Object.keys(result);
  const params = useParams();
  let { id } = params;

  const [selectedExercise, setSelectedExercise] = useState("");
  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  function handleNameExcercise(e) {
    const name = e.target.value;
    setNameExcercise(name);
  }

  function handleSavebtn() {
    setDisplayExcercise(!displayExcercise);
    setExerciseList([...exerciseList, nameExcercise]);
  }

  function SaveWorkout() {
    setstartWorkoutBtnClick(!startWorkoutBtnClick);
  }
  function discardWorkout() {
    alert("Do you want to discard your session?");
    setExerciseList([]);
  }
  function SaveWorkoutSession() {
    alert("Your Workout session is saved!!");
    handleResultObject(result);
    handleCheckIconClick();
  }

  function handleResultObject(result) {
  const updatedResult = { ...result };
  Object.keys(updatedResult).forEach(function (exercise) {
    const exerciseWeights = updatedResult[exercise].map(Number); // Convert strings to numbers
    const maxWeight = Math.max(...exerciseWeights);
    updatedResult[exercise] = maxWeight;
  });
  setResult(updatedResult);
  PostExercises(exerciseOptions, updatedResult); // Send the updated result
}

  function getUserId() {
    if (!!user) {
      const data = {
        user_name: user.email,
      };
      console.log("user?", !!user);
      console.log("user data: ", data);
      axios
        .post(`${apikey}/userid`, data)
        .then((resp) => {
          console.log("data response fron userid post request: ", resp.data);
          setUserID(resp.data.id);
          console.log("state of user now: ", user);
          console.log("response is:", resp.data.id);
        })
        .catch((err) => {
          console.log("error is: ", err);
        });
    }
  }

  useEffect(() => {
    getUserId();
  }, [user]);

  // useEffect(() => {
  //   if (userID) {
  //   }
  //   //move this function inside getUserID to pass in the correct ID
  // }, [selectedExercise, userID]);

  function PostMaxWeight(result) {
    Object.keys(result).forEach(function (key) {
      const findId = { users_id: userID, exercise_name: key };
      const max_weight = parseInt(result[key]);

      axios
        .put(`${apikey}/api/exercises/${userID}`, findId)
        .then((createResponse) => {
          // const { message } = createResponse.data;

          const data = createResponse.data;

          const objToSend = {
            exercises_id: data.exercises_id,
            max_weight: max_weight,
          };

          axios
            .post(`${apikey}/api/max`, objToSend)
            .then((response) => {
              console.log("Data sent to server:", response.data);
            })
            .catch((error) => {
              console.log(`Error sending data to server: ${error.message}`);
            });
        })
        .catch((error) => {
          console.log(`Error finding ID: ${error.message}`);
        });
    });
  }

  function PostExercises(exerciseOptions, result) {
    exerciseOptions.forEach((exercise) => {
      const exerciseObject = {
        users_id: userID,
        exercise_name: exercise,
      };

      console.log(exerciseObject);

      axios
        .post(`${apikey}/api/exercises`, exerciseObject)
        .then((createResponse) => {
          PostMaxWeight(result);
        })
        .catch((error) => {
          PostMaxWeight(result);
          console.log(
            `Error inserting exercise "${exercise}": ${error.message}`
          );
        });
    });
  }

  function handleCheckIconClick() {
    setShowSaveButton(!showSaveButton);
  }

  function handleAddExcercise() {
    return (
      <>
        <Button onClick={modal1.onOpen} colorScheme="teal" size="md">
          Add Exercise
        </Button>

        <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Exercise</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={() => {
                  modal2.onOpen();
                  modal1.onClose();
                }}
              >
                Create New
              </Button>
              <Button variant="ghost" onClick={modal1.onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Exercise</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="8px">Name:</Text>
              <Input
                value={nameExcercise}
                onChange={handleNameExcercise}
                size="sm"
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={modal2.onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  modal2.onClose();
                  handleSavebtn();
                }}
                variant="ghost"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <DarkModeNavBar />
      <div className="workout">
        <div className="workout__heading">Workout</div>
        <div className="workout__btns">
          {startWorkoutBtnClick ? (
            <Button
              onClick={() => {
                SaveWorkout();
                discardWorkout();
              }}
              colorScheme="teal"
              size="md"
              variant="outline"
              className="workout__btns--discard"
            >
              Discard
            </Button>
          ) : (
            <Button
              onClick={() => {
                SaveWorkout();
              }}
              colorScheme="teal"
              size="md"
            >
              Start Workout
            </Button>
          )}

          {startWorkoutBtnClick && handleAddExcercise()}
        </div>
        {showSaveButton && <SaveBtn SaveWorkoutSession={SaveWorkoutSession} />}
        <div className="workout__background">
          {exerciseList.map((item) => {
            return (
              <Exercise
                name={item}
                exerciseList={exerciseList}
                onCheckIconClick={handleCheckIconClick}
                SaveWorkoutSession={SaveWorkoutSession}
                result={result}
                setResult={setResult}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
