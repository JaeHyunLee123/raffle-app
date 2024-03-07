import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  decreasement,
  selectRaffle,
  selectTotalTickets,
} from "src/features/raffle/raffleSlice";
import { FC, useState } from "react";

interface RouletteProps {}

const Roulette: FC<RouletteProps> = ({}) => {
  const raffleList = useAppSelector(selectRaffle);
  const totalTickets = useAppSelector(selectTotalTickets);
  const dispatch = useAppDispatch();

  const [winner, setWinner] = useState("");

  const onRouletteClick = () => {
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
      <button onClick={onRouletteClick}>룰렛 실행</button>
      {winner ? <span>당첨자: {winner}</span> : ""}
    </div>
  );
};

export default Roulette;
