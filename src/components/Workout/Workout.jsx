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
      const maxWeight = Math.max(...updatedResult[exercise]);
      updatedResult[exercise] = maxWeight;
    });
    setResult(updatedResult);
    PostExercises(exerciseOptions, result);
  }

  function getUserId() {
    if (!!user) {
      const data = {
        user_name: user.email,
      };
      console.log("user?", !!user);
      axios
        .post("http://localhost:8080/userid", data)
        .then((resp) => {
          console.log(resp.data);
          setUserID(resp.data.id);
          console.log("response is:", resp.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getUserId();
  }, [user]);

  useEffect(() => {
    if (userID) {
    }
    //move this function inside getUserID to pass in the correct ID
  }, [selectedExercise, userID]);

  function PostMaxWeight(result) {
    Object.keys(result).forEach(function (key) {
      const findId = { users_id: userID, exercise_name: key };
      const max_weight = parseInt(result[key]);

      axios
        .put(`http://localhost:8080/api/exercises/${userID}`, findId)
        .then((createResponse) => {
          // const { message } = createResponse.data;
          console.log("Important!!!!", createResponse.data);
          const data = createResponse.data;

          const objToSend = {
            exercises_id: data.exercises_id,
            max_weight: max_weight,
          };
          console.log("Data to send to server:", objToSend);

          axios
            .post("http://localhost:8080/api/max", objToSend)
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

  // // Function to update the max weight in the backend
  // function updateWeight(exercises_id, max_weight) {
  //   return axios
  //     .post("http://localhost:8080/api/max", {
  //       exercises_id,
  //       max_weight,
  //     })
  //     .then((updateMaxWeightResponse) => {
  //       console.log("Max weight updated:", updateMaxWeightResponse.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error updating max weight:", error.message);
  //     });
  // }
  // function findExerciseId(users_id, exercise_name) {
  //   return axios
  //     .post("http://localhost:8080/api/exercises/id", {
  //       users_id,
  //       exercise_name,
  //     })
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.log("Error getting exercise ID:", error.message);
  //     });
  // }

  // Updated PostExercises function
  function PostExercises(exerciseOptions, result) {
    exerciseOptions.forEach((exercise) => {
      const exerciseObject = {
        users_id: userID,
        exercise_name: exercise,
      };

      console.log(exerciseObject);

      axios
        .post("http://localhost:8080/api/exercises", exerciseObject)
        .then((createResponse) => {
          const { message } = createResponse.data;
          console.log("post request message from exercise", message);
          PostMaxWeight(result);
        })
        .catch((error) => {
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
