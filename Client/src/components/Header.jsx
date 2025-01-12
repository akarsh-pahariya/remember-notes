import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';

const Header = () => {
  const infoAvailable = useSelector((store) => store.user.infoAvailable);

  return (
    <div className="bg-black text-white py-[15px] px-6 flex justify-between items-center flex-none">
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon icon={faBook} className="text-4xl" />
        <h1 className="text-3xl font-bold">Remember</h1>
      </div>
      {infoAvailable && <UserInfo />}
    </div>
  );
};

export default Header;
