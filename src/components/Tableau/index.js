import { useState } from "react";
import Card from "../Card";
import CreateCard from "../CreateCard";

export default function Tableau(props) {
  const [reload, setReload] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      {props.nameColumn.map((item, index) => {
        return (
          <div
            className="mt-4 md:mt-0 md:flex-1 h-max bg-slate-200 mx-2 p-2 md:p-4 rounded-md md:max-w-md	"
            key={index}
          >
            <h2 className="text-center mb-2 uppercase">{item}</h2>
            <Card id={index} reload={reload} setReload={setReload} />
            <CreateCard reload={reload} index={index} setReload={setReload} />
          </div>
        );
      })}
    </div>
  );
}
