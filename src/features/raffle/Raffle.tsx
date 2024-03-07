import { FC } from "react";
import {
  RaffleObj,
  increasement,
  decreasement,
  deleteRaffle,
} from "./raffleSlice";
import { useAppDispatch } from "src/app/hooks";

interface RaffleProps {
  raffle: RaffleObj;
}

const Raffle: FC<RaffleProps> = ({ raffle }) => {
  const dispatch = useAppDispatch();

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
    </div>
  );
};

export default Raffle;
