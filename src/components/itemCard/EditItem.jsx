import { forwardRef, useRef, useState } from "react";
import Dialog from "../Dialog/Dialog";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { updateItem } from "../../store/itemSlice";

const EditItem = forwardRef(({
    id,
    name, 
    category, 
    price, 
    image, 
}, ref) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name,
        category,
        price,
        image
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData(prevState => {
            const nextState = {...prevState}
            nextState.image = {...nextState.image}
            switch(name) {
                case "name": 
                    nextState.name = value
                    break
                case "category":
                    nextState.category = value
                    break
                case "price":
                    nextState.price = +value
                    break
                case "img-mobile":
                    nextState.image.mobile = value
                    break
                case "img-tablet":
                    nextState.image.tablet = value
                    break
                case "img-desktop":
                    nextState.image.desktop = value
                    break
                case "img-thumbnail":
                    nextState.image.thumbnail = value
                    break
            }
            console.log("nextState: ", nextState)
            return nextState
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        dispatch(updateItem(id, formData))
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
                            id="name"
                            label="Desert Name"
                            placeholder="Waffle with honey.."
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="category"
                            label="Category"
                            placeholder="Waffle.."
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="price"
                            label="Price"
                            placeholder="0.01$"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="img-mobile"
                            label="Mobile Image"
                            placeholder="your food mobile size image"
                            value={formData.image.mobile}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="img-tablet"
                            label="Tablet Image"
                            placeholder="your food tablet size image"
                            value={formData.image.tablet}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="img-desktop"
                            label="Desktop Image"
                            placeholder="your food Desktop size image"
                            value={formData.image.desktop}
                            onChange={handleInputChange}
                        />
                        <Input 
                            id="img-thumbnail"
                            label="Thumbnail Image"
                            placeholder="your food thumbnail size image"
                            value={formData.image.thumbnail}
                            onChange={handleInputChange}
                        />
                        <button 
                            type="submit"
                            className="w-full bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl my-5"
                        >
                            Edit Dessert
                        </button>     
                    </form>
                </div>
            </section>
        </Dialog>
    )
})

export default EditItem