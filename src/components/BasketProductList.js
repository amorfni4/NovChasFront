import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '..';
import ProductItem from './ProductItem';
import "../styleSheets/layout.css"
import BasketItem from './BasketItem';
import { payForProductsFromBasket } from '../http/productAPI';
import { useNavigate } from 'react-router-dom';

const BasketProductList = observer(() => {
    const navigate = useNavigate()
    const {user, product} = useContext(Context)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let tempTotalPrice = 0
        product.basketProducts.map(product => tempTotalPrice = tempTotalPrice + product.product.price * product.count)
        setTotalPrice(tempTotalPrice)

    }, [product.basketProducts])

    const buyBasket = async () => {
        const response = await payForProductsFromBasket(user.user.id, product.basketProducts);
        window.location.replace(response.url)
    }
    
    return (
        <div className="grid gap-10 p-2 m-5 md:m-10 md:p-4 place-items-center outline outline-2 font-serif text-xl">
            {product.basketProducts.map(product => 
                <BasketItem key={product.product.id} currentProduct={product.product} amount={product.count}/>
            )}        
            {totalPrice > 0 ?
            <div className='flex gap-10 place-self-end text-center'>                
                <a>Итоговая цена: {totalPrice}р.</a>
                <button className='w-32 h-8 outline outline-2 hover:bg-green-500' onClick={buyBasket}>Купить</button>   
            </div>
            :
            <div className='text-center'>Корзина пуста</div>
            }
        </div>
    )
})

export default BasketProductList;