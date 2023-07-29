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

import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import SaveBtn from "../SaveBtn/SaveBtn";

import Header from "../../components/Header/Header";
import "./Workout.scss";
import Exercise from "../Exercise/Exercise";
import Chart from "../Chart/Chart";

const initialExerciseList = [];

export default function Workout() {
  const [startWorkoutBtnClick, setstartWorkoutBtnClick] =
    useControllableState(false);
  const [nameExcercise, setNameExcercise] = useControllableState("");
  const [displayExcercise, setDisplayExcercise] = useControllableState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const modal1 = useDisclosure();
  const modal2 = useDisclosure();

  const [exerciseList, setExerciseList] = useState(initialExerciseList);
  const [result, setResult] = useState([]);
  let updatedResult = [];
  const exerciseOptions = Object.keys(result);
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
    console.log(nameExcercise);
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
    updatedResult = { ...result };
    Object.keys(updatedResult).forEach(function (exercise) {
      //name, result[name]
      //store key in seperate array
      //store max value of array in each object
      const maxWeight = Math.max(...updatedResult[exercise]);
      updatedResult[exercise] = maxWeight;
      return updatedResult;
    });
    setResult(updatedResult);

    //add buttons based on key names

    //send post request to update exercise
    axios
      .post(`http://localhost:8080/api/exercises`, {
        users_id: 1,
        exercise_name: exerciseOptions,
      })
      .then(() => {
        Navigate("/user");
      })
      .catch(({ response }) => {
        console.log(`Error! ${response.data}`);
      });
  }

  console.log("updated result:", result);
  console.log("updated Exercises:", exerciseOptions);
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
      <Header />
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
