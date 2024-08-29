import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Dialog = forwardRef(({children}, ref) => {
    const dialog  = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            },
            close() {
                dialog.current.close()
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className='py-5 max-md:m-0 w-[35%] min-w-[400px] max-md:w-full max-md:max-w-full max-md:fixed max-md:top-auto max-md:bottom-0 rounded-t-2xl'>
            {children}
        </dialog>,
        document.querySelector('#modal')
    )
})


export default Dialog