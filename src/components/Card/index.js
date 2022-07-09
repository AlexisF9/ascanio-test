import { useEffect, useState } from "react";

export default function Card({ id, reload }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [reload]);

  function fetchData() {
    setData(JSON.parse(localStorage.getItem(id)));
  }

  return (
    <>
       
      {data &&
        data.map((item, index) => {
          return (
            <p class="bg-secondary p-2 mt-2" key={index}>
              {item}
            </p>
          );
        })}
    </>
  );
}
