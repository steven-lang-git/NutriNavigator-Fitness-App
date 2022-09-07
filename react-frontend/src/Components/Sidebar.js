import "../App.css";
import SidebarLink from "./SidebarLink";
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MonitorHeartIcon from '@material-ui/icons/DirectionsRun';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Button } from "@material-ui/core";
function Sidebar() {




  return (
    <div className="left"   >
      <div className="sidebar">

        <SidebarLink text="Home" Icon={HomeRoundedIcon} link="/" />
        <SidebarLink text="Explore" Icon={SearchIcon} link="/explore" />
        <SidebarLink text="Fitness" Icon={FitnessCenterIcon} link="/fitness" />
        <SidebarLink text="Cardio" Icon={MonitorHeartIcon} link="/cardio" />
        <SidebarLink text="Meals" Icon={FastfoodIcon} link="/meals" />
        <SidebarLink text="Tracking" Icon={EventNoteIcon} link="/tracking" />
        <SidebarLink text="Bookmarks" Icon={BookmarkBorderIcon} link="/bookmarks" />
        <SidebarLink text="Lists" Icon={ListAltIcon} link="/lists" />
        <SidebarLink text="Profile" Icon={PermIdentityIcon} link="/profile" />
        <SidebarLink text="More" Icon={MoreHorizIcon} link="/more" />
        <div className="log_btn">
          <Button id="post">
            Log Today
          </Button>
        </div>

      </div>
    </div>
  );
}
export default Sidebar;