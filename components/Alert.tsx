import styled from "styled-components";
import { fadeIn } from "../lib/styles";

const Alert = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  animation: ${fadeIn} 1s;
  margin: 0.5rem;
`;

export default Alert;
