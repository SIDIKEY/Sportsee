import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Title from "./components/Title/Title";
import useData from "./Hook/UseData";

import './App.css';

function App() {

  const url = getCurrentURL();
  let id = url.split(`3001/`).pop();

  const [data, loading, error] = useData(id);

  function getCurrentURL() {
    return window.location.href;
  } 

  console.log(data)
  
  return (
    <div>
      <Header />
      <Sidebar />
      
      <div className="dashboard">
        <div className="title">
          <Title
            title="Bonjour"
            username={
              loading ? "loading" : data ? data.user.userInfos.firstName : ""
            }
          />
          
        </div>
      </div>
    </div>
  );
}

export default App;
