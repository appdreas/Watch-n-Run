
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { env } from 'process'
import Link from 'next/link'
import Map from '../components/Map'
import { AnimatePresence, motion, usePresence } from 'framer-motion'
import { gsap } from 'gsap'

//UK API
//https://data.police.uk/docs/method/crimes-at-location/

export default function Home() {
  const { data: session } = useSession()

  // const getAthleteStats = async() => {
  //   const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${session.accessToken}`)
  //   const data = await res.json()
  // } 

  // const getAthleteRoutes = async() => { 
  //   const res = await fetch(`https://www.strava.com/api/v3/athletes/${session.athleteId}/routes?access_token=${session.accessToken}`)
  //   const data = await res.json()
  // }
  return (
    <>
      <Head>
        <title>Watch n Run</title>
        <meta name="description" content="Witness Watch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">
        {/* NAV BAR */}
        <div className="navbar bg-base-300">
          <div className="flex-1 ml-10">
          <Link href="/" className="btn btn-ghost normal-case text-xl">Watch n Run</Link>
          </div>
            {session ? (
               <div className="navbar-end flex space-x-6 mr-10">
               <div className="text-md">
                 {`Welcome ${session.user.name}`}
                 </div>
               <div className="dropdown dropdown-end">
               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                 <div className="w-10 rounded-full">
                   <img src={session.user.image} alt="user-image" />
                 </div>
               </label>
               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-500 rounded-box w-52">
                 <li>
                   <Link href="/profile" className="btn btn-ghost">
                     Profile
                   </Link>
                 </li>
                 <li><div className="btn btn-outline" onClick={() => signOut()}>Logout</div></li>
               </ul>
             </div>
             </div>
            ): (
              <div className="navbar-end flex space-x-4 mr-10">
                <div className="btn btn-active btn-primary" onClick={() => signIn()}>Sign in</div>  
              </div>
              )
          }
            </div>
          <section>
          <div  className="hero min-h-screen bg-base-200">
              {session ? (
                  <div className="hero-content w-full h-4/5">
                    <Map />
                  </div>
              ) : (
                <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-6xl font-bold">Hello there</h1>
                  <h5 className="text-xl py-6">Home from a run? Saw anything sus? Sign in and see if there were any crimes on your route</h5>
                  <div className="btn btn-primary" onClick={() => signIn()}>{`Let's go`}</div>  
                </div>
              </div>
              )}
            </div>
          </section>
      </main>
    </>
  )
}
