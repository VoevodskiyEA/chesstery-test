import instance from "./index";
import { IPokemon } from "./pokemonsTypes";

interface IPokemonsAPI {
  getAllPokemons: () => Promise<Array<IPokemon>>;
  getPokemon: (id: string) => Promise<IPokemon>;
}

export const PokemonsAPI: IPokemonsAPI = {
  async getAllPokemons() {
    const data: IGetAllPokemons = await instance.get("/");
    return data.data.cards;
  },
  async getPokemon(id) {
    const data: IGetPokemon = await instance.get("/" + id);
    return data.data.card;
  },
};

interface IGetAllPokemons {
  data: {
    cards: Array<IPokemon>;
  };
}

interface IGetPokemon {
  data: {
    card: IPokemon;
  };
}
