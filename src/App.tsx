import React from "react";
import { useForm } from "react-hook-form";
import { createRaffle, selectRaffle } from "./features/raffle/raffleSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

interface RaffleForm {
  name: string;
}

function App() {
  const { register, handleSubmit, reset } = useForm<RaffleForm>();
  const dispatch = useAppDispatch();
  const raffleList = useAppSelector(selectRaffle);

  const onSubmit = ({ name }: RaffleForm) => {
    dispatch(createRaffle(name));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="이름을 입력하세요"
          {...register("name", { required: true })}
        />
        <button>+</button>
      </form>
      <ul>
        {raffleList.map((raffle) => (
          <li>
            <span>{raffle.name}</span>
            <span>{raffle.ticket}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
