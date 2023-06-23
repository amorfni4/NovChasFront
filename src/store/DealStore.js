import {makeAutoObservable} from "mobx";

export default class DealStore {
    constructor(){
        this._deals = []
        makeAutoObservable(this)
    }

    setDeals(deals){
        this._deals = deals
    }  

    get deals(){
        return this._deals
    } 
}