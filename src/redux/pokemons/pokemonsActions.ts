import {
  GET_POKEMON_STARTED,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
  GET_ALL_POKEMONS_STARTED,
  GET_ALL_POKEMONS_SUCCESS,
  GET_ALL_POKEMONS_ERROR,
} from "./";
import { PokemonsAPI } from "../../api/pokemons";
import { IPokemon } from "../../api/pokemonsTypes";
import Redux from "redux";

export const getPokemon = async (id: string, dispatch: Redux.Dispatch) => {
  dispatch(getPokemonStarted(id));
  try {
    const pokemon = await PokemonsAPI.getPokemon(id);
    dispatch(getPokemonSuccess(id, pokemon));
  } catch (error) {
    dispatch(getPokemonError(id, error));
  }
};

const getPokemonStarted = (id: string) => ({
  type: GET_POKEMON_STARTED,
  payload: {
    id,
  },
});

const getPokemonSuccess = (id: string, pokemon: IPokemon) => {
  return {
    type: GET_POKEMON_SUCCESS,
    payload: {
      id,
      pokemon,
    },
  };
};
const getPokemonError = (id: string, error: any) => ({
  type: GET_POKEMON_ERROR,
  payload: {
    id,
    error,
  },
});

export const getAllPokemons = async (dispatch: Redux.Dispatch) => {
  dispatch(getAllPokemonsStarted());
  try {
    const pokemons = await PokemonsAPI.getAllPokemons();
    dispatch(getAllPokemonSuccess(pokemons));
  } catch (error) {
    dispatch(getAllPokemonError(error));
  }
};

const getAllPokemonsStarted = () => ({
  type: GET_ALL_POKEMONS_STARTED,
});

const getAllPokemonSuccess = (pokemons: Array<IPokemon>) => ({
  type: GET_ALL_POKEMONS_SUCCESS,
  payload: {
    pokemons,
  },
});

const getAllPokemonError = (error: any) => ({
  type: GET_ALL_POKEMONS_ERROR,
  payload: {
    error,
  },
});
