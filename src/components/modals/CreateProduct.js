import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { Context } from "../..";
import { fetchTypes } from "../../http/typeAPI";
import { createProduct } from "../../http/productAPI";
import closeIcon from "../../pics/closeIcon.png"

const CreateProduct = ({isOpen, onClose}) =>{
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    
    useEffect(() => {
        if (isOpen)
            fetchTypes().then(data => product.setTypes(data))
    }, [isOpen])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('typeId', product.selectedType.id)

        createProduct(formData).then(() => onClose()).catch(e => console.log(e))
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[60%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-[80%] max-h-[700px] right-auto outline outline-2 translate-y-[-60%] translate-x-[-50%] bg-white"
        >
            <div className="w-full h-full grid auto-rows-auto">
            <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="h-10 w-[90%] justify-self-center self-center outline outline-2" 
                    placeholder="Введите название товара..." 
                />
                <select 
                    type="text" 
                    className="h-10 w-[90%] justify-self-center self-center outline outline-2 outline-black invalid:text-[#999]"
                    required defaultValue={""} 
                    onChange={e => product.setSelectedType(JSON.parse(e.target.value))}
                >
                    <option key="" value="" disabled hidden>Выберите тип...</option>
                    {product.types.map(type => 
                        <option 
                            key={type.id}
                            value={JSON.stringify(type)}                         
                            className="text-black"
                        >
                            {type.name}
                        </option>
                    )}
                </select>
                <textarea 
                    type="text" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="h-48 w-[90%] justify-self-center self-center outline outline-2" 
                    placeholder="Введите описание товара..." 
                />
                <input 
                    type="number" 
                    value={price} 
                    onChange={e => setPrice(Number(e.target.value))}
                    className="h-10 w-[90%] justify-self-center self-center outline outline-2" 
                    placeholder="Введите цену товара в рублях..." 
                />
                <label className="justify-self-center self-center">
                    <input type="file" className="hidden" onChange={selectFile}/>		
                    <div className="grid w-32 h-10 outline outline-2 text-center hover:bg-[#dedede] duration-300 cursor-pointer">
                        <span className="self-center">Выберите файл</span>
                    </div>
 	            </label>
                <button 
                    onClick={addDevice}
                    className="justify-self-center outline outline-2 w-[35%] m-2"
                >
                    Сохранить
                </button>
            </div>
        </Modal>
    );
};

export default CreateProduct;