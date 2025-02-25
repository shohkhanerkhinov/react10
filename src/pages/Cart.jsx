import React, { useContext } from 'react'

import { CartContext } from '../App'

function Cart() {
  const { cart, setCart } = useContext(CartContext)
  
  function handleRemoveFromCart(product) {
    let copied = [...cart]; 
    copied = copied.filter(item => {
      return item.id !== product.id;
    });
    setCart(copied);
  }
  function handleChangeCount(current, product) {
    let copi = [...cart];
    copi = copi.map(item => {
      if (item.id == product.id) {

        item.count = current
      }
      return item
    })

    setCart(copi)
  }
  
  

  return (
    <div className='mt-20'>
      {
        cart.length > 0 && cart.map(function (item, index) {
          return <div key={index} className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
            <img className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" src={item?.product?.attributes?.image} alt="" />
            <div className="sm:ml-16 sm:w-48">
              <h3 className='capitalize font-medium'>{item?.product?.attributes?.title}</h3>
              <h3 className="mt-2 capitalize text-sm text-neutral-content">{item?.product?.attributes?.company}</h3>
              <h3>{item?.count}</h3>
              <span
                style={{
                  backgroundColor: item?.color
                }}
                className="inline-block w-[30px] h-[30px] cursor-pointer rounded-full"
              ></span>
            </div>

            <div className='sm:ml-12 block'>
              <select value={item?.count} onChange={(e) => {handleChangeCount(e.target.value, item)}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
              <br />
              <button
                className="mt-2 text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
                onClick={() => {handleRemoveFromCart(item)}}
              >
                remove
              </button>
            </div>

            <h2 className="font-medium sm:ml-auto">${item?.product?.attributes?.price}</h2>
          </div>
        })
      }
    </div>
  )
}

export default Cart