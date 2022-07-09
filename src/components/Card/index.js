import { useEffect, useState } from "react";

export default function Card({ id, reload, setReload }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [reload]);

  function fetchData() {
    setData(JSON.parse(localStorage.getItem(id)));
  }

  async function suppItem(e) {
    if (window.confirm("Êtes vous sur de vouloir supprimer cet element ?")) {
      let index = await data.findIndex((element) => element === e);
      await data.splice(index, 1);
      localStorage.setItem(id, JSON.stringify(data));

      setReload(!reload);
    }
  }

  return (
    <>
       
      {data &&
        data.map((item, index) => {
          return (
            <div class="bg-secondary p-2 mt-2" key={index}>
              <p>{item.content}</p>
              <button onClick={() => suppItem(item)}>&#x274C;</button>
            </div>
          );
        })}
    </>
  );
}
