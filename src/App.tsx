
import { ToastContainer } from 'react-toastify';
import ManageRoute from './router/ManageRoute.tsx';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {<ManageRoute />}
      <ToastContainer />
    </div>
  );
}

export default App;
