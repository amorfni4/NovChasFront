import React, { useContext, useEffect, useState } from "react";
import { fetchProductsFromBasket } from "../http/basketAPI";
import { Context } from "..";
import BasketProductList from "../components/BasketProductList";

const Basket = () =>{
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProductsFromBasket(user.user.id).then(data => {
            product.setBasketProducts(data)
        }).finally(() => setLoading(false))  
    }, [])

    if (loading){
        return <></>
    }

    return (
        <div className="mt-10">
            <BasketProductList></BasketProductList>
        </div>
    );
};

export default Basket;