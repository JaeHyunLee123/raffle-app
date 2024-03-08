import styled from "styled-components";

const Wrapper = styled.header`
  background-color: #00c2c7;

  padding: 10px;

  text-align: right;
  font-size: 48px;
  font-weight: 800;
  color: white;
`;

const Header = () => {
  return <Wrapper>Roulette</Wrapper>;
};

export default Header;
