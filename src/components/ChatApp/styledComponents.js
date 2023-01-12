import styled from 'styled-components'

export const UsernameAcronym = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  color: #ffffff;
  height: 30px;
  width: 30px;
  border-radius: 40px;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  @media screen and (min-width: 768px) {
    height: 40px;
    width: 40px;
  }
`
