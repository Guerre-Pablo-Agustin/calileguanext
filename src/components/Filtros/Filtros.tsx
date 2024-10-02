import { useState } from "react";

type Props = {
  onFilterChange: (filters: {
    name: string;
    gender: string;
    race: string;
    affiliation: string;
  }) => void;
};

const Filtros = ({ onFilterChange }: Props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [affiliation, setAffiliation] = useState("");

  const races = [
    "Human",
    "Saiyan",
    "Namekian Majin",
    "Frieza Race Android",
    "Jiren Race",
    "God Angel",
    "Evil",
    "Nucleico",
    "Nucleico benigno",
    "Unknown",
  ];

  const affiliations = [
    "Z Fighter",
    "Red Ribbon Army",
    "Namekian Warrior Freelancer",
    "Army of Frieza Pride Troopers",
    "Assistant of Vermoud",
    "God Assistant of Beerus Villain",
    "Other",
  ];

  const handleFilter = () => {
    onFilterChange({
      name,
      gender,
      race,
      affiliation,
    });
  };

  return (
    <div className="flex flex-col gap-2 ">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Selecciona género</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select value={race} onChange={(e) => setRace(e.target.value)}>
        <option value="">Selecciona raza</option>
        {races.map((race) => (
          <option key={race} value={race}>
            {race}
          </option>
        ))}
      </select>
      <select
        value={affiliation}
        onChange={(e) => setAffiliation(e.target.value)}
      >
        <option value="">Selecciona afiliación</option>
        {affiliations.map((affiliation) => (
          <option key={affiliation} value={affiliation}>
            {affiliation}
          </option>
        ))}
      </select>
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default Filtros;
