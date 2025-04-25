import React, { useEffect, useState } from 'react';
import { filterDoctors } from './utils/filterHelpers';

const DoctorList = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('All');
  const [specialties, setSpecialties] = useState([]);
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then((res) => res.json())
      .then((data) => {
        setAllDoctors(data);
        setFilteredDoctors(data); // initially show all
      });
  }, []);

  useEffect(() => {
    const result = filterDoctors(allDoctors, { search, mode, specialties, sort });
    setFilteredDoctors(result);
  }, [search, mode, specialties, sort, allDoctors]);

  return (
    <div>
      {/* Your filters and search bar components */}
      <div>
        {filteredDoctors.map((doc) => (
          <div key={doc.id} data-testid="doctor-card">{doc.name}</div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
