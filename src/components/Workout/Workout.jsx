import { Button, ButtonGroup } from "@chakra-ui/react";
import "./Workout.scss";

export default function Workout() {
  return (
    <div className="workout">
      <div className="workout__heading">Workout</div>
      <div className="workout__btns">
        <Button colorScheme="teal" size="xs">
          Delete Workout
        </Button>
        <Button colorScheme="teal" size="xs">
          Save Workout
        </Button>
        <Button colorScheme="teal" size="xs">
          Add Exercise
        </Button>
      </div>
    </div>
  );
}
