import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const UserInfo = () => {
  const name = useSelector((store) => store.user.userData.name);
  const navigate = useNavigate();

  const redirectToUser = () => {
    navigate('/user');
  };

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex">
      <button
        onClick={redirectToHome}
        className="flex items-center mx-3 space-x-3 px-5 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>

      <button
        onClick={redirectToUser}
        className="flex items-center space-x-3 px-5 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <FontAwesomeIcon icon={faUser} className="text-3xl" />
        <h1 className="text-xl font-semibold">Hello, {name}</h1>
      </button>
    </div>
  );
};

export default UserInfo;
