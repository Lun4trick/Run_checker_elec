import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

interface MenuProps {
  isMenuOpen: boolean
  onOptionClick: () => void
}

type MenuElement = {
  option: string
  path: string
}

const menuElements: MenuElement[] = [
  {
    option: 'Mutatók',
    path: '/'
  },
  {
    option: 'Beállítások',
    path: '/settings'
  },
]

function Menu({ isMenuOpen, onOptionClick }: MenuProps) {
  return (
    <ul className={cn(
      'flex flex-col left-0 bg-slate-950 bg-opacity-70 text-white z-10 p-4 rounded-r-lg',
      'transition-all duration-500 ease-in-out items-center absolute top-12',
      { 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }
    
    )}>
      {menuElements.map(({ option, path }) => (
        <li
          className='p-2 rounded-xl hover:bg-slate-700 transition-all text-lg duration-300 cursor-pointer'
          onClick={onOptionClick}
          key={option}
        >
          <Link href={path}>
            {option}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Menu