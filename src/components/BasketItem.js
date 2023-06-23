import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { addProductToBasket, decrementProductFromBasket, deleteProductFromBasket, fetchProductsFromBasket } from '../http/basketAPI';

const BasketItem = observer(({currentProduct, amount}) => {
    const {user, product} = useContext(Context)
    
    const addProduct = async () => {
        if (amount >= 99)
            return        

        try {              
            await addProductToBasket({userId: user.user.id, productId: currentProduct.id})
            await fetchProductsFromBasket(user.user.id).then(data => {
                product.setBasketProducts(data)
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }
 
    const popProduct = async () => {
        if (amount < 1)
            return

        try {              
            await decrementProductFromBasket({userId: user.user.id, productId: currentProduct.id})
            await fetchProductsFromBasket(user.user.id).then(data => {
                product.setBasketProducts(data)
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    
    const deleteProduct = async () => {
        try {              
            await deleteProductFromBasket(user.user.id, currentProduct.id)
            await fetchProductsFromBasket(user.user.id).then(data => {
                product.setBasketProducts(data)
            })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="grid md:flex justify-between gap-2 md:w-full md:pr-4 outline outline-2 font-serif text-xl">
            <img className='outline outline-2 object-contain h-48 w-48 justify-self-center' src={process.env.REACT_APP_API_URL + currentProduct.img}/>
            <div className='grid justify-items-center md:flex gap-2 md:gap-7 pt-4'>
                <a className=''>{currentProduct.name}</a>
                <div className='grid justify-items-center auto-rows-min'>
                    <div className='flex items-start pt-2'>
                        <button className='w-5' onClick={popProduct}>-</button>
                        <div className='w-7 h-7 outline outline-1 text-center'>{amount}</div>
                        <button className='w-5' onClick={addProduct}>+</button>
                    </div>
                    <div className='grid auto-rows-min text-center'>
                        <a>{currentProduct.price}р.</a>
                        <a className='text-sm h-5'>Цена за 1 шт.</a> 
                    </div>    
                </div>
                <a className='w-16'>{amount * currentProduct.price}р.</a>
                <img className="object-contain w-7 h-7 cursor-pointer pb-2" src={require('../pics/deleteIcon.png')} onClick={deleteProduct}></img>
            </div>           
        </div>
    )
});

export default BasketItem;