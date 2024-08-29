const Button = ({title}) => {
    return(
    <button 
        className="w-full bg-red text-white text-[1.2rem] px-4 py-3 rounded-3xl"
    >
        {title}
    </button>
    )
}

export default Button