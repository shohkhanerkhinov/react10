import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { http } from '../axios'

function Details() {
  const params = useParams()
  useEffect(() =>{
    http.get(`/products/${params.id}`)
    .then(response =>{
      console.log(response);

    })
    .catch(error =>{
      console.log(error);

    })
  }, [])
  return (
    <div>
      <h2>details</h2>
    </div>
  )
}

export default Details
