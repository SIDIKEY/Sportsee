import { useState, useEffect } from "react";

export const useFetch = (urlMock, id) => {
  const [tData, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        const response = await fetch(`${urlMock}/data.json`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const json = await response.json();
        setIsPending(true);

        let tData = [];
        function getCurrentURL() {
          return window.location.href;
        }

        let url = getCurrentURL();
        let id = url.split(`3001/`).pop();

        let result = json.find((user) => user.id == id);

        let averageSessions = () => result.sessionsLength;
        let activity = () => result.sessions;
        let performance = () => result.performance;

        let key = "averageSessions";
        let newKey = "activity";
        let brandNewKey = "performance";
        let lastKey = "user";
        tData = result;
        tData[key] = { sessions: averageSessions() };
        tData[newKey] = { sessions: activity() };
        tData[brandNewKey] = performance();
        tData[lastKey] = result;

        tData = result;
        setData(tData);
        setIsPending(false);
      } catch (error) {
        setError(true);
        setIsPending(false);
      }
    };
    fetchData();
  }, [urlMock]);
  return { tData, isPending, error };
};
