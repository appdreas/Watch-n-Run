import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
    const { data: session } = useSession()
  return (
    <>
    <div className='text-6xl'>profile</div>
    <Link className='btn btn-secondary' href='/'>Home</Link>
    <div className="text">{session.user.name}</div>
    <div className="text">{session.user.email}</div>
    </>
  )
}

export default Profile