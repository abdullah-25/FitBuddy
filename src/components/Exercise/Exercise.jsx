import { Button, useControllableState } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../../components/Exercise/Exercise.scss";
import ExerciseInputField from "../ExerciseInputField/ExerciseInputField";

const initialExerciseSetList = [1];

export default function Exercise({
  name,
  exerciseList,
  onCheckIconClick,
  SaveWorkoutSession,
}) {
  const [deleteClicked, setDeleteClicked] = useControllableState(false);
  const [visibleExercises, setVisibleExercises] = useState([
    { id: uuidv4(), isVisible: true },
  ]);

  const [exerciseSetList, setExerciseSetList] = useState(
    initialExerciseSetList
  );

  function handleDeleteExercise(exerciseId) {}

  function handleAddSet() {
    setExerciseSetList([...exerciseSetList, 1]);
  }
  function handleDeleteExercise() {
    setDeleteClicked(!deleteClicked);
  }
  function handleDeleteSet() {
    setExerciseSetList(exerciseSetList.slice(0, -1));
  }

  return (
    <div className="exercise-container">
      <div className="exercise-container__heading">
        <div className="exercise-container__heading--name">{name}</div>
        <div className="exercise-container__heading--del">
          <Button
            onClick={() => handleDeleteExercise(exerciseid)}
            colorScheme="red"
            variant="outline"
            size="xs"
          >
            {<DeleteIcon />}
          </Button>
        </div>
      </div>
      {exerciseSetList.map(() => {
        return (
          <ExerciseInputField
            onCheckIconClick={onCheckIconClick}
            SaveWorkoutSession={SaveWorkoutSession}
          />
        );
      })}

      <Button
        on
        onClick={() => {
          handleAddSet();
        }}
        colorScheme="teal"
        variant="solid"
        size="md"
        mt={1}
        mb={5}
      >
        {" "}
        Add Set
      </Button>
      <Button
        on
        onClick={() => {
          handleDeleteSet();
        }}
        colorScheme="teal"
        variant="outline"
        size="md"
        mt={1}
        mb={5}
        ml={4}
      >
        {" "}
        Delete Set
      </Button>
    </div>
  );
}
