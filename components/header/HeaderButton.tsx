import ResetButton from 'components/ResetButton';
import styles from '../../styles/Header.module.css';

function HeaderButton(props) {
  return (
    <ResetButton
      className={styles.button}
      {...props}
    />
  );
}

export default HeaderButton;
