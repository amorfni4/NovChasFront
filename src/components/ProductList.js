import React, {useContext} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '..';
import ProductItem from './ProductItem';

const ProductList = observer(() => {
    const {product} = useContext(Context)
    
    return (
        <div className="grid justify-between grid-cols-1 md:grid-cols-4 gap-16 px-10 pb-10 place-items-center">
            {product.products.map(product => 
                <ProductItem key={product.id} product={product}/>
            )}            
        </div>
    )
})

export default ProductList;