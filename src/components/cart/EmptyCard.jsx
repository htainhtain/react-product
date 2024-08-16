const EmptyCard = () => {
    return (
        <div className='flex flex-col items-center mt-5'>
                <img 
                    src='./images/illustration-empty-cart.svg' 
                    alt="cake in two pieces" 
                    className='w-[150px]'
                />
            <p className="text-rose500">Your added items will appear here</p>
        </div> 
    )
}

export default EmptyCard