import Header from "./components/Header/Header";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Title from "./components/Title/Title";
import useData from "./Hook/UseData";
import RadChart from "./components/Radar_chart/Radar_chart";
import Simplebarchart from "./components/Bar_chart/Simplebarchart.jsx";
import ChartLine from "./components/Line_chart/Line_chart.jsx";
import ChartScore from "./components/score_chart/Score_chart.jsx";
import caloriesWidget from "./Assets/calories-icon.svg";
import proteinWidget from "./Assets/protein-icon.svg";
import carbsWidget from "./Assets/carbs-icon.svg";
import fatWidget from "./Assets/fat-icon.svg";
import { useFetch } from "./Hook/useFetch.js";
import "./App.css";
import useFormat from "./components/UseFormat/UseFormat.js";

function App() {

  
  
  function getCurrentURL() {
    return window.location.href;
  }

  let url = getCurrentURL();
  let id = url.split(`3001/`).pop();
  let format = useFormat(id);
  
  console.log(format);


  const [state, setState] = useState("api");

  const onToggleResource = () => {
    setState(state === "mock" ? "api" : "mock");
  };

  const [urlMock, setUrl] = useState("http://localhost:3001");
  const { tData, error } = useFetch(urlMock);

  const [data, loading] = useData(id);

  

  console.log(data);
  const dataToUse = state === "api" ? data : tData;

  console.log({dataToUse});
  if (!dataToUse?.user) {
    return (
      <div className="Error">
        
        <h1>ERROR 404</h1>
      </div>
    );
  }

  return (
    <div>
      <Header onToggleResource={onToggleResource} resource={state} />
      <Sidebar />

      <div className="dashboard">
        <div className="Title">
          <Title
            title="Bonjour"
            username={dataToUse?.user?.userInfos?.firstName || "John Doe"}
          />
          <h2>Félicitations vous avez explosé vos objectifs hier 👏</h2>
        </div>

        <div className="mainWrapper">
          <div className="main">
            <div>
              <Simplebarchart data={dataToUse?.activity?.sessions || ""} />
            </div>

            <div className="charts_wrapper">
              <ChartLine data={dataToUse?.averageSessions?.sessions || ""} />

              <RadChart
                dataPerf={format ? format : dataToUse?.performance?.data}
              />

              <ChartScore
                dataScore={
                  Number(dataToUse?.user?.todayScore) || dataToUse?.user?.score
                }
              />
            </div>
          </div>

          <aside>
            <div className="widgets_wrapper">
              <div className="calories_widget">
                <div className="cal_widget">
                  <img
                    src={caloriesWidget}
                    alt="calorie icône"
                    className="c_widget"
                  />
                </div>
                <div>
                  <p className="widget_value">
                    {dataToUse?.user?.keyData?.calorieCount + "kcal" || ""}
                  </p>
                  <p className="widget_unit">Calories</p>
                </div>
              </div>
              <div className="calories_widget">
                <div className="cal_widget">
                  <img
                    src={proteinWidget}
                    alt="proteines icône"
                    className="c_widget"
                  />
                </div>
                <div>
                  <p className="widget_value">
                    {dataToUse?.user?.keyData?.proteinCount + "g" || ""}
                  </p>
                  <p className="widget_unit">Protéines</p>
                </div>
              </div>
              <div className="calories_widget">
                <div className="cal_widget">
                  <img
                    src={carbsWidget}
                    alt="gludides icône"
                    className="c_widget"
                  />
                </div>
                <div>
                  <p className="widget_value">
                    {dataToUse?.user?.keyData?.carbohydrateCount + "g" || ""}
                  </p>
                  <p className="widget_unit">Glucides</p>
                </div>
              </div>
              <div className="calories_widget">
                <div className="cal_widget">
                  <img
                    src={fatWidget}
                    alt="lipides icône"
                    className="c_widget"
                  />
                </div>
                <div>
                  <p className="widget_value">
                    {dataToUse?.user?.keyData?.lipidCount + "g" || ""}
                  </p>
                  <p className="widget_unit">lipides</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
