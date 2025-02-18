import styled from "styled-components";

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  gap: 5px;
  margin-top: 20px;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 16px;
  border: 3px solid #d9c76c;
  border-radius: 5px;
`;

export const Text = styled.p`
  font-family: "SecondFont", san-serif;
  font-weight: 400;
  color: #7f7134;
`;
