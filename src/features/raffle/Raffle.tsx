import { FC, useEffect, useState } from "react";
import {
  RaffleObj,
  increasement,
  decreasement,
  deleteRaffle,
  selectTotalTickets,
} from "./raffleSlice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

interface RaffleProps {
  raffle: RaffleObj;
}

const Raffle: FC<RaffleProps> = ({ raffle }) => {
  const dispatch = useAppDispatch();
  const totalTickets = useAppSelector(selectTotalTickets);

  const [winPercentage, setWinPercentage] = useState("");

  useEffect(() => {
    if (raffle.ticket === 0) {
      setWinPercentage("0");
    } else {
      setWinPercentage(((raffle.ticket / totalTickets) * 100).toFixed(2));
    }
  }, [raffle, totalTickets]);

  const onMinusClick = () => {
    dispatch(decreasement(raffle.id));
  };

  const onPlusClick = () => {
    dispatch(increasement(raffle.id));
  };

  const onDeleteClick = () => {
    dispatch(deleteRaffle(raffle.id));
  };

  return (
    <div>
      <span>name: {raffle.name}</span>
      <button onClick={onMinusClick}>-</button>
      <span>tickets: {raffle.ticket}</span>
      <button onClick={onPlusClick}>+</button>
      <button onClick={onDeleteClick}>삭제</button>
      <span>당첨 확률: {winPercentage}%</span>
    </div>
  );
};

export default Raffle;
