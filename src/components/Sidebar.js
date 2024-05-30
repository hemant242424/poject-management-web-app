import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import addIcon from "../assets/add_icon.svg";
import dashboardIcon from "../assets/dashboard_icon.svg";
import  {useAuthContext}  from "../hooks/useAuthContext"
import Avatar from "./Avatar"

export default function Sidebar() {
    const {user}=useAuthContext();
    return (
       
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={user.photoURL}/>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>

                            <NavLink exact to="/dashboard">
                                <img src={dashboardIcon} alt="dashboardIcon"></img>
                                <span>Dashboard</span>
                            </NavLink>

                        </li>
                        <li>

                            <NavLink to="/create">
                                <img src={addIcon} alt="addIcon"></img>
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}