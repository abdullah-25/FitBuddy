import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Spinner } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "../../components/Chart/Chart.scss";
import ShareButton from "../../components/ShareButton/ShareButton";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

export default function Chart({ user }) {
  const [data, setData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [ExercisesArray, setResultUserExercisesArray] = useState([]);
  const [userID, setUserID] = useState(null);
  const shareUrl = window.location.href;
  const chartRef = React.createRef();

  const name = user.email;

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
  function getUserId() {
    const data = {
      user_name: user.email,
    };
    if (!!user) {
      console.log("user?", !!user);
      axios
        .post(
          "https://fitbuddy-abdullah-ffca2d0de5a2.herokuapp.com/userid",
          data
        )
        .then((resp) => {
          setUserID(resp.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    axios
      .get(`https://fitbuddy-abdullah-ffca2d0de5a2.herokuapp.com/api/max`)
      .then(() => {})
      .catch((response) => {
        console.log("Error:", response);
      });

    getUserId();
  }, []);

  useEffect(() => {
    if (!!userID) {
      userExerciseArray(userID);
      handleSelect();
    }
  }, [selectedExercise, userID]);

  function handleSelect() {
    //update users_id to be dynamic
    const findId = { users_id: userID, exercise_name: selectedExercise };
    axios
      .put(
        `https://fitbuddy-abdullah-ffca2d0de5a2.herokuapp.com/api/exercises/${findId.users_id}`,
        findId
      )
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

  function userExerciseArray(user_id) {
    axios
      .get("https://fitbuddy-abdullah-ffca2d0de5a2.herokuapp.com/api/exercises")
      .then((response) => {
        let result = response.data
          .filter((obj) => obj.users_id === user_id)
          .map((item) => item.exercise_name);

        setResultUserExercisesArray([...new Set(result)]);
      });
  }

  function getAverageWeight() {
    const totalWeight = data.reduce((acc, entry) => acc + entry.max_weight, 0);
    const averageWeight = totalWeight / data.length;
    return averageWeight.toFixed(2);
  }

  function getMinWeight() {
    const minWeight = Math.min(...data.map((entry) => entry.max_weight));
    return minWeight;
  }

  function getMaxWeight() {
    const maxWeight = Math.max(...data.map((entry) => entry.max_weight));
    return maxWeight;
  }

  return (
    <div className="chart-container" ref={chartRef}>
      <Select
        value={selectedExercise}
        onChange={(e) => {
          setSelectedExercise(e.target.value);
        }}
        placeholder="Select an Exercise"
        className="chart-container__select"
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
        className="chart"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"></XAxis>
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="max_weight"
          stroke="#008080"
          fill="#008080"
        />
      </AreaChart>

      <div className="data-insights">
        <p>Average Weight: {getAverageWeight()} lbs</p>
        <p>Minimum Weight: {getMinWeight()} lbs</p>
        <p>Maximum Weight: {getMaxWeight()} lbs</p>
      </div>

      <ShareButton
        shareUrl={shareUrl}
        quote="Check out my workout progress on FitBuddy!"
        twitterMessage="Check out my workout progress on FitBuddy!"
      />
    </div>
  );
}
