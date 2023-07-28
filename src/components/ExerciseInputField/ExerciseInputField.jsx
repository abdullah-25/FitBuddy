import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useControllableState,
} from "@chakra-ui/react";
import { MinusIcon, CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import Exercise from "../Exercise/Exercise";

export default function ({ onCheckIconClick, SaveWorkoutSession }) {
  const [weight, setWeight] = useControllableState(0);
  const [userinput, setUserInput] = useState(true);
  const [displaySavebtn, setDisplaySavebtn] = useState(false);
  const [weightArray, setWeightArray] = useState([]);

  function handleWeightInput(value) {
    setWeight(value);
  }

  function handleMinusIcon() {
    setUserInput(true);
  }

  function handleCheckIcon() {
    setUserInput(false);
    setDisplaySavebtn(true);
    setWeightArray([...weightArray, weight]);
  }

  useEffect(() => {
    // Calculate maxWeight whenever weightArray changes
    const maxWeight = Math.max(...weightArray);
    console.log("Maximum Weight:", maxWeight);
  }, [weightArray]);

  return (
    <div
      className={
        userinput
          ? "exercise-container__userinputunchecked"
          : "exercise-container__userinputchecked"
      }
    >
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
            onChange={(value) => {
              handleWeightInput(value); // Pass the value to handleWeightInput
            }}
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
        <Button
          onClick={handleMinusIcon}
          colorScheme="red"
          variant="outline"
          mr={3}
          mt={6}
          size="xs"
        >
          {" "}
          {<MinusIcon />}
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            onCheckIconClick();
            handleCheckIcon();
          }}
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
  );
}
