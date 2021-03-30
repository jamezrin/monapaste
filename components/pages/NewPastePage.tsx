import { useSession } from 'next-auth/client';
import { css } from '@emotion/react';

import HeaderUserProfile from 'components/header/HeaderUserProfile';
import HeaderHelpAction from 'components/header/HeaderHelpAction';
import HeaderLoginAction from 'components/header/HeaderLoginAction';
import HeaderActionButton from 'components/header/HeaderActionButton';
import NormalEditor from 'components/editor/NormalEditor';
import { BaseMain, BaseHeader, BaseBody } from 'components/layout/BaseLayout';
import HeaderActionSection from 'components/header/HeaderActionSection';
import HeaderPasteInfoSection from 'components/header/HeaderPasteInfoSection';
import { usePasteDraft } from 'lib/context/PasteDraftContext';
import { VscSave } from 'react-icons/vsc';
import { Paste } from '@prisma/client';

function NewPastePage() {
  const [session, loading] = useSession();
  const { pasteDraft, setPasteDraft } = usePasteDraft();

  return (
    <BaseMain>
      <BaseHeader>
        <HeaderActionSection direction="start">
          <HeaderActionButton>
            <VscSave title="Save" />
          </HeaderActionButton>
        </HeaderActionSection>

        <HeaderPasteInfoSection>
          
        </HeaderPasteInfoSection>

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
        <NormalEditor onSaveContent={() => {}} />
      </BaseBody>
    </BaseMain>
  );
}

export default NewPastePage;
