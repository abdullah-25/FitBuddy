import DarkModeNavBar from "../DarkModeNavBar/DarkModeNavBar";
import Chart from "../../components/Chart/Chart";

export default function UserProfile({ user }) {
  return (
    <div>
      <DarkModeNavBar />
      <Chart user={user} />
    </div>
  );
}
