import { useState, useEffect } from "react";
import useData from "./UseData";
import { useFetch } from "./useFetch";

const formatPerf = (data) => {
 
  if (!data?.performance?.data || !Array.isArray(data?.performance?.data )) return undefined;
  const perf = data?.performance?.data?.map((dataEl) => {
    switch (Number(dataEl.kind)) {
      case 1:
        return { ...dataEl, kind: "intensité" };
      case 2:
        return { ...dataEl, kind: "vitesse" };
      case 3:
        return { ...dataEl, kind: "Force" };
      case 4:
        return { ...dataEl, kind: "Endurance" };
      case 5:
        return { ...dataEl, kind: "Energie" };
      case 6:
        return { ...dataEl, kind: "Cardio" };
      default:
        return { ...dataEl };
    }
  });
  return {...data, performance: perf}
}

const useFormat = (id, urlMock) => {
  const [data, loading, error] = useData(id);
  const { tData, isPending } = useFetch(urlMock);
  const [format, setFormat] = useState({
    mock: undefined,
    api: undefined,
  });
  console.log(data? data : "undef")
   
  
  useEffect(() => {
    
    if (data !== undefined && data !== null) {
      const upgradedData = formatPerf(data);  
      setFormat(prev => ({...prev, api: upgradedData}))
    }
    if (!data) {
      console.log(">>>>>>>>>>>>>>", tData,)  
      const upgradedData = formatPerf(tData);
      setFormat(prev => ({...prev, mock: upgradedData}))

    }
  }, [data, tData]);
  console.log(">>>>>>>>>>>>>>>", error)
  return {data: format.api, tData: format.mock, error, loading, isPending};
};

export default useFormat;


