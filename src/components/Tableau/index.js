import { useState } from "react";
import Card from "../Card";
import CreateCard from "../CreateCard";

export default function Tableau(props) {
  const [reload, setReload] = useState(false);

  const [id, setId] = useState();

  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-4">
      {/* Je parcours mes nom de colonne passé en props et j'en créé une par nom flex flex-col md:flex-row */}
      {props.nameColumn.map((item, index) => {
        return (
          <div
            className=" lg:mt-0 lg:flex-1 h-max bg-darkLight border border-2 border-darkBorder m-2 p-2 lg:p-4 rounded-md md:max-w-full	"
            key={index}
          >
            <h2 className="text-center mb-2 font-bold	 uppercase">{item}</h2>
            <Card id={index} reload={reload} setReload={setReload} />
            <CreateCard reload={reload} index={index} setReload={setReload} />
          </div>
        );
      })}
    </div>
  );
}
