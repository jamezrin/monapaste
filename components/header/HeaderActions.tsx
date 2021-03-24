import HeaderButton from './HeaderButton';
import {
  VscHeart,
  VscCode,
  VscNewFile,
  VscRepoForked,
  VscSave,
  VscHistory,
  VscSettings,
} from 'react-icons/vsc';

import styles from '../../styles/Header.module.css';

type ViewerType = 'BOTH' | 'OWNER' | 'NOT_OWNER';

function HeaderPasteActions() {
  const viewerType: ViewerType = 'BOTH';

  const isOwner = viewerType === 'BOTH' || viewerType === 'OWNER';
  const isNotOwner = viewerType === 'BOTH' || viewerType === 'NOT_OWNER';

  return (
    <div className={styles.actions}>
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
    </div>
  );
}

export default HeaderPasteActions;
