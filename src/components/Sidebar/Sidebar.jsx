import React, { useState, useEffect } from 'react';
import "./style.css"
import { NavLink } from "react-router-dom";
import { FaUser, FaChartLine, FaUserPlus, FaUsers, FaDoorClosed, FaChevronLeft } from "react-icons/fa";
import {URLSITE} from "../../data/constants"

function Sidebar() {

    useEffect(() => {
        if (sessionStorage.getItem("ACESS_TOKEN") === null) {
            window.location.href = `${URLSITE}/login`;
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem("ID", )
        sessionStorage.removeItem("ACESS_TOKEN")
        sessionStorage.removeItem("ACESS_TOKEN_GOOGLE")
        sessionStorage.removeItem("EMAIL")
        sessionStorage.removeItem("ROLE")
        sessionStorage.removeItem("NICKNAME")
        sessionStorage.removeItem("IMAGEM")
    }

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div className={isOpen ? "sidebarContainer" : "sidebarContainer sidebarContainerClose"}>
                <div className={isOpen ? "sidebarContent" : "sidebarContent sidebarContentClose"}>

                    <div className="sidebarProfileContainer">
                        <div className={"sideBarProfileInformation"}>
                            <h3>{sessionStorage.getItem("NICKNAME")}</h3>
                        </div>
                        <FaChevronLeft onClick={toggle} className={isOpen ? 'retractableSidebar' : 'retractableSidebar retractableSidebarClose'} />
                    </div>
                    <div className="sidebarItensContainer">
                        <NavLink to={"/profile"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaUser className='iconSideBar' />
                            <h3>Perfil</h3>
                        </NavLink>

                        <NavLink to={"/dashboard"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaChartLine className='iconSideBar' />
                            <h3>Dashboard</h3>
                        </NavLink>

                        <NavLink to={"/users"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaUserPlus className='iconSideBar' />
                            <h3>Jogadores</h3>
                        </NavLink>

                        <NavLink to={"/rooms"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaUsers className='iconSideBar' />
                            <h3>Salas</h3>
                        </NavLink>
                    </div>
                    <div className={isOpen ? "sidebarLogoutContainer" : "sidebarLogoutContainer sidebarLogoutContainerClose"}>
                        <NavLink onClick={logout} to={"/"}  className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "" : isOpen ? "logoutSidebar" : "logoutSidebar logoutSidebarClose"}>
                            <FaDoorClosed className='iconSideBar' />
                            <h3>Sair</h3>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;