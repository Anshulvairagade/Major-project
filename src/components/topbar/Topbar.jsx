import "./topbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { Router } from "react-router";
import {Route} from "react-router-dom";



export default function Topbar() {
  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <span className="logo">BaatCheet</span>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for friends, post or videos." className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLink">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem" >
              <a href="/chat">
                <Chat />
              </a>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/1.jpg" alt="NONE" className="topbarImg" />
      </div>
    </div>
  );
}

