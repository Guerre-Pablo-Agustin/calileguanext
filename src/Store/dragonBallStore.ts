import { create } from "zustand";
import { Character } from "../Interface/Characters";

interface DragonBallState {
  characters: {
    items: Character[];
  };
  page: number;
  limit: number;
  fetchCharacters: (
    page: number,
    limit: number,
    filters?: {
      name?: string;
      gender?: string;
      race?: string;
      affiliation?: string;
    }
  ) => Promise<void>;
  fetchCharactersById: (id: string) => Promise<void>;
}

export const useDragonBallStore = create<DragonBallState>((set) => ({
  characters: { items: [] },
  page: 1,
  limit: 10,

  // Cargar personajes con filtros opcionales
  fetchCharacters: async (page: number, limit: number, filters = {}) => {
    const { name = "", gender = "", race = "", affiliation = "" } = filters;

    let url = `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`;

    // Añadir filtros a la URL si están definidos
    if (name) url += `&name=${name}`;
    if (gender) url += `&gender=${gender}`;
    if (race) url += `&race=${race}`;
    if (affiliation) url += `&affiliation=${affiliation}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error("Error al cargar personajes:", res.statusText);
        return;
      }
      const data = await res.json();
      console.log("Respuesta de la API:", data);
      set(() => ({
        characters: { items: Array.isArray(data) ? data : data.items },
        page,
      }));
    } catch (error) {
      console.error("Error al cargar personajes:", error);
    }
  },

  // Buscar por ID
  fetchCharactersById: async (id: string) => {
    try {
      const res = await fetch(
        `https://dragonball-api.com/api/characters/${id}`
      );
      if (!res.ok) {
        throw new Error(
          `Error al buscar personaje por ID: ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();
      console.log("Datos del personaje:", data);
      set(() => ({
        characters: { items: [data] }, 
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
