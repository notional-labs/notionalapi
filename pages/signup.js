import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session, status} = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "authenticated") {
    return <p>You are already signed-in.</p>
  }

  return (<p>Signup</p>)
}
