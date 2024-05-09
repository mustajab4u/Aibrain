// 🌟 Readable and Reusable Header Component 🌟

import { useLocation } from 'react-router-dom';
import { navigation } from '../constants';
import Button from '../components/Button';
import MenuSvg from '../assets/svg/MenuSvg';
import { HambugerMenu } from './design/Header';
import { useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const Header = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      disablePageScroll();
    } else {
      setOpenNavigation(true);
      enablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
    enablePageScroll();
  };
  return (
    <div
      className={`w-full sticky top-0 z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <h1 className="text-3xl">Aibrain</h1>
        </a>
        <nav
          className={`fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent ${
            openNavigation ? 'flex' : 'hidden'
          }`}
        >
          <div className="relative lg:h-auto h-screen flex z-2 items-center flex-col justify-center m-auto lg:flex-row">
            {navigation.map(item => (
              <a
                className={`block relative font-code text-2xl uppercase text-n-1 transition-color hover:text-color-1 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } p-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === location.hash
                    ? ' z-2 lg:text-n-1'
                    : 'lg:text-n-1/50'
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                key={item.id}
                href={item.url}
                onClick={handleClick}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HambugerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 hover:text-n-1 lg:block transition-colors"
        >
          New account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Login
        </Button>
        <Button
          className={'ml-auto lg:hidden'}
          onClick={toggleNavigation}
          px={'px-3'}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
