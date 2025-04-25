export function filterDoctors(doctors, { search, mode, specialties, sort }) {
    let filtered = [...doctors];
  
    // Filter by search
    if (search) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    // Filter by consultation mode
    if (mode && mode !== "All") {
      filtered = filtered.filter((doc) => doc.mode === mode);
    }
  
    // Filter by selected specialties
    if (specialties.length > 0) {
      filtered = filtered.filter((doc) =>
        specialties.every((s) => doc.specialties.includes(s))
      );
    }
  
    // Sort doctors
    if (sort === "fees") {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sort === "experience") {
      filtered.sort((a, b) => b.experience - a.experience);
    }
  
    return filtered;
  }
  