import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import closeIcon from "../../pics/closeIcon.png"
import deleteIcon from "../../pics/deleteIcon.png"
import { Context } from "../..";
import { deleteType, fetchTypes } from "../../http/typeAPI";
import { observer } from "mobx-react-lite";

const TypeList = observer(({isOpen, onClose}) =>{
    const {product} = useContext(Context)

    useEffect(() => {
        if (isOpen)
            fetchTypes().then(data => product.setTypes(data))
    }, [isOpen])

    const buttonDelete = (id) => {
        deleteType(id)
        .then(() => {
            fetchTypes()
            .then(data => product.setTypes(data))
        })
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[55%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-3/4 max-h-[150px] right-auto outline outline-2 translate-y-[-55%] translate-x-[-50%] bg-white"
        >
            <div className="w-full grid auto-rows-min">
            <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <div className="w-full h-24 grid overflow-y-auto text-lg">
                    {product.types.map(type =>                     
                        <div key={type.id} className="h-11 flex justify-between outline outline-2 m-2 p-2">
                            <a>{type.name}</a>
                            <button value={type.id} className="h-7 cursor-pointer" onClick={() => buttonDelete(type.id)}>
                                <img className="h-7" src={deleteIcon}/>
                            </button>
                        </div>                                    
                    )}
                </div>
            </div>
        </Modal>
    );
});

export default TypeList;