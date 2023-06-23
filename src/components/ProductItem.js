import React, { useContext } from 'react';
import "../styleSheets/layout.css";
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    return (
        <div className="min-w-[140px] h-[300px] border font-serif text-center cursor-pointer grid place-items-center" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <img className="object-contain h-48 w-48" src={process.env.REACT_APP_API_URL + product.img}/>
            <div>
                {product.name}
            </div>
            <div>
                {product.price}р
            </div>
        </div>
    )
};

export default ProductItem;