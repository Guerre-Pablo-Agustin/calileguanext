import { create } from "zustand";
import { Character } from "../Interface/Characters";

interface DragonBallState {
  characters: {
    items: Character[];
    meta: any; 
  };
  page: number;
  limit: number; // Agrega esta propiedad
  fetchCharacters: (page: number, limit: number) => Promise<void>;
}

  
  export const useDragonBallStore = create<DragonBallState>((set) => ({
    characters: { items: [], meta: {} },
    page: 1,
    limit: 10,
fetchCharacters: async (page: number, limit: number) => {
  const res = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
  const data = await res.json();
  set(() => ({ characters: { items: [...data.items], meta: data.meta }, page }));
},
  }));