import styles from '../../styles/Header.module.css';

function HeaderButton(props) {
  return (
    <div
      className={styles.button}
      {...props}
      role="button"
      aria-pressed="false"
      tabIndex={0}
    >
      {props.children}
    </div>
  );
}

export default HeaderButton;
