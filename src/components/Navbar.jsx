import React from "react";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from 'gsap'

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [isIndicatorActive, setisIndicatorActive] = useState(false);
  const [lastscrollY, setlastscrollY] = useState(0);
  const [isNavVisible, setisNavVisible] = useState(true);
  const navContainerRef = useRef(null);
  const audoElementRef = useRef(null);

  const { y: currentscrollY } = useWindowScroll();

  useEffect(() => {
    if(currentscrollY === 0) {
      setisNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav')
    } else if (currentscrollY > lastscrollY) {
      setisNavVisible(false);
      navContainerRef.current.classList.add('floating-nav')
    } else if (currentscrollY < lastscrollY) {
      setisNavVisible(true)
      navContainerRef.current.classList.add('floating-nav')
    }
    setlastscrollY(currentscrollY);


  }, [currentscrollY,lastscrollY]);

  useEffect(() => {

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });



  },[isNavVisible])

  const toggleAudioIndicatior = () => {
    setisAudioPlaying((prev) => !prev);
    setisIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audoElementRef.current.play();
    } else {
      audoElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2  w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center ">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicatior}
            >
              <audio
                ref={audoElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
