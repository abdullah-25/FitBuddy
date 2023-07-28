import { useControllableState, Button } from "@chakra-ui/react";

export default function SaveBtn({ SaveWorkoutSession }) {
  function handleSavebtn() {
    SaveWorkoutSession(true);
  }
  return (
    <>
      <Button onClick={handleSavebtn} colorScheme="teal" size="lg" mt={5}>
        Save Workout
      </Button>
    </>
  );
}
