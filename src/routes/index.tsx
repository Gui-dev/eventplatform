import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Event } from '../pages/Event'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/event" element={<Event />}/>
    </Routes>
  )
}
