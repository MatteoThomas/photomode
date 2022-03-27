import styled from "styled-components";
import { motion } from "framer-motion/dist/framer-motion";

export const HeroMotion = styled(motion.div)``;

export const Jumbotron = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 1rem;
  height: 50%;
  color: aliceblue;
  margin: 5rem 0;
`;

export const Title = styled.div`
  text-align: center;
  font-size: clamp(5.2rem, 7.5vw, 7rem);
  font-family: "Kaushan Script", cursive;
  letter-spacing: -0.2rem;
  line-height: 2rem;

  & span {
    line-height: 0.2em;
    font-family: "Raleway", sans-serif;
    font-size: 0.23em;
    letter-spacing: 0.1em;
  }
`;
