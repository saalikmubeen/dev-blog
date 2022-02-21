import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from "next-themes";
import {FaMoon, FaSun} from "react-icons/fa"

const Header = () => {
    const { theme, setTheme } = useTheme();
  return (
      <header className="bg-gray-900 text-gray-100 shadow w-full">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <Link href="/">
                  <a className="flex items-center font-medium md:w-1/5 mb-4 md:mb-0">
                      <Image
                          src="/images/logo.png"
                          alt="Logo"
                          width={40}
                          height={40}
                      />
                      <span className="ml-3 text-xl">Dev Blog</span>
                  </a>
              </Link>

              <nav className="flex items-center flex-wrap md:w-4/5 justify-end text-base md:ml-auto">
                  <Link href="/blog">
                      <a className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
                          Blog
                      </a>
                  </Link>

                  <Link href="/about">
                      <a className="mx-5 cursor-pointer uppercase hover:text-indigo-300">
                          About
                      </a>
                  </Link>

                  <button
                      onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                      }
                  >
                      {theme === "dark" ? <FaSun/> : <FaMoon />}
                  </button>
              </nav>
          </div>
      </header>
  );
}

export default Header