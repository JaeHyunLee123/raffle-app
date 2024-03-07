import { FC } from "react";
import type { RaffleObj } from "./raffleSlice";

interface RaffleProps {
  raffle: RaffleObj;
}

const Raffle: FC<RaffleProps> = ({ raffle }) => {
  return (
    <div>
      <span>name: {raffle.name}</span>
      <span>tickets: {raffle.ticket}</span>
    </div>
  );
};

export default Raffle;
