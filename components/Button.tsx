import styled from "styled-components";
import { resetButton } from "../lib/styles";
import { ComponentProps } from "react";

const Button = styled.button.attrs<ComponentProps<"button">>(
  ({ children, ...props }) => ({
    ...props,
    children: <span>{children}</span>,
  })
)`
  ${resetButton}
  color: #000;
  background: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  line-height: 1;

  &:hover {
    transform: scale(1.025);
  }
  & > span {
    position: relative;
    top: 1px;
  }
`;

export default Button;
