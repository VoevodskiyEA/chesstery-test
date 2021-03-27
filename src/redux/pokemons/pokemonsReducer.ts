import { IPokemon } from "../../api/pokemonsTypes";
import {
  GET_POKEMON_STARTED,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
  GET_ALL_POKEMONS_STARTED,
  GET_ALL_POKEMONS_SUCCESS,
  GET_ALL_POKEMONS_ERROR,
} from "./pokemonsTypes";

export interface IInitialState {
  loadingAll: boolean;
  errorAll: any;
  loadingIds: Set<string>;
  errorMap: Map<string, any>;
  pokemons: Map<string, IPokemon>;
}

const initialState: IInitialState = {
  loadingAll: false,
  errorAll: null,
  loadingIds: new Set(),
  errorMap: new Map(),
  pokemons: new Map(),
};

interface IAction {
  type: string;
  payload: any;
}

export const pokemonReducer = (
  state = initialState,
  action: IAction
): IInitialState => {
  switch (action.type) {
    case GET_POKEMON_STARTED: {
      // Если прогрузка уже осуществляется, то возвращаем исходное состояние
      // Иначе - копируем сет для иммутабельности изначального сета, добавляем
      // в него новый айди, обновляем стор
      if (state.loadingIds.has(action.payload.id)) {
        return state;
      } else {
        const newSet = new Set(state.loadingIds);
        newSet.add(action.payload.id);
        return {
          ...state,
          loadingIds: newSet,
        };
      }
    }

    case GET_POKEMON_SUCCESS: {
      const newState = { ...state };
      // Удаляем id из загружающихся
      if (state.loadingIds.has(action.payload.id)) {
        const newSet = new Set(state.loadingIds);
        newSet.delete(action.payload.id);
        newState.loadingIds = newSet;
      }
      // Удаляем id из ошибок
      if (state.errorMap.has(action.payload.id)) {
        const newMap = new Map(state.errorMap);
        newMap.delete(action.payload.id);
        newState.errorMap = newMap;
      }
      // Копируем мэп покемонов для иммутабельности
      // Удаляем предыдущие данные по покемону
      // Добавляем новые данные по покемону
      // Обновляем стор
      const newMap = new Map(state.pokemons);
      if (newMap.has(action.payload.id)) {
        newMap.delete(action.payload.id);
      }
      newMap.set(action.payload.id, action.payload.pokemon);
      newState.pokemons = newMap;
      return newState;
    }

    case GET_POKEMON_ERROR: {
      const newState = { ...state };
      // Удаляем id из загружающихся
      if (state.loadingIds.has(action.payload.id)) {
        const newSet = new Set(state.loadingIds);
        newSet.delete(action.payload.id);
        newState.loadingIds = newSet;
      }
      // Копируем мэп ошибок для иммутабельности
      // Удаляем предыдущие данные по ошибке по конкретному покемону
      // Добавляем новые данные по ошибке по запросу конкретного покемона
      // Обновляем стор
      const newErrMap = new Map(state.errorMap);
      if (newErrMap.has(action.payload.id)) {
        newErrMap.delete(action.payload.id);
      }
      newErrMap.set(action.payload.id, action.payload.error);
      newState.errorMap = newErrMap;
      return newState;
    }

    case GET_ALL_POKEMONS_STARTED: {
      // Ставим состояние loadingAll в true, т.к. прогружаем всех покемонов
      return {
        ...state,
        loadingAll: true,
      };
    }

    case GET_ALL_POKEMONS_SUCCESS: {
      return {
        ...state,
        loadingAll: false,
        errorAll: undefined,
        pokemons: new Map(
          action.payload.pokemons.map((pokemon: IPokemon) => {
            return [pokemon.id, pokemon];
          })
        ),
      };
    }

    case GET_ALL_POKEMONS_ERROR: {
      return {
        ...state,
        loadingAll: false,
        errorAll: action.payload.error,
      };
    }

    default:
      return state;
  }
};
