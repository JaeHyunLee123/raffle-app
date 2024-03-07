import React from "react";
import { useForm } from "react-hook-form";
import { createRaffle } from "./features/raffle/raffleSlice";
import { useAppDispatch } from "./app/hooks";

interface RaffleForm {
  name: string;
}

function App() {
  const { register, handleSubmit, reset } = useForm<RaffleForm>();
  const dispatch = useAppDispatch();

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
    </div>
  );
}

export default App;
