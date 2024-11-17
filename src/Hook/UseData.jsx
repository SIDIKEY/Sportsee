import { useEffect, useState } from "react";
import React from "react";

export default function useData(userID) {
  const api = `http://localhost:3000/user`;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);

      try {
        const user = fetch(`${api}/${userID}`);
        const activity = fetch(`${api}/${userID}/activity`);
        const averageSession = fetch(`${api}/${userID}/average-sessions`);
        const performance = fetch(`${api}/${userID}/performance`);
        const promises = [user, activity, averageSession, performance];

        const responses = await Promise.all(promises);
        let tmpData = {};

        for await (let response of responses) {
          if (!response.ok) {
            setError(true);
            console.log(`HTTP Response Code: ${response?.status}`);
          } else if (response.ok) {
            setError(null);
            const json = await response.json();
            const { userId, ...rest } = json.data;
            let key = response.url.split(`${userID}/`).pop();

            let keyName = "user";
            let userPath = `http://localhost:3000/user/` + userID;

            if (key == "average-sessions") {
              key = "averageSessions";
            }

            let id = userID
              ? Number(userID)
              : ">>>>>>>>>>>>>>>>>NO ID<<<<<<<<<<<<<<<<<<<<";

            if (id && json.data.userId) {
              console.log(json.data.userId, id);
              if (id == json.data.userId) {
                console.log(">>>>>>>>>>>>Matching IDS<<<<<<<<<<<<<<");
              } else {
                await json.data.userId;
                if (json.data.userId !== id) {
                  console.log(">>>>>>>>>>>>AUTH FAILED<<<<<<<<<<<<");
                }
              }
            }


            
            

            if (key == userPath) {
              key = keyName;
            }

            tmpData[key] = json.data;

            console.log(json); 
            console.log(tmpData);

            if(tmpData){
              console.log(">>>>>>>>>>>><<TMP<<<<<<<<<<<<<<<", tmpData.length);
              


              
              
              
              
            }
            
          }
        }
        console.log("tmpData", tmpData);
        setLoading(false);
        setData(tmpData);
      } catch (error) {
        console.log(`${error} >>>>>>>>>>>>>>>>>Could not Fetch Data `);
        setError(`${error} >>>>>>>>>>>>>>>>>Could not Fetch Data `);

        setLoading(false);
      }
    })();
  }, [userID]);

  return [data, loading, error];
}
