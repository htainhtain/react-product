const ConfirmOrderItem = ({ item }) => {
    console.log("item: ", item)
    return (
        <>
            <div className='flex items-center gap-3'>
                <img 
                    src={item.image.thumbnail} 
                    alt={item.name}
                    className='max-w-full w-[20%] rounded-lg'
                />
                <div className='ml-3'>
                    <h4>{item.name}</h4>
                    <p className='mt-2'><span className="text-red font-semibold mr-5">{item.quantity}x</span> <span className="text-rose500">@ ${item.price}</span></p>
                </div>
                <div className='ml-auto text-[1.2rem] text-rose900'>
                    <p>${item.price * item.quantity}</p>
                </div>
            </div>
            <hr className='h-[1px] my-3 bg-rose100'/>
        </>
    )
        
    
}

export default ConfirmOrderItem