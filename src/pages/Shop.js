import React, { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import TypeBar from "../components/TypeBar";
import { Context } from "..";
import { fetchProducts } from "../http/productAPI";
import { fetchTypes } from "../http/typeAPI"
import Pages from "../components/Pages";
import { observer } from "mobx-react-lite";
import TypeBarModal from "../components/modals/TypeBarModal";

const Shop = observer(() =>{
    const {product} = useContext(Context)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(true) 
    const [typeBarModal, setTypeBarModalOpen] = useState(false);

    useEffect(() => {
        product.setSelectedType('')
        fetchTypes().then(data => product.setTypes(data))
        fetchProducts(null, 1, product.limit, null).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.page, product.limit, name).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(() => setLoading(false))  
    }, [product.selectedType, product.page])

    const searchClick = () => {
        fetchProducts(product.selectedType.id, product.page, product.limit, name).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }

    if (loading){
        return <></>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-y-6 px-10 py-5 justify-items-center">
            <div className="flex w-[100%] gap-2 col-span-1 md:col-span-8 justify-self-start">
                <img className="h-8 md:hidden" onClick={() => setTypeBarModalOpen(true)} src={require("../pics/categoryIcon.png")}/>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full outline outline-1"/>
                <img className="h-8 bg-white cursor-pointer" onClick={() => searchClick()} src={require("../pics/searchIcon.png")}/>
            </div>
            {!typeBarModal &&
            <div className="col-span-1 justify-items-center sticky top-20 h-max bg-white w-full border-b md:border-none drop-shadow md:drop-shadow-none">
                <div className="hidden md:grid w-64 h-18 flex gap-2 md:w-auto md:h-auto py-2 m-auto">
                    <TypeBar/>
                </div>
            </div>
            }
            <div className="col-span-7">
                <ProductList/>
            </div>
            <br/>
            <div className="col-span-8">
                <Pages/>
            </div>
            {typeBarModal &&
            <TypeBarModal isOpen={typeBarModal} onClose={() => setTypeBarModalOpen(false)}/>
            }
        </div>
    );
});

export default Shop;