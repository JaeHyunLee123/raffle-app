import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  decreasement,
  selectRaffle,
  selectTotalTickets,
} from "src/features/raffle/raffleSlice";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ROTATE_ANIMATION_DURATION_TIME = 100; //ms

const RouletteBtn = styled.button`
  margin: 1rem;

  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;

  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;

  border: none;
  background-color: #bae1ff;
`;

const WinnerSpan = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
`;

const Circle = styled(motion.div)`
  width: 500px;
  height: 500px;
  border: 3px solid black;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
  position: relative;
`;

const RouletteContent = styled.div<{ $rotationDegree: number }>`
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  transform: rotate(${(props) => props.$rotationDegree}deg);
`;

interface RouletteProps {}

const Roulette: FC<RouletteProps> = () => {
  const raffleList = useAppSelector(selectRaffle);
  const totalTickets = useAppSelector(selectTotalTickets);
  const dispatch = useAppDispatch();

  const [isRotating, setIsRotating] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const [cumulativeSums, setCumulativeSums] = useState<number[]>([]);

  useEffect(() => {
    const temp: number[] = Array(raffleList.length).fill(0);

    raffleList.forEach((raffle, i) => {
      if (i === 0) {
        temp[i] = raffle.ticket;
      } else {
        temp[i] = temp[i - 1] + raffle.ticket;
      }
    });

    setCumulativeSums(temp);
  }, [raffleList]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (isRotating) {
      intervalId = setInterval(() => {
        setRotationDegree((prevDegree) => prevDegree + 10);
      }, ROTATE_ANIMATION_DURATION_TIME);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRotating]);

  const [winner, setWinner] = useState("");

  const onRouletteClick = () => {
    if (totalTickets === 0) return;

    const percentages: number[] = new Array(raffleList.length).fill(0);

    raffleList.forEach((_, i) => {
      percentages[i] = cumulativeSums[i] / totalTickets;
    });

    const random = Math.random();

    for (let i = 0; i < percentages.length; i++) {
      if (random < percentages[i]) {
        setWinner(raffleList[i].name);
        dispatch(decreasement(raffleList[i].id));
        break;
      }
    }
  };

  return (
    <div>
      <RouletteBtn onClick={onRouletteClick}>룰렛 실행</RouletteBtn>
      {winner ? <WinnerSpan>당첨자: {winner}</WinnerSpan> : ""}
      <button
        onClick={() => {
          setIsRotating(!isRotating);
        }}
      >
        돌려라 돌림판
      </button>
      <Circle
        animate={{ rotate: rotationDegree }}
        transition={{
          duration: ROTATE_ANIMATION_DURATION_TIME / 1000,
          ease: "linear",
        }}
      >
        {raffleList.map((raffle, i) => (
          <RouletteContent
            key={raffle.id}
            $rotationDegree={(cumulativeSums[i] / totalTickets) * 360}
          >
            {raffle.name}
          </RouletteContent>
        ))}
      </Circle>
    </div>
  );
};

export default Roulette;
