import { useState, useEffect } from "react";

export const useFetch = (urlMock) => {
    const [tData, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`${urlMock}/data.json`
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            );
        const json = await response.json();
        
        let tData = [];
        function getCurrentURL() {
          return window.location.href;
        };

        let url = getCurrentURL();
        let id = url.split(`3001/`).pop();
        let result = json.find(user => user.id == id) ;
        
         

        let averageSessions = () => result.sessionsLength;
        let activity = () => result.sessions;
        let performance = () => result.data;

       let user = () => Object.keys(tData.userInfos).forEach(function(key, index) {
        return { user : tData.userInfos }
      });

      let info = result;
      

      const target = { info };
      const source = { info : user};

      const returnedTarget = Object.assign(target, source);

        
        let key = "averageSessions";
        let newKey = "activity";
        let brandNewKey = "performance";
        let lastKey = "user"
        tData = result;
        tData[key] = {sessions: averageSessions()}
        tData[newKey] = {sessions: activity()}
        tData[brandNewKey] = {sessions: performance()}
        tData[lastKey] = result
       
        tData = result;
        setData(tData);
      };
      fetchData();
    }, [urlMock]);
    return { tData };
  };
