import { PropsWithChildren } from "react";
import styled from "styled-components";
import { fadeIn } from "../lib/styles";
import Button from "./Button";

export type AlertProps = PropsWithChildren<{
  className?: string;
}>;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s;
  margin: 0.5rem;
`;

export const AlertButton = styled(Button)`
  margin-top: 1rem;
`;

const Alert: React.FC<AlertProps> = ({ className, children }) => {
  return <AlertContainer className={className}>{children}</AlertContainer>;
};

export default Alert;
