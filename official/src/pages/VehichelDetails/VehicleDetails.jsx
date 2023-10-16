import { useEffect, useState } from "react";
import TableVehicle from "../TableVehicle/TableVehicle";
import AddVehicleModal from "../../components/Modals/AddVehicleModal";

function VehicleDetails() {
  const [vehicleData, setVehicleData] = useState([]);
  const fetchVechileDetails = async () => {
    const res = await window.api.vehicleEntry();
    setVehicleData(res);
  };

  useEffect(() => {
    fetchVechileDetails();
  }, []);
  return (
    <section className="bg-[var(--background-light)] text-[var(--dark-color)] min-h-[100vh] md:p-5 p-2">
      <h1 className="md:py-3 py-2 text-[5vmax] capitalize">Vehicle Details</h1>
      <AddVehicleModal method={"POST"} />
      <TableVehicle tableData={vehicleData} />
    </section>
  );
}

export default VehicleDetails;
