import React from "react";
import Header from "./components/Header/Header";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Title from "./components/Title/Title";
import RadChart from "./components/Radar_chart/Radar_chart";
import Simplebarchart from "./components/Bar_chart/Simplebarchart.jsx";
import ChartLine from "./components/Line_chart/Line_chart.jsx";
import ChartScore from "./components/score_chart/Score_chart.jsx";
import caloriesWidget from "./Assets/calories-icon.svg";
import proteinWidget from "./Assets/protein-icon.svg";
import carbsWidget from "./Assets/carbs-icon.svg";
import fatWidget from "./Assets/fat-icon.svg";
import "./App.css";
import useFormat from "./Hook/UseFormat.js";

function App() {
  function getCurrentURL() {
    return window.location.href;
  }

  let url = getCurrentURL();
  let id = url.split(`3001/`).pop();

  const [state, setState] = useState("api");
  //const [showMockDialog, setShowMockDialog] =  React.useState(false);
  const [urlMock] = useState("http://localhost:3001");

  const onToggleResource = () => {
    setState(state === "mock" ? "api" : "mock");
  };

  // const { loading, error} = useData(id);
  // const { tData, isPending } = useFetch(urlMock);
  //console.log({loading, error})
  


  let {data, tData, error, loading, isPending} = useFormat(id, urlMock);
  console.log({data, tData, error})
  let dataToUse = state === "api" ? data : tData;
  console.log(dataToUse)

   if (state === "api" && !data && tData?.id) {
      if (dataToUse ? dataToUse : "" && error) {
      
        dataToUse = tData;
   
      }
      dataToUse = tData;
      
      
       
     
   }
    console.log(loading, isPending)
    if(!loading && !isPending && !!error){
      console.log("<<<<<<<<<<<<error")
      if(dataToUse === tData && tData?.id){
        let alerted = localStorage.getItem('alerted') || '';
        if (alerted !== 'yes') {
          alert("ERROR!!! (API SERVER DOWN) switching to mock");
          localStorage.setItem('alerted','yes');
        }
        window.onbeforeunload = function (e) {
          e.preventDefault();
          localStorage.clear();
        };
        console.log('api down')
      }

    }
    
    
    
    

  
  if(!loading && !isPending && data === undefined && tData === undefined){
    console.log(">>>>>>>>>>!!!!", tData?tData : "undef")
    if (!loading && !isPending && (tData?.id === undefined || tData?.id === null)) {
      console.log(">>>>>>>>>>>undefined")
      return (
        <div className="notFound">
           <h1>404</h1>
           <p>Page not found</p>
           
         </div>
       );
    }

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

              <RadChart dataPerf={dataToUse?.performance} />

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
                <div className="widget_value_wrapper">
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
                <div className="widget_value_wrapper">
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
                <div className="widget_value_wrapper">
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
