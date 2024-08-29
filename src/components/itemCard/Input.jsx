const Input = ({id, label, placeholder, value, onChange}) => {
    return (
        <div className='flex flex-col gap-2 mb-3'>
            <label htmlFor={id} className='' >{label}</label>
            <input 
                value={value}
                required
                type="text" 
                id={id} 
                name={id}
                placeholder={placeholder}
                className='border-solid border-2 border-rose300 px-3 py-2 rounded-lg'
                onChange={onChange}
            />
        </div>
    )
}

export default Input