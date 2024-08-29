import { forwardRef } from "react"

const Input = forwardRef(({id, label, placeholder}, ref) => {
    return (
        <div className='flex flex-col gap-2 mb-3'>
            <label htmlFor={id} className='' >{label}</label>
            <input 
                required
                ref={ref}
                type="text" 
                id={id} 
                name={id}
                placeholder={placeholder}
                className='border-solid border-2 border-rose300 px-3 py-2 rounded-lg'
            />
        </div>
    )
})

export default Input