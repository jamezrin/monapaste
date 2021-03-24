import Head from 'next/head';
import styles from '../styles/Home.module.css';

import HeaderPasteActions from '../components/header/HeaderActions';
import HeaderUserProfile from '../components/header/HeaderUserProfile';
import HeaderPasteInfo from '../components/header/HeaderPasteInfo';
import HeaderHelpAction from '../components/header/HeaderHelpAction';
import NormalEditor from '../components/editor/NormalEditor';

function HomePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <HeaderPasteActions />
        <HeaderPasteInfo />
        <HeaderHelpAction />
        <HeaderUserProfile />
      </header>
      <article className={styles.editor}>
        <NormalEditor />
      </article>
    </main>
  );
}

export default HomePage;
