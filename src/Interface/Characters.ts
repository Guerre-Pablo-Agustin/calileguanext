export interface OriginPlanet {
    id: number;
    name: string;
    isDestroyed: boolean;
    description: string;
    image: string;
  }
  
  export interface Transformation {
    id: number;
    name: string;
    image: string;
    ki: string;
  }
  
  export interface Character {
    id: number; 
    name: string;
    image: string;
    affiliation: string;
    description: string;
    gender: string;
    ki: string;
    maxKi: string;
    race: string;
    originPlanet: OriginPlanet; 
    transformations: Transformation[];
  }
  