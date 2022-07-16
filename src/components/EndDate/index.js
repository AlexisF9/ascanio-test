export default function EndDate({ date, setDate }) {
  return (
    <div className="mt-3">
      <label className="text-white mb-2 " htmlFor="endDate">
        Date de fin :
      </label>
      <input
        required
        className="max-w-max ml-2 border text-white border-slate-500 bg-transparent rounded p-2 focus:outline-0"
        type="date"
        id="endDate"
        name="endDate"
        onChange={(e) => setDate(e.currentTarget.value)}
        value={date}
      ></input>
    </div>
  );
}
