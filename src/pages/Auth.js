import React, { useContext, useState } from "react";
import {NavLink, useLocation} from "react-router-dom"
import '../styleSheets/layout.css';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = async () => {
        try {  
            let response;          
            if (isLogin) {
                response = await login(email, password)
            } else {
                response = await registration(email, password)
            }
            user.setUser(response)
            user.setUserType(response.role)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="container">
            <div className="login-box">
                <h2 className="h2 text-xl">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <input 
                    type="email" 
                    className="field placeholder:text-base" 
                    placeholder="Введите Вашу электронную почту..." 
                    onChange={e => setEmail(e.target.value)} 
                    value={email}
                />
                <input 
                    type="password" 
                    className="field placeholder:text-base" 
                    placeholder="Введите пароль..." 
                    onChange={e => setPassword(e.target.value)} 
                    value={password}
                />                

                {!isLogin &&         
                    <input 
                        type="text" 
                        className="field placeholder:text-base" 
                        placeholder="Повторите введенный пароль..." 
                    />
                }
                            
                <button className="form-button" onClick={auth}> {isLogin ? "Войти" : "Зарегистрироваться"}</button>

                {isLogin ?
                    <div>
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>зарегистрироваться</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>войти</NavLink>
                    </div>
                }
            </div>        
        </div>
    );
});

export default Auth;