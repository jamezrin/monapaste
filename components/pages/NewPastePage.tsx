import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderPasteInfo from 'components/header/HeaderPasteInfo';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderActionButton from 'components/header/HeaderActionButton';
import NormalEditor from 'components/editor/NormalEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import { VscSave } from 'react-icons/vsc';
import HeaderActionSection from 'components/header/HeaderActionSection';

function NewPastePage() {
  const [session, loading] = useSession();

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start">
          <HeaderActionButton>
            <VscSave title="Save" />
          </HeaderActionButton>
        </HeaderActionSection>

        <HeaderPasteInfo />

        <HeaderActionSection direction="end">
          <HeaderHelpAction />
          {session ? (
            <HeaderUserProfile session={session} />
          ) : (
            <HeaderLoginAction />
          )}
        </HeaderActionSection>
      </BaseHeader>

      <BaseBody>
        <NormalEditor />
      </BaseBody>
    </BaseMain>
  );
}

export default NewPastePage;
