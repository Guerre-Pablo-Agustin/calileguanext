import { create } from "zustand";
import { Character } from "../Interface/Characters";

interface DragonBallState {
  characters: {
    items: Character[];
  };
  page: number;
  limit: number;
  fetchCharacters: (page: number, limit: number) => Promise<void>;
  fetchCharactersById: (id: string) => Promise<void>;
}

export const useDragonBallStore = create<DragonBallState>((set) => ({
  characters: { items: [] },
  page: 1,
  limit: 10,

  // Cargar personajes
  fetchCharacters: async (page: number, limit: number) => {
    const res = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      console.error("Error al cargar personajes:", res.statusText);
      return;
    }

    const data = await res.json();
    set(() => ({
      characters: { items: [...data.items] },
      page,
    }));
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
