import { css, keyframes } from "styled-components";

export const resetButton = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize "line-height". Cannot be changed from "normal" in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable "input" types in iOS */
  -webkit-appearance: none;
`;

export const resetInput = css`
  appearance: none;
  border: none;
  outline: none;
`;

export const fadeIn = keyframes`
    from {
        opacity: 0.0;
    }
    to {
        opacity: 1.0;
    }
`;
