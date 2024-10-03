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
    "Namekian",
    "Majin",
    "Frieza Race",
    "Android",
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
    "Namekian Warrior ",
    "Freelancer",
    "Army of Frieza",
    "Pride Troopers",
    "Assistant of Vermoud",
    "God",
    "Assistant of Beerus",
    "Villain",
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
    <section className="flex flex-col gap-2 py-6 px-4">
      <input
        className="text-black"
        type="text"
        placeholder="Buscar por nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2 flex-col">
        <label htmlFor="gender">Genero:</label>
        <select
          className="text-black"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="flex gap-2  flex-col">
        <label htmlFor="race">Raza:</label>
        <select
          className="text-black"
          value={race}
          onChange={(e) => setRace(e.target.value)}
        >
          <option value="">Todos</option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 flex-col">
        <label htmlFor="affiliation">afiliación:</label>
        <select
          className="text-black"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        >
          <option value="">Todos</option>
          {affiliations.map((affiliation) => (
            <option key={affiliation} value={affiliation}>
              {affiliation}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-[#fbc02d] hover:bg-[#fbc02d]/80 text-white font-bold py-2 px-4 rounded"
        onClick={handleFilter}
      >
        Filtrar
      </button>
    </section>
  );
};

export default Filtros;
