import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
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

  function handleData(r) {
    const some = r.map((item) => {
      const originalDate = new Date(item.created_at);

      const options = { month: "long", day: "numeric" };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = formatter.format(originalDate);
      return { name: formattedDate, uv: item.max_weight };
    });

    return some;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/max")
      .then((response) => {
        setData(handleData(response.data));
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  if (data.length === 0) {
    return <>Loading...</>;
  }

  return (
    <div className="chart-container">
      <AreaChart
        width={400}
        height={400}
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
        <Area type="monotone" dataKey="uv" stroke="#008080" fill="#008080" />
      </AreaChart>
    </div>
  );
}
