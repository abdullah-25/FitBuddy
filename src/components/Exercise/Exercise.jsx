import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Input,
  useControllableState,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, MinusIcon, CheckIcon } from "@chakra-ui/icons";

import "../../components/Exercise/Exercise.scss";

export default function Exercise({ name }) {
  const [weight, setWeight] = useControllableState(0);
  const [addClicked, setAddClicked] = useControllableState(false);
  const [deleteClicked, setDeleteClicked] = useControllableState(false);

  function handleWeightInput(value) {
    setWeight(value);
  }
  function handleSaveExercise() {}

  function handleAddExercise() {
    setAddClicked(!addClicked);
  }
  function handleDeleteExercise() {
    setDeleteClicked(!deleteClicked);
  }

  return (
    <div className="exercise-container">
      <div className="exercise-container__heading">
        <div className="exercise-container__heading--name">{name}</div>
        <div className="exercise-container__heading--del">
          {" "}
          <Button
            onClick={handleDeleteExercise}
            colorScheme="red"
            variant="outline"
            size="xs"
          >
            {" "}
            {<DeleteIcon />}
          </Button>
        </div>
      </div>
      <div className="exercise-container__userinput">
        <div className="exercise-container__userinput--set">
          <div>Set</div>
          <div>
            <NumberInput
              size="sm"
              maxW={20}
              mr={5}
              mb={5}
              defaultValue={0}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        </div>

        <div>
          <div>Lbs</div>
          <div>
            <NumberInput
              size="sm"
              maxW={20}
              mr={5}
              mb={5}
              defaultValue={0}
              min={0}
              step={5}
              value={weight}
              onChange={handleWeightInput}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        </div>
        <div>
          <div>Reps</div>
          <div>
            <NumberInput
              size="sm"
              maxW={20}
              mr={5}
              mb={5}
              defaultValue={0}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        </div>
        <div>
          <Button colorScheme="red" variant="outline" mr={3} mt={6} size="xs">
            {" "}
            {<MinusIcon />}
          </Button>
        </div>
        <div>
          <Button
            onClick={handleSaveExercise}
            colorScheme="teal"
            variant="outline"
            size="xs"
            mt={6}
          >
            {" "}
            {<CheckIcon />}
          </Button>
        </div>
      </div>
      <Button
        on
        onClick={() => {
          handleAddExercise();
        }}
        colorScheme="teal"
        variant="solid"
        size="md"
        mt={1}
        mb={5}
      >
        {" "}
        Add Exercise
      </Button>
      {/* {addClicked ? <Exercise /> : ""}
      {deleteClicked ? "" : <Exercise />} */}
    </div>
  );
}
