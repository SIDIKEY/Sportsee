import Header from "./components/Header/Header";
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


import './App.css';

function App() {

  const url = getCurrentURL();
  let id = url.split(`3001/`).pop();

  const [data, loading] = useData(id);

  function getCurrentURL() {
    return window.location.href;
  } 

  console.log(data)
  
  return (
    <div>
      <Header />
      <Sidebar />
      
      <div className="dashboard">

        <div className="Title">
          <Title
            title="Bonjour"
            username={loading ? "loading" : data ?.user?.userInfos.firstName || "" }
          />
            <h2>Félicitations vous avez explosé vos objectifs hier 👏</h2>
        </div>

        <div className="mainWrapper">


        

        <div className="main">
            <div>
              <Simplebarchart data={data?.activity?.sessions || ""} />
            </div>

            <div className="charts_wrapper">
              <ChartLine data={data?.averageSessions?.sessions || ""} />
              
              <RadChart dataPerf={data? data.performance : ""}/>

              <ChartScore dataScore={Number(data?.user?.todayScore) || data?.user?.score || 0}/>
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
                <p className="widget_value">{data?.user?.keyData?.calorieCount + "kcal" || ""}</p>
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
                <p className="widget_value">{data?.user?.keyData?.proteinCount + "g" || ""}</p>
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
                <p className="widget_value">{data?.user?.keyData?.carbohydrateCount + "g" || ""}</p>
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
                <p className="widget_value">{data?.user?.keyData?.lipidCount + "g" || ""}</p>
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
