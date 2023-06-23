import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import downIcon from "../pics/downIcon.png"
import { fetchDealProducts } from '../http/dealAPI';

const DealProductDropDown = observer(({dealId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef()
    const listRef = useRef()

    useEffect(() => {
        const handleMouseClick = (e) => {
            if (e.target !== ref.current)
                if (isOpen && !listRef?.current?.contains(e.target)) {
                    setIsOpen(false)
                }
        }
        window.addEventListener('click', handleMouseClick)

        return () => {
            window.removeEventListener('click', handleMouseClick)
        }
    }, [isOpen, ref])

    const closeDropDown = () => {
        setIsOpen(false);
    }

    return (
        <div className='relative'>
            <img ref={ref} className="h-7 outline outline-2 p-2 cursor-pointer" src={downIcon} onClick={() => setIsOpen(true)}/>
            <DealProducts isOpen={isOpen} closeDropDown={closeDropDown} listRef={listRef} dealId={dealId}/>
        </div>
    )
});

const DealProducts = observer(({isOpen, closeDropDown, listRef, dealId}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (isOpen)
            fetchDealProducts(dealId).then(data => setProducts(data))
    }, [isOpen])

    return (
        <div className='absolute bg-white w-full'>
            {isOpen &&
            <div className='grid outline outline-2 h-40 overflow-y-auto' ref={listRef}>
                {products.map(dealProduct => 
                    <div className='outline outline-1 p-2 m-2' key={dealProduct.id}>
                        {dealProduct.product.name}
                        <div className='flex justify-between items-center'>
                            <img className='h-20' src={process.env.REACT_APP_API_URL + dealProduct.product.img}/>
                            <a>Количество: {dealProduct.amount}</a>
                        </div>
                    </div>
                )}
            </div> 
            }
        </div>
    )
})

export default DealProductDropDown;