import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes';
import 'antd/dist/reset.css';

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
