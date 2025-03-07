import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { turfList } from "../Data/Data";
import ActionAreaCard from "../Components/Cards"; 
import { useState } from "react";

const activities = [
  "Basketball",
  "Football",
  "Box Cricket",
  "Tennis",
  "Table Tennis",
  "Badminton",
  "Volleyball"
];

const TurfsList = () => {
  const [selectedActivity, setSelectedActivity] = useState("");

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const filteredTurfs = selectedActivity
    ? turfList.filter((turf) => turf.activities.includes(selectedActivity))
    : turfList;

  return (
    <div className="bg-gray-800 ">
      <Navbar />
      <div className="flex justify-center my-10 flex-wrap gap-2">
        {activities.map((activity, index) => (
          <label
            key={index}
            className={`mx-1 inline-flex items-center font-bold text-md justify-center w-30 md:w-40 h-12 text-center p-3 border cursor-pointer duration-300 ${
              selectedActivity === activity
                ? 'text-black border-black bg-amber-300'
                : 'bg-gray-800 border-white hover:bg-gray-200 text-white hover:text-black hover:border-black'
            }`}
          >
            <input
              hidden
              type="radio"
              value={activity}
              checked={selectedActivity === activity}
              onChange={handleActivityChange}
            />
            {activity}
          </label>
        ))}
      </div>
      <div className="flex justify-center m-10" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredTurfs.map((turf, index) => (
          <ActionAreaCard 
            key={index}
            id={turf.id}
            image={turf.image}
            name={turf.name}
            rating={turf.rating}
            activities={turf.activities}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TurfsList;
