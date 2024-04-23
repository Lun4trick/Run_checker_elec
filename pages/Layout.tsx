import React, { useState } from "react";
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import cn from 'classnames';

export interface LayoutProps  { 
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <div className='flex flex-col h-screen'>
      <Navbar 
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <Menu 
        isMenuOpen={isMenuOpen} 
        onOptionClick={toggleMenu}
      />
      <main 
        className={cn(
        `bg-white w-full h-full`,
        )}
      >
        {props.children}
      </main>
    </div>
  );
};

export default Layout;