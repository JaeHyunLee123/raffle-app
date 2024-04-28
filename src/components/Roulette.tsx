import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  decreasement,
  selectRaffle,
  selectTotalTickets,
} from "src/features/raffle/raffleSlice";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Modal from "./Modal";

const ROTATE_ANIMATION_DURATION_TIME = 20; //ms
const ROULETTE_COLORS = [
  "#d11141",
  "#00b159",
  "#00aedb",
  "#f37735",
  "#ffc425",
  "#a200ff",
  "#ff0097",
  "#00aba9",
  "#a05000",
  "#e671b8",
  "#f09609",
];
const ROULETTE_SIZE = 500; //px

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
  width: ${ROULETTE_SIZE}px;
  height: ${ROULETTE_SIZE}px;
  border: 3px solid black;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
  position: relative;
  z-index: -1;
`;

const RouletteContent = styled.div<{
  $rotationDegree: number;
}>`
  font-size: 1.2rem;
  font-weight: 700;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 2;
  transform: rotate(${(props) => props.$rotationDegree}deg);
`;

const sleep = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

interface RouletteProps {}

const Roulette: FC<RouletteProps> = () => {
  const raffleList = useAppSelector(selectRaffle);
  const totalTickets = useAppSelector(selectTotalTickets);
  const dispatch = useAppDispatch();

  const [rotationDegree, setRotationDegree] = useState(0);

  const [cumulativeSums, setCumulativeSums] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [winnerName, setWinnerName] = useState("");
  const [winnerId, setWinnerId] = useState(-1);

  useEffect(() => {
    const temp: number[] = Array(raffleList.length).fill(0);
    let cumulativeSum = 0;
    raffleList.forEach((raffle, i) => {
      temp[i] = cumulativeSum + raffle.ticket;
      cumulativeSum = temp[i];
    });
    setCumulativeSums(temp);
  }, [raffleList]);

  const onRouletteClick = async () => {
    if (totalTickets === 0) return;

    const intervalId = setInterval(() => {
      setRotationDegree((prevDegree) => prevDegree + 10);
    }, ROTATE_ANIMATION_DURATION_TIME);

    await sleep(1000);

    clearInterval(intervalId);

    const percentages: number[] = new Array(raffleList.length).fill(0);

    raffleList.forEach((_, i) => {
      percentages[i] = cumulativeSums[i] / totalTickets;
    });

    const random = Math.random();

    const winnerAngle = 360 - random * 360;

    setRotationDegree(winnerAngle);

    for (let i = 0; i < percentages.length; i++) {
      if (random < percentages[i]) {
        setWinnerName(raffleList[i].name);
        setWinnerId(raffleList[i].id);
        break;
      }
    }

    setIsModalOpen(true);
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //draw roullet
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) return;

    const ctx = canvas.getContext("2d");

    if (ctx === null) return;

    if (totalTickets === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const radius = ROULETTE_SIZE / 2;

    raffleList.forEach((raffle, i) => {
      ctx.fillStyle = ROULETTE_COLORS[i % ROULETTE_COLORS.length];

      const standard =
        ((cumulativeSums[i] - raffle.ticket / 2) / totalTickets) * 360 - 90;
      const size = (raffle.ticket / totalTickets) * 360;

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(
        radius, //x
        radius, //y
        radius, //radius
        (Math.PI / 180) * (standard - size / 2), //start angle
        (Math.PI / 180) * (standard + size / 2) //end angle
      );
      ctx.closePath();
      ctx.fill();
    });
  }, [cumulativeSums, raffleList, totalTickets]);

  return (
    <div>
      <RouletteBtn onClick={onRouletteClick}>룰렛 실행</RouletteBtn>
      {winnerName ? <WinnerSpan>당첨자: {winnerName}</WinnerSpan> : ""}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg //arrow
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
          style={{ height: 50, width: 50, display: "block", color: "red" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
          />
        </svg>
      </div>

      <Circle
        animate={{ rotate: rotationDegree }}
        transition={{
          duration: ROTATE_ANIMATION_DURATION_TIME / 1000,
          ease: "linear",
        }}
      >
        <canvas
          ref={canvasRef}
          width={`${ROULETTE_SIZE}px`}
          height={`${ROULETTE_SIZE}px`}
          style={{
            zIndex: 1,
          }}
        />
        {raffleList.map((raffle, i) =>
          raffle.ticket > 0 ? (
            <RouletteContent
              key={raffle.id}
              $rotationDegree={
                ((cumulativeSums[i] - raffle.ticket / 2) / totalTickets) * 360
              }
            >
              {raffle.name}
            </RouletteContent>
          ) : (
            ""
          )
        )}
      </Circle>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          dispatch(decreasement(winnerId));
          setIsModalOpen(false);
        }}
      >
        <span>{winnerName} 당첨!</span>
      </Modal>
    </div>
  );
};

export default Roulette;
