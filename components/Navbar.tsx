import React from 'react'
import { 
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/solid'

interface NavbarProps {
  toggleMenu: () => void
  isMenuOpen: boolean
}

function Navbar({ 
  toggleMenu,
  isMenuOpen
}: NavbarProps) {
  return (
    <div 
      className='col-span-4 w-full px-3 py-2 bg-gradient-to-l from-slate-800 to-slate-900'
      id='navbar'
    >
      <button 
        className='rounded-xl p-1 border-[1px] border-slate-600 text-slate-200 transition-all group active:bg-green-800 duration-400'
        onClick={toggleMenu}
      >
        {isMenuOpen 
            ? <XMarkIcon className='h-6 w-6 group/item group-hover:scale-110 transition-all duration-300' /> 
            : <Bars3Icon className='h-6 w-6 group/item group-hover:scale-110 transition-all duration-300' />}
      </button>
    </div>
  )
}

export default Navbar