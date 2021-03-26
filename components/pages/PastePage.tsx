import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';

import HeaderPasteActions from 'components/header/HeaderActions';
import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderPasteInfo from 'components/header/HeaderPasteInfo';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import NormalEditor from 'components/editor/NormalEditor';

function PastePage() {
  const [session, loading] = useSession();

  return (
    <main
      css={css`
        height: 100vh;
        max-height: 100vh;
        display: flex;
        flex-direction: column;

        overflow: hidden;
      `}
    >
      <header
        css={css`
          --height: 40px;
          height: var(--height);
          min-height: var(--height);
          background: var(--gray-12);

          display: flex;
          flex-direction: row;
        `}
      >
        <HeaderPasteActions />
        <HeaderPasteInfo />
        <HeaderHelpAction />

        {session ? (
          <HeaderUserProfile session={session} />
        ) : (
          <HeaderLoginAction />
        )}
      </header>
      <article
        css={css`
          flex-grow: 1;
          overflow: hidden;
        `}
      >
        <NormalEditor />
      </article>
    </main>
  );
}

export default PastePage;
