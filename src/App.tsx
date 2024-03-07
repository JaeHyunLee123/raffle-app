import { useForm } from "react-hook-form";
import {
  createRaffle,
  selectRaffle,
  deleteAll,
  selectTotalTickets,
} from "./features/raffle/raffleSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Raffle from "./features/raffle/Raffle";
import Roulette from "./components/Roulette";

interface RaffleForm {
  name: string;
}

function App() {
  const { register, handleSubmit, reset } = useForm<RaffleForm>();
  const dispatch = useAppDispatch();
  const raffleList = useAppSelector(selectRaffle);

  const totalTickets = useAppSelector(selectTotalTickets);

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
        <span>Total tickets: {totalTickets}</span>
      </div>
      <button onClick={onDeleteAll}>모두 삭제</button>
      <Roulette />
      <ul>
        {raffleList.map((raffle) => (
          <Raffle raffle={raffle} key={raffle.id} />
        ))}
      </ul>
    </div>
  );
}
export default App;
