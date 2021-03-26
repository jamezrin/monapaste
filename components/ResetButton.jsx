import { css } from '@emotion/react';

function ResetButton({ children, ...props }) {
  return (
    <button
      {...props}
      css={css`
        background: none;
        border: inherit;
        cursor: pointer;
        outline: inherit;
        font: inherit;
      `}
    >
      {children}
    </button>
  );
}

export default ResetButton;
