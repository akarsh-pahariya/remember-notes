import { useSelector } from 'react-redux';

const useUserInfo = () => {
  const userInfo = useSelector((store) => store.user.infoAvailable);
  return !userInfo;
};

export default useUserInfo;
