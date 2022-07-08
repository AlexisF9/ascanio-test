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
    <>{data && <div class="bg-secondary p-2">{<p>{data.content}</p>}</div>}</>
  );
}
