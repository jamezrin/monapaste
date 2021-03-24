import { useState } from 'react';
import useOuterClick from 'lib/hooks/useOuterClick';
import styles from 'styles/Header.module.css';
import styles2 from 'styles/UserProfile.module.css';

function UserProfileButton(props) {
  return (
    <div
      className={styles2.button}
      {...props}
      role="button"
      aria-pressed="false"
      tabIndex={0}
    >
      {props.children}
    </div>
  );
}

function HeaderUserProfile() {
  const [open, setOpen] = useState(false);
  const userAreaRef = useOuterClick(() => {
    setOpen(false);
  });

  return (
    <div
      className={styles.userAreaWrapper}
      ref={userAreaRef}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.userArea}>
        <div className={styles.userAvatar}></div>
        <div className={styles.userName}>Jaime Martínez Rincón</div>
      </div>

      <div
        className={styles.userDropdown}
        style={{
          display: open ? 'block' : 'none',
        }}
      >
        <UserProfileButton>Your pastes</UserProfileButton>
        <UserProfileButton>Liked pastes</UserProfileButton>
        <UserProfileButton>Public pastes</UserProfileButton>
        <UserProfileButton>Preferences</UserProfileButton>
        <UserProfileButton>Logout</UserProfileButton>
      </div>
    </div>
  );
}

export default HeaderUserProfile;
