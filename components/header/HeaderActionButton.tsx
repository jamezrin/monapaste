import ResetButton from 'components/blocks/ResetButton';
import { css } from '@emotion/react';

function HeaderActionButton({ children, ...props }) {
  return (
    <ResetButton
      {...props}
      css={css`
        margin: 0 0.05em;
        padding: 0 1em;
        color: #fff;

        &:hover,
        &:focus {
          color: var(--primary-brand);
          background: var(--gray-11);
        }
      `}
    >
      {children}
    </ResetButton>
  );
}

export default HeaderActionButton;
