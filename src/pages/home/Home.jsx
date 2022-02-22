import Topbar from "../../components/topbar/Topbar";
import Siderbar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Home.css"

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Siderbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
