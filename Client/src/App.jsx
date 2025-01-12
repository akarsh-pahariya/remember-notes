import { Provider } from 'react-redux';
import appStore from './store/appStore';
import Body from './pages/Body';

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-black text-white">
        <Body />
      </div>
    </Provider>
  );
};

export default App;
