import styles from '../../styles/Header.module.css';

import HeaderTitle from './HeaderTitle';

function HeaderPasteInfo() {
  return (
    <div className={styles.pasteInfoArea}>
      <HeaderTitle />
    </div>
  );
}

export default HeaderPasteInfo;
