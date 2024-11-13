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

      const user = fetch(`${api}/${userID}`);
      const activity = fetch(`${api}/${userID}/activity`);
      const averageSession = fetch(`${api}/${userID}/average-sessions`);
      const performance = fetch(`${api}/${userID}/performance`);
      const promises = [user, activity, averageSession, performance];

      const responses = await Promise.all(promises);
      let tmpData = {

      };

      for await (let response of responses) {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else if (response.ok) {
          const json = await response.json();
          const {userId, ...rest} = json.data;
          let key = response.url.split(`${userID}/`).pop();



          let keyName = "user";
          let userPath = `http://localhost:3000/user/` + userID;

          if (key == "average-sessions") {
            key = "averageSessions";
          }

          if (key == userPath) {
            key = keyName;
          }

          tmpData[key] = json.data;
          // tmpData.push(json.data);
        }
      }
      console.log("tmpData", tmpData);  
      setData(tmpData);
      setLoading(false);
    })();
  }, [userID]);

  return [data, loading, error];
}

