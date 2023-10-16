import { useEffect, useState } from "react";
import AddWorkerModal from "../../components/Modals/AddWorkerModal";
import WorkerTable from "../WorkerTable/WorkerTable";

const AllWorker = () => {
  const [allData, setallData] = useState([]);
  const fetchAllWorker = async () => {
    const data = await window.api.allWorkers();
    setallData(data);
  };
  useEffect(() => {
    fetchAllWorker();
  }, []);

  return (
    <main className=" text-[var(--dark-color)] bg-[var(--bg-light)] py-10 px-2 min-h-screen">
      <div className="text-[4vmax] mb-4">Worker Details</div>
      <AddWorkerModal method={"POST"} />
      <WorkerTable data={allData} />
    </main>
  );
};

export default AllWorker;
