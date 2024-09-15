import { forwardRef, useRef } from "react";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { addNewItem } from "../../store/itemSlice";

const NewItem = forwardRef(({}, ref) => {
    const dispatch = useDispatch()

    
    const nameRef = useRef()
    const categoryRef = useRef()
    const priceRef = useRef()
    const imgMobileRef = useRef()
    const imgTabletRef = useRef()
    const imgDesktopRef = useRef()
    const imgThumbnailRef = useRef()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const newItem = {
            "thumbnail": imgThumbnailRef.current.value,
            "mobile": imgMobileRef.current.value,
            "tablet": imgTabletRef.current.value,
            "desktop": imgDesktopRef.current.value,
            "name": nameRef.current.value,
            "category": categoryRef.current.value,
            "price": +priceRef.current.value
        }
        dispatch(addNewItem(newItem))
        ref.current.close()
    }

    return(
        <Dialog ref={ref}>
            <section id="new-item">
                <div className='container text-[1.3rem]'>
                    <h3 className='text-[2.5rem] font-bold leading-11 text-rose900 my-4'>Add new Dessert</h3>
                    <form 
                        onSubmit={handleSubmitForm}
                    >
                        <Input 
                            ref={nameRef}
                            id="name"
                            label="Desert Name"
                            placeholder="Waffle with honey.."
                        />
                        <Input 
                            ref={categoryRef}
                            id="category"
                            label="Category"
                            placeholder="Waffle.."
                        />
                        <Input 
                            ref={priceRef}
                            id="price"
                            label="Price"
                            placeholder="0.01$"
                        />
                        <Input 
                            ref={imgMobileRef}
                            id="img-mobile"
                            label="Mobile Image"
                            placeholder="your food mobile size image"
                        />
                        <Input 
                            ref={imgTabletRef}
                            id="img-tablet"
                            label="Tablet Image"
                            placeholder="your food tablet size image"
                        />
                        <Input 
                            ref={imgDesktopRef}
                            id="img-desktop"
                            label="Desktop Image"
                            placeholder="your food Desktop size image"
                        />
                        <Input 
                            ref={imgThumbnailRef}
                            id="img-thumbnail"
                            label="Thumbnail Image"
                            placeholder="your food thumbnail size image"
                        />
                        <button 
                            type="submit"
                            className="w-full bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl my-5"
                        >
                            Add Dessert
                        </button>     
                    </form>
                </div>
            </section>
        </Dialog>
    )
})

export default NewItem