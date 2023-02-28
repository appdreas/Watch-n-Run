
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <img src={session.user.image} alt="" />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Login