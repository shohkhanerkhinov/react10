import React, {useContext, useState} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import shopping from '../assets/shopping-cart.png'
import { CartContext } from '../App'

function Header() {
    const location = useLocation()
    const {cart} = useContext(CartContext)

    return (
        <header>
            <div className='bg-neutral-800'>
                <div className="container mx-auto px-40 flex justify-end py-2 gap-3 text-md text-white">
                    <Link to='/login'>Sign in / Guest</Link>
                    <Link to='/register'>Create account</Link>
                </div>
            </div>
            <div className='bg-blue-100 py-7'>
                <div className="container mx-auto px-40 flex justify-between py-3 items-center">
                    <div className="logo">
                        <Link className='px-5 py-4 bg-blue-500 text-xl rounded-md text-white font-bold hover:bg-blue-600' to='/'>C</Link>
                    </div>
                    <nav>
                        <ul className='flex items-center gap-4 '>
                            <li>
                                <NavLink className={`${location.pathname == '/' ? "bg-black text-white" : ""} text-lg py-2 px-3 rounded-md  hover:bg-gray-300`} to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={`${location.pathname.includes('about') ? "bg-black text-white" : ""} text-lg py-2 px-3 rounded-md  hover:bg-gray-300`} to='/about'>About</NavLink>
                            </li>
                            <li>
                                <NavLink className={`${location.pathname.includes('products') ? "bg-black text-white" : ""} text-lg py-2 px-3 rounded-md  hover:bg-gray-300`} to='/products'>Products</NavLink>
                            </li>
                            <li>
                                <NavLink className={`${location.pathname.includes('cart') ? "bg-black text-white" : ""} text-lg py-2 px-3 rounded-md  hover:bg-gray-300`} to='/cart'>Cart</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="relative inline-block">
                        <img src={shopping} className="w-10 h-10" alt="Shopping Cart" />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
