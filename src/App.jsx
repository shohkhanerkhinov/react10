
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Details from './pages/Details'
import Products from './pages/Products'
import Cart from './pages/Cart'
import './App.css'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('cart', cart);
    
  }, [cart])

  return (
    <CartContext.Provider  value={{cart, setCart}}>
      <Routes>

        <Route path='/' element={<MainLayout><Home></Home></MainLayout>} >
        </Route>


        <Route path='/about' element={<MainLayout><About></About></MainLayout>} >
        </Route>


        <Route path='/products' element={<MainLayout><Products></Products></MainLayout>} >
        </Route>


        <Route path='/products/:id' element={<MainLayout><Details></Details></MainLayout>} >
        </Route>


        <Route path='/cart' element={<MainLayout><Cart></Cart></MainLayout>} >
        </Route>
      </Routes>
    </CartContext.Provider>
  )
}

export default App
