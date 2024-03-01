import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import mainLogo from '../images/nutri-navigator-logo-white_v1_0_3.png';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: 30,
  backgroundColor: "#ffffff",
  border: "1px",
  borderStyle: "solid",
  borderColor: "#55597d",
  // marginLeft: 10,
  flexGrow: 1,
  width: "auto",
  "& :first-child": {
    flexGrow: 1
  },
  ".MuiInputBase-root": {
    width: "100%"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  // position: 'absolute',
  // pointerEvents: 'none',
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end"
  // backgroundColor: 'black',
  // width: "100%"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%"
  }
}));

export default function Header({
  searchQuery,
  setSearchQuery,
  clearGenre,
  onDropDownChange
}) {

  return (
    <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
      <div className="wrapper-1160px navbar-wrapper">
        <a href="/" aria-current="page" className="brand w-nav-brand w--current" aria-label="home">
          <img src={mainLogo} loading="lazy" alt="" className="photo" />
        </a>
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="nav-menu-wrapper">
            <div className="navbar-button-wrapper">
                <a href="/tracking" class="primary-button navbar-button hide w-inline-block">
                  <div class="primary-button-text-contain">
                    <div class="primary-button-text">Start Tracking</div>
                    </div>
                    <div class="primary-button-bg" style={{width: 0, height: 50}}>
                      </div></a>
              </div>
          </div>
        </nav>
      </div>
    </div>
  );
}