import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  decreasement,
  selectRaffle,
  selectTotalTickets,
} from "src/features/raffle/raffleSlice";
import { FC, useState } from "react";
import styled from "styled-components";

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

interface RouletteProps {}

const Roulette: FC<RouletteProps> = () => {
  const raffleList = useAppSelector(selectRaffle);
  const totalTickets = useAppSelector(selectTotalTickets);
  const dispatch = useAppDispatch();

  const [winner, setWinner] = useState("");

  const onRouletteClick = () => {
    if (totalTickets === 0) return;

    const percentages: number[] = new Array(raffleList.length).fill(0);

    let cumulativeSum = 0;
    raffleList.forEach((raffle, i) => {
      const percentage = raffle.ticket / totalTickets;
      percentages[i] = cumulativeSum + percentage;
      cumulativeSum += percentage;
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
    </div>
  );
};

export default Roulette;
