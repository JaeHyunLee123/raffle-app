import { useForm } from "react-hook-form";
import {
  createRaffle,
  selectRaffle,
  deleteAll,
  selectTotalTickets,
  sort,
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

    padding-top: 10px;
    padding-bottom: 5px;
    padding-left: 5px;
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

const Wrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0.5rem;

  button {
    margin-right: 1rem;

    background-color: #00c2c7;

    border: none;
    border-radius: 8px;

    padding: 5px 8px 5px 8px;
  }
`;

const DeleteAllBtn = styled.button`
  margin: 1rem;

  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;

  font-size: 1rem;

  border-radius: 0.5rem;
  border: none;
  background-color: #ff8b94;
`;

const TotalTicketSpan = styled.span`
  margin: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
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
    <Wrapper>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="이름을 입력하세요"
            {...register("name", { required: true })}
          />
          <button>추가</button>
        </Form>
        <div>
          <TotalTicketSpan>Total tickets: {totalTickets}</TotalTicketSpan>
          <DeleteAllBtn onClick={onDeleteAll}>모두 삭제</DeleteAllBtn>
        </div>

        <ButtonWrapper>
          <button
            onClick={() => {
              dispatch(sort({ sortBy: "name", isAsc: true }));
            }}
          >
            이름 오름차순
          </button>
          <button
            onClick={() => {
              dispatch(sort({ sortBy: "name", isAsc: false }));
            }}
          >
            이름 내림차순
          </button>
          <button
            onClick={() => {
              dispatch(sort({ sortBy: "ticket", isAsc: true }));
            }}
          >
            티켓 오름차순
          </button>
          <button
            onClick={() => {
              dispatch(sort({ sortBy: "ticket", isAsc: false }));
            }}
          >
            티켓 내림차순
          </button>
        </ButtonWrapper>
        <ul>
          {raffleList.map((raffle) => (
            <Raffle raffle={raffle} key={raffle.id} />
          ))}
        </ul>
      </div>

      <Roulette />
    </Wrapper>
  );
}
export default App;
