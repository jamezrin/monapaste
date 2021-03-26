import { Paste } from '@prisma/client';
import { Session } from 'next-auth';
import {
  VscHeart,
  VscCode,
  VscNewFile,
  VscRepoForked,
  VscSave,
  VscHistory,
  VscSettings,
} from 'react-icons/vsc';

import HeaderButton from './HeaderActionButton';

type ViewerType = 'BOTH' | 'OWNER' | 'NOT_OWNER';

type Props = {
  session: Session;
  paste: Paste;
};

function HeaderPasteActions() {
  const viewerType: ViewerType = 'BOTH';

  const isOwner = viewerType === 'BOTH' || viewerType === 'OWNER';
  const isNotOwner = viewerType === 'BOTH' || viewerType === 'NOT_OWNER';

  return (
    <>
      {isOwner && (
        <HeaderButton>
          <VscSave title="Save" />
        </HeaderButton>
      )}

      <HeaderButton>
        <VscRepoForked title="Fork" />
      </HeaderButton>
      <HeaderButton>
        <VscNewFile title="New" />
      </HeaderButton>
      <HeaderButton>
        <VscCode title="Raw" />
      </HeaderButton>

      {isNotOwner && (
        <HeaderButton>
          <VscHeart title="Heart" />
        </HeaderButton>
      )}

      <HeaderButton>
        <VscHistory title="Revisions" />
      </HeaderButton>

      {isOwner && (
        <HeaderButton>
          <VscSettings title="Settings" />
        </HeaderButton>
      )}
    </>
  );
}

export default HeaderPasteActions;
