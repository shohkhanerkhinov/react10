import React, { useEffect, useState } from 'react'
import { http } from '../axios'
import Card from '../components/Card'
import hd from '../assets/hamburger.svg'
import gridmenu from '../assets/gridmenu.svg'
import { useSearchParams } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState('grid')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalePage] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState({
        search: '',
        company: 'all',
        order: 'a-z',
        price: 10000,
        shipping: false,
        category: 'all'
    })

    useEffect(() => {
        setLoading(true)
        let url = '/products'

        if (searchParams.get('search') || searchParams.get('category') || searchParams.get('company') || searchParams.get('order') || searchParams.get('price') || searchParams.get('shipping')) {
            setFilter(prev => ({
                search: searchParams.get('search') || '',
                company: searchParams.get('company') || 'all',
                order: searchParams.get('order') || 'a-z',
                price: searchParams.get('price') || '100000',
                shipping: searchParams.get('shipping') === 'on',
                category: searchParams.get('category') || 'all'
            }))
            url = `/products?search=${filter.search}&category=${filter.category}&company=${filter.company}&order=${filter.order}&price=${filter.price}&shipping=${filter.shipping ? 'on' : ''}`
        }

        if (searchParams.get('page')) {
            setCurrentPage(searchParams.get('page'))
        }

        http.get(url)
            .then(response => {
                if (response.status === 200) {
                    setProducts(response?.data?.data || [])
                    setTotalePage(response?.data?.meta?.pagination.pageCount)
                }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [searchParams])

    useEffect(() => {
        http.get(`/products?page=${currentPage}`)
            .then(response => {
                if (response.status === 200){
                    setProducts(response?.data?.data || [])
                    setTotalePage(response?.data?.meta?.pagination.pageCount)

                }
            })
            .catch(error => console.log(error))
    }, [currentPage])

    function handleFilter(e) {
        e.preventDefault()
        setLoading(true)
        setSearchParams({ ...filter, shipping: filter.shipping ? 'on' : '' })
        let url = `/products?search=${filter.search}&category=${filter.category}&company=${filter.company}&order=${filter.order}&price=${filter.price}&shipping=${filter.shipping ? 'on' : ''}`
        http.get(url)
            .then(response => {
                if (response.status === 200) {
                    setProducts(response?.data?.data || [])
                    setTotalePage(response?.data?.meta?.pagination.pageCount)
                }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    function handleRespons() {
        setViewMode('grid')
    }

    function handleRespons2() {
        setViewMode('list')
    }

    function handlePagination(event, target) {
        setCurrentPage(target)
        setCurrentPage({page: target})
    }

    return (
        <div className="container mx-auto px-40">
            <form className="grid grid-cols-4 gap-4 mt-10 bg-blue-100 p-5 pb-5 rounded-lg">
                <div className="flex flex-col gap-2">
                    <label>Search Product</label>
                    <input
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                        className="border rounded-md p-2 bg-white"
                        type="text"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Select Category</label>
                    <select
                        value={filter.category}
                        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        className="border rounded-md p-2 bg-white"
                        type="text"
                    >
                        <option>all</option>
                        <option>Tables</option>
                        <option>Chairs</option>
                        <option>Kids</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label>Select Company</label>
                    <select
                        value={filter.company}
                        onChange={(e) => setFilter({ ...filter, company: e.target.value })}
                        className="border rounded-md p-2 bg-white"
                        type="text"
                    >
                        <option>all</option>
                        <option>Modenza</option>
                        <option>Luxora</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label>Sort by</label>
                    <select
                        value={filter.order}
                        onChange={(e) => setFilter({ ...filter, order: e.target.value })}
                        className="border rounded-md p-2 bg-white"
                        type="text"
                    >
                        <option>a-z</option>
                        <option>z-a</option>
                        <option>all</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label>
                        Select price: <b>${filter.price}</b>
                    </label>
                    <input
                        value={filter.price}
                        onChange={(e) => setFilter({ ...filter, price: e.target.value })}
                        className="border rounded-md p-2 bg-white"
                        type="range"
                        min={1000}
                        max={100000}
                    />
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <label>Free shipping</label>
                    <input
                        checked={filter.shipping} // checked qo‘shildi
                        onChange={(e) => setFilter({ ...filter, shipping: e.target.checked })}
                        className="border cursor-pointer rounded-md p-2 bg-white"
                        type="checkbox"
                    />
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <button
                        onClick={handleFilter}
                        className="bg-blue-500 w-full p-1 cursor-pointer rounded-lg text-white"
                    >
                        Search
                    </button>
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <button
                        type="reset"
                        onClick={() =>
                            setFilter({ search: '', price: 10000, shipping: false, category: 'all', company: 'all', order: 'a-z' })
                        }
                        className="bg-purple-500 w-full p-1 cursor-pointer rounded-lg text-white"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="my-5 bg-[#fafaff] rounded-md p-5">
                <div className="flex justify-between items-center">
                    <p>
                        <b>{products.length} products</b>
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleRespons}
                            className={`p-2 rounded-lg cursor-pointer ${viewMode === 'grid' ? 'bg-blue-200' : 'bg-white'}`}
                        >
                            <img className="w-5 h-5" src={gridmenu} />
                        </button>
                        <button
                            type="button"
                            onClick={handleRespons2}
                            className={`p-2 rounded-lg cursor-pointer ${viewMode === 'list' ? 'bg-blue-200' : 'bg-white'}`}
                        >
                            <img className="w-5 h-5" src={hd} />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`${viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-10'
                    : 'flex flex-col gap-4 mt-10'
                    }`}
            >
                {loading && <p>Loading...</p>}
                {!loading && Array.isArray(products) && products.length > 0 && products.map((product, index) => (
                    <Card key={index} product={product} viewMode={viewMode} />
                ))}
                {!loading && products.length === 0 && <p>Sorry, no products matched your search...</p>}
            </div>

            <div className="flex justify-end mb-10">
                <Pagination
                    onChange={handlePagination}
                    page={currentPage}
                    count={totalPage}
                    variant="outlined"
                />
            </div>
        </div>
    )
}

export default Products