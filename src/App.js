import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Profile from './profile/profile.js'
// import './assets/css/main.scss';

export default function App() {
  return (
    <BrowserRouter>
  <Profile />
</BrowserRouter>
  )
}
