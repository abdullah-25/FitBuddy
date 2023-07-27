import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  useControllableProp,
  useControllableState,
  useDisclosure,
  Input,
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

import Header from "../../components/Header/Header";
import "./Workout.scss";
import Exercise from "../Exercise/Exercise";

export default function Workout() {
  const [startWorkoutBtnClick, setstartWorkoutBtnClick] =
    useControllableState(false);
  const [nameExcercise, setNameExcercise] = useControllableState("");
  const [displayExcercise, setDisplayExcercise] = useControllableState(false);

  const modal1 = useDisclosure();
  const modal2 = useDisclosure();

  function handleNameExcercise(e) {
    const name = e.target.value;
    setNameExcercise(name);
  }
  function handleSavebtn() {
    setDisplayExcercise(!displayExcercise);
    console.log("save");
  }
  function SaveWorkout() {
    setstartWorkoutBtnClick(!startWorkoutBtnClick);
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
        {displayExcercise ? <Exercise name={nameExcercise} /> : <></>}
      </div>
    </>
  );
}
