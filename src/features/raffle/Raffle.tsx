import { FC, useEffect, useState } from "react";
import {
  RaffleObj,
  increasement,
  decreasement,
  deleteRaffle,
  selectTotalTickets,
} from "./raffleSlice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  padding: 4px;
  border-bottom: solid 1px #00c2c7;
  margin: 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 500px;

  span {
    margin-right: 2px;
    margin-left: 2px;
  }

  button {
    margin-right: 2px;
    margin-left: 2px;
    border-radius: 100%;
    aspect-ratio: 1/1;
    border: none;
    background-color: #daf8e3;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 150px;

  button {
    width: 20%;
  }
  span {
    width: 60%;
    display: block;
    text-align: center;
  }
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 26px;
`;


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
    <Wrapper>
      <Name>{raffle.name}</Name>
      <ButtonWrapper>
        <button onClick={onMinusClick}>-</button>
        <span>tickets: {raffle.ticket}</span>
        <button onClick={onPlusClick}>+</button>
      </ButtonWrapper>
      <button onClick={onDeleteClick}>삭제</button>
      <span>당첨 확률: {winPercentage}%</span>
    </Wrapper>
  );
};

export default Raffle;
