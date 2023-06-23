import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, fetchOneProduct } from "../http/productAPI";
import { fetchOneType } from "../http/typeAPI"
import { fetchOneProductFromBasket, addProductToBasket } from "../http/basketAPI"
import { Context } from "..";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const ProductPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [type, setType] = useState({})
    const [productInBasket, setProductInBasket] = useState(false)
    const {id} = useParams()
    
    const addToBasket = async () => {
        if (!user.isAuth) {
            navigate(LOGIN_ROUTE)
            return
        }
        try {              
            addProductToBasket({userId: user.user.id, productId: id})
            setProductInBasket(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const deleteProductClick = async () => {
        try {              
            await deleteProduct(id)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        fetchOneProduct(id)
        .then(async data => 
            {
                setProduct(data);
                const productInBasket = await fetchOneProductFromBasket(user.user.id, id)

                if (productInBasket)
                    setProductInBasket(true)                    
                return data
            })
        .then(data => 
            {
                fetchOneType(data.typeId)
                .then(data => {setType(data)})
                
            })
        .finally(() => setLoading(false))  
    }, [])  
    
    if (loading){
        return <></>
    }

    return (
        <div className="px-10 pt-5 text-xl md:text-2xl font-serif">
            {user.userType === "ADMIN" &&
            <div className="w-full grid place-items-end">
                <img 
                    className="object-contain w-8 h-8 cursor-pointer" 
                    src={require('../pics/deleteIcon.png')} 
                    onClick={deleteProductClick}
                />
            </div>                
            }
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 justify-items-center pb-4 border-b-2 ">
                <img className="md:col-span-2 object-contain w-52 h-52" src={process.env.REACT_APP_API_URL + product.img} alt=""/>
                <div className="md:col-span-3 grid gap-1 w-full">
                    <strong>{product.name}</strong>
                    <small>{type.name}</small>
                </div>
                <div className="h-20 grid md:col-span-2 place-items-center text-xl">
                    <a>Цена: {product.price} р.</a>
                    {productInBasket && user.isAuth ?
                    <a className="p-1 outline outline-2">Товар в корзине!</a>
                    :
                    <button className="p-1 outline outline-2" onClick={addToBasket}>Добавить в корзину</button>
                    }
                </div>
            </div>
            <p className="whitespace-break-spaces">Описание:</p>
            <small>{product.description}</small>            
        </div>        
    );
});

export default ProductPage;