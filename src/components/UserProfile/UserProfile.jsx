import DarkModeNavBar from "../DarkModeNavBar/DarkModeNavBar";
import Chart from "../../components/Chart/Chart";
export default function UserProfile({ user }) {
  console.log(user);
  return (
    <div>
      <DarkModeNavBar />
      <Chart user={user} />
    </div>
  );
}
