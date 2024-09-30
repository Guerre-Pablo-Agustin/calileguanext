import React from "react";
import { Character } from "../../Interface/Characters";
import Card from "../Card/Card";

type Props = {
  characters: {
    items: Character[];
  };
};

const Cards = (props: Props) => {

    const characters = props.characters.items;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-2 ">
      {characters && characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
    </div>
  );
};

export default Cards;
