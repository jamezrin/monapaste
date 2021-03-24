import HeaderButton from './HeaderButton';
import { VscQuestion } from 'react-icons/vsc';
import { useRouter } from 'next/router';

function HeaderHelpAction() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/help');
  };

  return (
    <HeaderButton onClick={handleClick}>
      <VscQuestion title="Help" />
    </HeaderButton>
  );
}

export default HeaderHelpAction;
