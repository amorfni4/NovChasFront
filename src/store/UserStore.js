import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._userType = ""  
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setUserType(userType){
        this._userType = userType
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get userType(){
        return this._userType
    }
}