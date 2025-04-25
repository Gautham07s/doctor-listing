import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

const allSpecialties = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist",
  "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
  "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
  "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
  "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

const Filters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = queryString.parse(location.search, { arrayFormat: "comma" });

  const updateQuery = (key, value, isMulti = false) => {
    let updated = { ...parsed };

    if (isMulti) {
      const current = Array.isArray(updated[key]) ? updated[key] : updated[key] ? [updated[key]] : [];
      if (current.includes(value)) {
        updated[key] = current.filter((v) => v !== value);
      } else {
        updated[key] = [...current, value];
      }
    } else {
      updated[key] = value;
    }

    const newQuery = queryString.stringify(updated, { arrayFormat: "comma" });
    navigate(`/?${newQuery}`);
  };

  return (
    <div className="filters">
      {/* Consultation Mode */}
      <div>
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <label>
          <input
            type="radio"
            name="mode"
            data-testid="filter-video-consult"
            checked={parsed.mode === "Video Consult"}
            onChange={() => updateQuery("mode", "Video Consult")}
          />
          Video Consult
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            data-testid="filter-in-clinic"
            checked={parsed.mode === "In Clinic"}
            onChange={() => updateQuery("mode", "In Clinic")}
          />
          In Clinic
        </label>
      </div>

      {/* Specialties */}
      <div>
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        {allSpecialties.map((spec) => (
          <label key={spec}>
            <input
              type="checkbox"
              data-testid={`filter-specialty-${spec.replace(/\s|\//g, "-")}`}
              checked={
                Array.isArray(parsed.specialties)
                  ? parsed.specialties.includes(spec)
                  : parsed.specialties === spec
              }
              onChange={() => updateQuery("specialties", spec, true)}
            />
            {spec}
          </label>
        ))}
      </div>

      {/* Sort Options */}
      <div>
        <h3 data-testid="filter-header-sort">Sort</h3>
        <label>
          <input
            type="radio"
            name="sort"
            data-testid="sort-fees"
            checked={parsed.sort === "fees"}
            onChange={() => updateQuery("sort", "fees")}
          />
          Fees (Low to High)
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            data-testid="sort-experience"
            checked={parsed.sort === "experience"}
            onChange={() => updateQuery("sort", "experience")}
          />
          Experience (High to Low)
        </label>
      </div>
    </div>
  );
};

export default Filters;
