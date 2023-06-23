import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "..";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SERVICES_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import "../styleSheets/layout.css"
import SideBar from "./modals/SideBar";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logOut = () => {
        user.setUser({})
        user.setUserType("")
        user.setIsAuth(false)
    }

    return (
        <nav className="sticky top-0 w-full bg-white flex justify-between gap-8 h-20 px-10 
        border-b drop-shadow font-serif text-xl z-10 items-center">     
            <div className="w-10 md:hidden">
                <img className="w-8 h-8" onClick={() => setSidebarOpen(true)} src={require("../pics/menuIcon.png")}></img>
            </div>          
            <NavLink
                className="relative flex self-center" 
                to={MAIN_ROUTE}
            >
                <img className="h-16" src={require("../pics/Logo1.jpg")}/>
            </NavLink>              
            <ul className="hidden md:flex h-full gap-x-8 place-items-center navbar-list">                
                <li><NavLink to={SHOP_ROUTE}>Товары</NavLink></li>
                <li><NavLink to={SERVICES_ROUTE}>Услуги</NavLink></li>
            </ul>
            <div className="md:ml-auto self-center">
                {user.isAuth ?
                <div className="flex gap-4 ">       
                    {user.userType === "ADMIN" &&
                    <NavLink 
                        className="hidden md:flex outline outline-offset-4 
                        outline-gray-300 overflow-hidden" 
                        to={ADMIN_ROUTE}
                    >
                        <div className="self-center">Админ панель</div>
                    </NavLink>
                    }                 
                    <NavLink 
                        className="" 
                        to={BASKET_ROUTE}
                    >
                        <div className="w-10">
                            <img className="h-10" src={require("../pics/basketIcon.png")}/>
                        </div>
                    </NavLink>
                    <img 
                        className="hidden md:block h-10 cursor-pointer" 
                        onClick={() => logOut()}
                        src={require("../pics/exitIcon.png")}
                    />
                </div>
                :
                <NavLink
                    className="outline outline-offset-4 outline-gray-300" 
                    to={LOGIN_ROUTE}
                >
                    <div className="w-10">
                        <img className="h-10" src={require("../pics/authIcon.png")}/>                    
                    </div>
                </NavLink>              
                }  
            </div>     
            <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>  
        </nav>
    )         
})

export default NavBar;