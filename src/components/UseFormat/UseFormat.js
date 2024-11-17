
import useData from "../../Hook/UseData";

const useFormat = (id) => {
    
    const [data, loading] = useData(id);
    let a = data
    const format = a?.performance?.data.map((data) => {
        switch (data.kind) {
          case 1:
            return { ...data, kind: "intensité" };
          case 2:
            return { ...data, kind: "vitesse" };
          case 3:
            return { ...data, kind: "Force" };
          case 4:
            return { ...data, kind: "Endurance" };
          case 5:
            return { ...data, kind: "Energie" };
          case 6:
            return { ...data, kind: "Cardio" };
          default:
            return { ...data };
        }
      });
  return (
   
            format

      
  )
};

export default useFormat;
