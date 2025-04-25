const DoctorCard = ({ doctor }) => {
    return (
      <div className="doctor-card" data-testid="doctor-card">
        <h2 data-testid="doctor-name">{doctor.name}</h2>
        <p data-testid="doctor-specialty">
          {doctor.specialties && doctor.specialties.join(", ")}
        </p>
        <p data-testid="doctor-experience">{doctor.experience} years experience</p>
        <p data-testid="doctor-fee">₹{doctor.fees}</p>
      </div>
    );
  };
  
  export default DoctorCard;
  