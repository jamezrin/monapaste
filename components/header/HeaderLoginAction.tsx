import { css } from '@emotion/react';
import { signIn } from 'next-auth/client';

import HeaderButton from './HeaderActionButton';

function HeaderLoginAction() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <HeaderButton
        css={css`
          background: var(--primary-brand);
          padding: 0.185em;
          font-size: 15px;
          margin: 0 0.55em;
          border-radius: 1px;

          &:hover,
          &:focus {
            color: #fff;
            background: var(--primary-4);
          }
        `}
        onClick={() => signIn()}
      >
        Login
      </HeaderButton>
    </div>
  );
}

export default HeaderLoginAction;
