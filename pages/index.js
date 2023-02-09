import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession()
  if (session) {
    return (
      <>Hello {session.user.email}</>
    )
  }
  return (<>Hello guest, please sign-in to continue.</>)
}
