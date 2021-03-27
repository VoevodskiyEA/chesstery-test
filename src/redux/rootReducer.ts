import { combineReducers } from "redux";
import { pokemonReducer } from "./pokemons";
import { IInitialState as PokemonsInitialState } from "./pokemons";

export interface IRootState {
  pokemons: PokemonsInitialState;
}

export default combineReducers({
  pokemons: pokemonReducer,
});
