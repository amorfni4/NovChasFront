import React, { useState } from "react";
import CreateType from "../components/modals/CreateType";
import CreateProduct from "../components/modals/CreateProduct";
import TypeList from "../components/modals/TypeList";
import DealsList from "../components/modals/DealsList";

const Admin = () =>{
    const [typeOpen, setTypeOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [typeListOpen, setTypeListOpen] = useState(false);
    const [dealListOpen, setDealListOpen] = useState(false);

    return (
        <div className="grid justify-items-center gap-8 p-10 text-xl">        
            <button className="w-[200px] h-10 outline outline-2" onClick={() => setTypeOpen(true)}>Добавить тип</button>
            <button className="w-[200px] h-10 outline outline-2" onClick={() => setProductOpen(true)}>Добавить продукт</button>
            <button className="w-[200px] outline outline-2" onClick={() => setTypeListOpen(true)}>Просмотр списка типов</button>
            <button className="w-[200px] outline outline-2" onClick={() => setDealListOpen(true)}>Просмотр списка заказов</button>
            <CreateType isOpen={typeOpen} onClose={() => setTypeOpen(false)}/>
            <CreateProduct isOpen={productOpen} onClose={() => setProductOpen(false)}/>
            <TypeList isOpen={typeListOpen} onClose={() => setTypeListOpen(false)}/>
            <DealsList isOpen={dealListOpen} onClose={() => setDealListOpen(false)}/>
        </div>
    );
};

export default Admin;