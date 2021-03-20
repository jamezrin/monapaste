import Head from 'next/head';
import styles from '../styles/Home.module.css';

import HeaderActions from '../components/header/HeaderActions';
import HeaderUserProfile from '../components/header/HeaderUserProfile';
import HeaderPasteInfo from '../components/header/HeaderPasteInfo';
import NormalEditor from '../components/editor/NormalEditor';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <HeaderActions />
        <HeaderPasteInfo />
        <HeaderUserProfile />
      </header>
      <article className={styles.editor}>
        <NormalEditor />
      </article>
    </main>
  );
}
