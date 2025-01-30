import { useSelector } from 'react-redux';
import ShimmerHome from '../components/ShimmerHome';

const GlobalLoader = () => {
  const isLoading = useSelector((store) => store.loading.isLoading);

  return isLoading && <ShimmerHome />;
};

export default GlobalLoader;
