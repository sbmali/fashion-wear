import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ( props ) => {
    return (
        <div>
            <div className='fixed top-0 right-0 left-0 bottom-0 opacity-50 bg-black z-50'></div>
            <div className='space-y-4 shadow-lg fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-white p-4 min-w-[80vw] md:min-w-fit z-50'>
                <AiOutlineClose onClick={props.closeModal} className='text-red-700 font-bold absolute right-4 cursor-pointer' />
                <p className="pt-2 pr-4">{props.message}</p>
                <div className="flex justify-between">
                    {!props.singleButton && <button onClick={props.closeModal} className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs">Cancel</button>}
                    <button onClick={props.modalSucess} className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs">{props.sucessButton}</button>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    message : 'Modal',
    sucessButton : 'Okay'
}

export default Modal