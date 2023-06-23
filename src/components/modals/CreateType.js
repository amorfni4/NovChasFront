import React, { useState } from "react";
import Modal from 'react-modal';
import { createType } from "../../http/typeAPI";
import closeIcon from "../../pics/closeIcon.png"

const CreateType = ({isOpen, onClose}) =>{
    const [value, setValue] = useState('')
    const addType = () => {
        createType(({name: value}))
        .then(() => {
            setValue('')
            onClose()
        })
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[55%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-3/4 max-h-[150px] right-auto outline outline-2 translate-y-[-55%] translate-x-[-50%] bg-white"
        >
            <div className="w-full h-full grid">
                <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <input 
                    type="text" 
                    className="h-10 w-[90%] justify-self-center self-center outline outline-2" 
                    placeholder="Введите название нового типа..." 
                    value={value} 
                    onChange={e => setValue(e.target.value)}
                />
                <button className="justify-self-center outline outline-2 w-[35%] m-2" onClick={addType}>Сохранить</button>
            </div>
        </Modal>
    );
};

export default CreateType;