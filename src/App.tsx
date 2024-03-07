import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createRaffle,
  selectRaffle,
  deleteAll,
} from "./features/raffle/raffleSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Raffle from "./features/raffle/Raffle";

interface RaffleForm {
  name: string;
}

function App() {
  const { register, handleSubmit, reset } = useForm<RaffleForm>();
  const dispatch = useAppDispatch();
  const raffleList = useAppSelector(selectRaffle);

  const [totalTicket, setTotalTicket] = useState(0);

  useEffect(() => {
    let temp = 0;
    raffleList.forEach((raffle) => {
      temp += raffle.ticket;
    });
    setTotalTicket(temp);
  }, [raffleList]);

  const onSubmit = ({ name }: RaffleForm) => {
    dispatch(createRaffle(name));
    reset();
  };

  const onDeleteAll = () => {
    dispatch(deleteAll());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="이름을 입력하세요"
          {...register("name", { required: true })}
        />
        <button>추가</button>
      </form>
      <div>
        <span>Total tickets: {totalTicket}</span>
      </div>
      <button onClick={onDeleteAll}>모두 삭제</button>
      <ul>
        {raffleList.map((raffle) => (
          <Raffle raffle={raffle} />
        ))}
      </ul>
    </div>
  );
}
export default App;
