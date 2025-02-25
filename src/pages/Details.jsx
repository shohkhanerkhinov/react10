import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../App'
import { http } from '../axios'
import { ToastContainer, toast } from 'react-toastify';

function Details() {
  const [product, setProduct] = useState({})
  const [selColor, setSelColor] = useState('')
  const [count, setCount] = useState(1)

  const params = useParams()
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    http.get(`/products/${params.id}`)
      .then(response => {
        setProduct(response.data.data)
        setSelColor(response?.data?.data?.attributes?.colors?.[0] || '')
      })
      .catch(error => {
        console.log(error)
      })
  }, [params.id])

  function handleAddToCart() {

    let isExsis = cart.find(value => {
      return value.product.id == product.id && value.color == selColor
    })

    let cartObject = {
      id: Date.now,
      count: count,
      color: selColor,
      product: product
    }

    let copied = [...cart]

    if (isExsis) {
        copied = copied.map(function (value) {
          if (value.product.id == product.id &&  value.color == selColor) {
            value.count = Number(value.count)
            value.count += Number(count)
          }
          return  value
        })
        setCart(copied)
    }
    else{
      setCart([...cart, cartObject])
    }


    toast.success('Item added to cart', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className='container mx-auto flex gap-7 mt-10'>
      <img className="w-1/2 h-[560px] object-cover rounded-xl " src={product?.attributes?.image} alt={product?.attributes?.title} />
      <div className='w-1/2'>
        <h3 className="capitalize text-3xl font-bold">{product?.attributes?.title}</h3>
        <h3 className="text-xl text-gray-600 font-bold mt-2">{product?.attributes?.company}</h3>
        <h3 className="mt-3 text-xl">${product?.attributes?.price}</h3>
        <h3 className="mt-6 leading-8">{product?.attributes?.description}</h3>

        <div className='flex gap-3 mt-5'>
          {product?.attributes?.colors?.length > 0 &&
            product.attributes.colors.map((color, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: color,
                  border: color === selColor ? "3px solid black" : "none"
                }}
                className="inline-block w-[30px] h-[30px] cursor-pointer rounded-full"
                onClick={() => setSelColor(color)}
              ></span>
            ))}
        </div>


        <div className='flex flex-col gap-4 mt-20'>
          <label className='block' htmlFor="count">
            <select className='w-[300px] border p-2' value={count} onChange={(e) => (setCount(e.target.value))}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </label>

        </div>
        <button onClick={handleAddToCart} className='p-4 bg-blue-900 text-white rounded-md mt-10 cursor-pointer'>ADD TO BAG</button>
      </div>
      <ToastContainer />

    </div>
  )
}

export default Details
