import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components/macro";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Hero = ({ slides }) => {
  const [navHeight, setNavHeight] = useState("");
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    const height = document.querySelector(".nav-home").clientHeight;
    setNavHeight(height);
  }, []);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(nextSlide, 6000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const HeroSection = styled.section`
    height: calc(100vh - ${navHeight}px);
    overflow: hidden;
    position: relative;
  `;
  const HeroWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  `;

  const HeroSlide = styled.div`
    z-index: 1;
    height: 100%;
  `;
  const HeroSlider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const HeroImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;
  const HeroContent = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 40%;
    height: 100%;
    padding: 0 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 1600px;
    color: #fff;

    h1 {
      font-size: clamp(30px, 8vw, 50px);
      font-weight: 400;
      font-family: "Lora", serif;
      color: #535744;
      text-transfrom: uppercase;
      text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
      text-align: center;
    }

    a {
      font-size: 16px;
      margin: 16px;
      padding: 16px 45px;
      text-transform: capitalize;
      color: #fff;
      background: #ff6600;
    }
  `;

  return (
    <HeroSection>
      <HeroWrapper>
        {slides.map((slide, idx) => (
          <HeroSlide key={idx}>
            <AnimatePresence exitBeforeEnter>
              {idx === current && (
                <motion.HeroSlider
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 1 }}>
                  <HeroImage src={slide.img} alt={slide.alt} />
                  <HeroContent>
                    <h1>{slide.title}</h1>
                    <Link to={slide.path}>{slide.label}</Link>
                  </HeroContent>
                </motion.HeroSlider>
              )}
            </AnimatePresence>
          </HeroSlide>
        ))}
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
