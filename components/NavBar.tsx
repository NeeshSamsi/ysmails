import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-8 text-black/60">
      <h1 className="font-bold text-2xl">YS Mails</h1>

      <div className="flex items-center justify-between text-xl underline">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
