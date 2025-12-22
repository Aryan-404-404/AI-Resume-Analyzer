import {React, useState} from 'react'
import Help from './Help'

const Navbar = () => {
    
    const [isHover, setIsHover] = useState(false)
    const handleMouseEnter = ()=>{
        setIsHover(true);
    }
    const handleMouseLeave = ()=>{
        setIsHover(false);
    }

    return (
        <nav className="border-b bg-slate-900 border-slate-800 w-full top-0 sticky z-10">
            <div className="mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                        AI
                    </div>
                    <span className="font-bold text-lg">Resume Analyzer</span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-6 pr-5">
                    <a href="/" className="text-slate-300 hover:text-white transition-colors">
                        Home
                    </a>
                    <a href="/" className="text-slate-300 hover:text-white transition-colors relative top-0"
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <svg className='h-6 w-6 invert' width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 10C0 4.478 4.478 0 10 0c5.523 0 10 4.478 10 10 0 5.523-4.477 10-10 10-5.522 0-10-4.477-10-10zm11.125 2.002H8.989v-.141c.01-1.966.492-2.254 1.374-2.782.093-.056.19-.114.293-.178.73-.459 1.292-1.038 1.292-1.883 0-.948-.743-1.564-1.666-1.564-.851 0-1.657.398-1.712 1.533H6.304C6.364 4.693 8.18 3.5 10.294 3.5c2.306 0 3.894 1.447 3.894 3.488 0 1.382-.695 2.288-1.805 2.952l-.238.144c-.79.475-1.009.607-1.02 1.777V12zm.17 3.012a1.344 1.344 0 01-1.327 1.328 1.32 1.32 0 01-1.328-1.328 1.318 1.318 0 011.328-1.316c.712 0 1.322.592 1.328 1.316z" fill="#5C5F62"/></svg>
                        {isHover && (
                            <Help/>
                        )}
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
