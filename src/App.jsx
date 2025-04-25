import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Filters from "./components/Filters";
import DoctorCard from "./components/DoctorCard";
import AutocompleteHeader from "./components/AutocompleteHeader"; // if you’ve made it
import "./App.css";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const location = useLocation();

  // Fetch doctor data on first load
  useEffect(() => {
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
      });
  }, []);

  // Re-filter whenever URL query changes
  useEffect(() => {
    const parsed = queryString.parse(location.search, { arrayFormat: "comma" });
    let result = [...doctors];

    // 🔎 Search by name (from `q`)
    if (parsed.q) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(parsed.q.toLowerCase())
      );
    }

    // 🎯 Filter by mode (Video Consult / In Clinic)
    if (parsed.mode) {
      result = result.filter((doc) => doc.mode === parsed.mode);
    }

    // 🧩 Filter by specialties (multi-select)
    if (parsed.specialties) {
      const selected = Array.isArray(parsed.specialties)
        ? parsed.specialties
        : [parsed.specialties];

      result = result.filter((doc) =>
        selected.some((spec) => doc.specialties.includes(spec))
      );
    }

    // 🔃 Sort
    if (parsed.sort === "fees") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (parsed.sort === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [location.search, doctors]);

  return (
    <div>
      <AutocompleteHeader doctors={doctors} /> {/* optional */}
      <Filters />
      <div className="doctor-list">
        {filteredDoctors.map((doc, i) => (
          <DoctorCard key={i} doctor={doc} />
        ))}
      </div>
    </div>
  );
}

export default App;
