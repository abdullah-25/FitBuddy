import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/Chart/Chart.scss";

// const data = [
//   {
//     name: "July 1st, 2023",
//     uv: 10,
//   },
//   {
//     name: "July 3rd, 2023",
//     uv: 5,
//   },
//   {
//     name: "July 5th, 2023",
//     uv: 30,
//   },
//   {
//     name: "July 6th, 2023",
//     uv: 25,
//   },
// ];

export default function Chart() {
  const [data, setData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [ExercisesArray, setResultUserExercisesArray] = useState([]);

  function handleData(r) {
    const some = r.map((item) => {
      const originalDate = new Date(item.created_at);
      const options = { month: "long", day: "numeric" };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(originalDate);
      return { name: formattedDate, max_weight: item.max_weight };
    });
    return some;
  }

  useEffect(() => {
    handleSelect();
    userExerciseArray(1);
  }, [selectedExercise, selectedExercise]);

  function handleSelect() {
    const findId = { users_id: 1, exercise_name: selectedExercise };

    axios
      .put("http://localhost:8080/api/exercises/id", findId)
      .then((response) => {
        let ExerciseID = Object.values(response.data)[1];
        axios
          .get("http://localhost:8080/api/max")
          .then((response) => {
            graphFilter(response.data, ExerciseID);
          })
          .catch((response) => {
            console.log("Error:", response);
          });
      });
  }

  function graphFilter(response, id) {
    const result = response.filter((obj) => obj.exercises_id === id);
    setData(handleData(result));
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/max")
      .then((response) => {
        //trigger function that filters based on exercise id
        graphFilter(response.data, 78);
      })
      .catch((response) => {
        console.log("Error:", response);
      });
  }, []);

  function userExerciseArray(user_id) {
    axios.get("http://localhost:8080/api/exercises").then((response) => {
      let result = response.data
        .filter((obj) => obj.users_id === user_id)
        .map((item) => item.exercise_name);

      setResultUserExercisesArray([...new Set(result)]);
    });
  }

  if (data.length === 0) {
    return (
      <>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </>
    );
  }

  return (
    <div className="chart-container">
      <Select
        value={selectedExercise}
        onChange={(e) => {
          setSelectedExercise(e.target.value);
          console.log("Selected Exercise:", e.target.value);
        }}
        placeholder="Select an Exercise"
        classNmae="chart-container__select"
      >
        {ExercisesArray.map((exerciseName) => (
          <option key={exerciseName} value={exerciseName}>
            {exerciseName}
          </option>
        ))}
      </Select>

      <AreaChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="max_weight"
          stroke="#008080"
          fill="#008080"
        />
      </AreaChart>
    </div>
  );
}
