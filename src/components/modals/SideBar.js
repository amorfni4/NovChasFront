import React, { useContext } from "react";
import Modal from 'react-modal';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, MAIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { Context } from "../..";

const SideBar = ({isOpen, onClose}) =>{
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setUserType("")
        user.setIsAuth(false)
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{overlay: {zIndex:1000}}}
        className="absolute left-0 bottom-auto w-1/2 h-full right-auto border bg-white font-serif text-xl sidebar"
        >
            <div className="grid">
            <ul className="gap-x-8 place-items-center sidebar-list">                
                <li><NavLink to={SHOP_ROUTE}>Товары</NavLink></li>
                <li><NavLink to={SHOP_ROUTE}>Услуги</NavLink></li>
                {user.isAuth ?
                <li><NavLink to={ADMIN_ROUTE}>Админ панель</NavLink></li>
                :
                <></>
                }
                {user.isAuth ?
                <li>
                    <button 
                         
                        onClick={() => logOut()}
                    >
                        Выход
                    </button>
                </li>
                :
                <></>
                }
            </ul>      
            </div>
        </Modal>
    );
};

export default SideBar;