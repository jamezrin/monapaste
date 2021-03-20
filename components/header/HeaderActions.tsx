import HeaderButton from '../../components/header/HeaderButton';
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

function HeaderActions() {
  return (
    <div className={styles.actions}>
      <HeaderButton>
        <VscSave title="Save" />
      </HeaderButton>
      <HeaderButton>
        <VscRepoForked title="Fork" />
      </HeaderButton>
      <HeaderButton>
        <VscNewFile title="New" />
      </HeaderButton>
      <HeaderButton>
        <VscCode title="Raw" />
      </HeaderButton>
      <HeaderButton>
        <VscHeart title="Heart" />
      </HeaderButton>
      <HeaderButton>
        <VscHistory title="Revisions" />
      </HeaderButton>
      <HeaderButton>
        <VscSettings title="Settings" />
      </HeaderButton>
    </div>
  );
}

export default HeaderActions;
