import React from 'react'

export const Navbar = () => {
    return (
        <div className='flex bg-zinc-600 h-20 w-full justify-between p-4 items-center'>
            <h1 className='text-3xl text-zinc-300'>Weather App</h1>
            <form >
                <input
                    className='bg-zinc-400 outline-none rounded-md p-1 w-90'
                    type="text" placeholder='Enter Your City' />
            </form>
            <h1
                className='text-3xl'>Logo</h1>

        </div>
    )
}
