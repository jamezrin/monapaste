import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';

import HeaderPasteActions from 'components/header/HeaderActions';
import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderPasteInfo from 'components/header/HeaderPasteInfo';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import NormalEditor from 'components/editor/NormalEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';

function NewPastePage() {
  const [session, loading] = useSession();

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderPasteActions />
        <HeaderPasteInfo />
        <HeaderHelpAction />

        {session ? (
          <HeaderUserProfile session={session} />
        ) : (
          <HeaderLoginAction />
        )}
      </BaseHeader>

      <BaseBody>
        <NormalEditor />
      </BaseBody>
    </BaseMain>
  );
}

export default NewPastePage;
