import { FC } from "react";
import { RaffleObj, updateByAmount } from "./raffleSlice";
import { useAppDispatch } from "src/app/hooks";

interface RaffleProps {
  raffle: RaffleObj;
}

const Raffle: FC<RaffleProps> = ({ raffle }) => {
  const dispatch = useAppDispatch();

  const onMinusClick = () => {
    dispatch(updateByAmount({ amount: -1, id: raffle.id }));
  };

  const onPlusClick = () => {
    dispatch(updateByAmount({ amount: 1, id: raffle.id }));
  };

  return (
    <div>
      <span>name: {raffle.name}</span>
      <button onClick={onMinusClick}>-</button>
      <span>tickets: {raffle.ticket}</span>
      <button onClick={onPlusClick}>+</button>
    </div>
  );
};

export default Raffle;
