import React, { useState } from "react";
import Modal from 'react-modal';
import closeIcon from "../../pics/closeIcon.png"
import checkMark from "../../pics/checkMarkIcon.png"
import downIcon from "../../pics/downIcon.png"
import { fetchAllDeals, setGiven } from "../../http/dealAPI";
import { useContext } from "react";
import { Context } from "../..";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import DealProductDropDown from "../DealsDropDown";

const DealsList = observer(({isOpen, onClose}) => {
    const {deal} = useContext(Context)

    const setGivenStatus = (id) => {
        setGiven(id)
        .then(
            fetchAllDeals()
            .then(data => deal.setDeals(data))
        )        
    }

    useEffect(() => {        
        if (isOpen)
            fetchAllDeals().then(data => deal.setDeals(data))        
    }, [isOpen])

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[55%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-3/4 max-h-[450px] right-auto outline outline-2 translate-y-[-55%] translate-x-[-50%] bg-white"
        >
            <div className="w-full grid auto-rows-min">
            <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <div className="w-full h-96 grid overflow-y-auto text-lg">
                    {deal.deals.length !== 0 ?
                        deal.deals.map(deal => 
                        <div key={deal.id} className="grid gap-2 outline outline-2 m-2 p-2">
                            <img className="h-7 justify-self-end cursor-pointer" src={checkMark} onClick={() => setGivenStatus(deal.id)}/>
                            <label>Номер заказа:</label>
                            <a className="outline outline-2 p-2">{deal.paymentId}</a>
                            <label>Почта клиента:</label>
                            <a className="outline outline-2 p-2">{deal.user.email}</a>
                            <label>Товары заказа:</label>
                            <DealProductDropDown dealId={deal.id}/>
                        </div>
                        )
                        :
                        <div className="place-self-center">Все заказы выданы!</div>
                    }
                </div>
            </div>
        </Modal>
    );
});

export default DealsList;