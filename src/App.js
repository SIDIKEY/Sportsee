import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Title from "./components/Title/Title";

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      
      <div className="dashboard">
        <div className="title">
          <Title
            text="Bonjour"
            username="Sidiki"
          />
          
        </div>
      </div>
    </div>
  );
}

export default App;
