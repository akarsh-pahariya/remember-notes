import { Provider } from 'react-redux';
import appStore from './store/appStore';
import Body from './pages/Body';
import { ToastContainer } from 'react-toastify';
import GlobalLoader from './services/GlobalLoader';

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-black text-white">
        <GlobalLoader />
        <Body />
        <ToastContainer position="bottom-left" theme="dark" />
      </div>
    </Provider>
  );
};

export default App;
