import React, {useContext} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '..';

const TypeBar = observer(() => {
    const {product} = useContext(Context)

    const click = (type) => e => {
        if (product.selectedType.id === JSON.parse(type).id) {
            e.target.checked = false
            product.setSelectedType('')
            return
        }
        product.setSelectedType(JSON.parse(type))
    }
    
    return (
        <div className="grid grid-cols-1 gap-2 place-self-center justify-items-center text-lg w-full">
            {product.types.map(type => 
            <div className='w-full' key={type.id}>
                <input 
                    id={type.id}
                    type="radio" 
                    name="type" 
                    value={type.id} 
                    onClick={click(JSON.stringify(type))}   
                    onChange={e => {}}
                    checked={product.selectedType.id === type.id}     
                    className="typebar-item hidden" 
                />        
                <div className='grid h-10 place-items-center outline outline-1'><label htmlFor={type.id} className='cursor-pointer'>{type.name}</label></div>
            </div>
            )}        
        </div>
    )
})

export default TypeBar;