import { useState } from "react";
import Card from "../Card";

export default function Tableau(props) {
  const [id, setId] = useState();
  const [content, setContent] = useState();

  const [reload, setReload] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let oldItems = JSON.parse(localStorage.getItem(id)) || [];

    let newItems = content;

    oldItems.push(newItems);

    localStorage.setItem(id, JSON.stringify(oldItems));

    // if (localStorage.getItem(id)) {
    //   await item.push(JSON.parse(localStorage.getItem(id)));
    //   await item.push(content);
    //   await localStorage.setItem(id, JSON.stringify(item));
    //   console.log(item);
    // } else {
    //   await item.push(content);
    //   await localStorage.setItem(id, JSON.stringify(item));
    // }

    setReload(!reload);
    setContent("");
    setId("");
  };

  // console.log(new Date().getTime());
  // console.log(localStorage.length);

  return (
    <div class="flex">
      {props.nameColumn.map((item, index) => {
        return (
          <div class="flex-1 h-max bg-slate-200 mx-2 p-2" key={index}>
            <h2 class="text-center font-bold mb-2">{item}</h2>

            <Card id={index} reload={reload} />

            {id === index && (
              <form onSubmit={handleSubmit} class="mt-4">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                    setId(index);
                  }}
                />
                <button type="submit">Add</button>
              </form>
            )}

            <button
              class="mt-2 px-2 bg-primary text-center"
              onClick={() => {
                id === index ? setId("") : setId(index);
                setContent("");
              }}
            >
              {id === index ? "-" : "+"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
