import React, { useState } from 'react';
import "./style.css"
import { NavLink } from "react-router-dom";
import { FaUser, FaChartLine, FaUserPlus, FaUsers, FaDoorClosed, FaChevronLeft } from "react-icons/fa";
import imgProfileMock from '../../assets/index-page/medalOuro.svg'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div className={isOpen ? "sidebarContainer" : "sidebarContainer sidebarContainerClose"}>
                <div className={isOpen ? "sidebarContent" : "sidebarContent sidebarContentClose"}>

                    <div className="sidebarProfileContainer">
                        <div className={isOpen ? "sideBarProfileInformation" : "sideBarProfileInformation sideBarProfileInformationClose"}>
                            <img src={imgProfileMock} alt="" />
                            <h3>{"Mauricio"}</h3>
                        </div>
                        <FaChevronLeft onClick={toggle} className={isOpen ? 'retractableSidebar' : 'retractableSidebar retractableSidebarClose'} />
                    </div>
                    <div className="sidebarItensContainer">
                        <NavLink to={"/"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaUser className='iconSideBar' />
                            <h3>Perfil</h3>
                        </NavLink>

                        <NavLink to={"/"} className={({ isActive }) =>
                            isActive ? isOpen ? "itemSideBar itemSidebarActive" : "itemSideBar itemSideBarClose itemSidebarActive" : isOpen ? "itemSideBar" : "itemSideBar itemSideBarClose"}>
                            <FaChartLine className='iconSideBar' />
                            <h3>Dashboard</h3>
                        </NavLink>

                        <NavLink to={"/"} className={({ isActive }) =>
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
                        <NavLink to={"/"} className={({ isActive, isPending }) =>
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