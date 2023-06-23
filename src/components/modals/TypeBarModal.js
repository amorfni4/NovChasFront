import Modal from "react-modal"
import closeIcon from "../../pics/closeIcon.png"
import TypeBar from "../TypeBar";

const TypeBarModal = ({isOpen, onClose}) => {
    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[50%] left-1/2 bottom-auto w-[60%] max-w-[300px] h-3/4 max-h-[300px] right-auto translate-y-[-55%] translate-x-[-50%] grid outline outline-2 bg-white"
        >
            <div className="grid gap-1 w-full h-[300px]">
                <img className="w-7 h-7 justify-self-end m-2" src={closeIcon} onClick={onClose}/>
                <div className="w-full h-[100%] overflow-y-auto p-1">
                    <TypeBar/>
                </div>            
            </div>
        </Modal>
    )
}

export default TypeBarModal;