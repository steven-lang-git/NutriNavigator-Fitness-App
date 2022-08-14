import '../App.css';
import {Link } from "react-router-dom";

function SidebarLink({ text,Icon, link}) {
    return(
      <div className="link" >
          <Icon/>
          <Link to={link}><h2>{text}</h2></Link>
      </div>
    );
  }
  export default SidebarLink;