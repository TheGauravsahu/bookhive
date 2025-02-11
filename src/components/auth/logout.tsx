import {  signOut } from '@/auth'
import React from 'react'

export default function Logout() {
  return (
    <span onClick={async ()=>{
        "use server"
        await signOut()
    }}>
    Logout
    </span>
  )
}
