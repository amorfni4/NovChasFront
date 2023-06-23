import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor(){
        this._type = []
        this._products = []
        this._basketProducts = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setProducts(products){
        this._products = products
    }  
    setBasketProducts(basketProducts){
        this._basketProducts = basketProducts
    }  
    setTypes(type){
        this._type = type
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }
    setLimit(limit){
        this._limit = limit
    }

    get products(){
        return this._products
    }    
    get basketProducts(){
        return this._basketProducts
    }
    get types(){
        return this._type
    }
    get selectedType(){
        return this._selectedType
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}