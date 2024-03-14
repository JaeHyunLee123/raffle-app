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
import styled from "styled-components";

const Form = styled.form`
  margin: 1rem;
  padding: 0.5rem;

  input {
    border: none;
    border-bottom: 1px solid black;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  button {
    margin-right: 2px;
    margin-left: 2px;

    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;

    border-radius: 0.5rem;
    font-size: 1.2rem;

    border: none;
    background-color: #daf8e3;
  }
`;

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="이름을 입력하세요"
          {...register("name", { required: true })}
        />
        <button>추가</button>
      </Form>
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
