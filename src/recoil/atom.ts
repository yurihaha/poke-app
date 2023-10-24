import { atom } from 'recoil';
import { Pokemon } from '../interfaces/pokemonTypes';
import { AbilityData } from '../interfaces/abilityTypes';

export const pokemonListState = atom<Pokemon[]>({
	key: 'pokemonListState',
	default: [],
});

export const abilityDataState = atom<AbilityData[]>({
	key: 'abilityDataState',
	default: [],
});

export const nextPageUrlState = atom<string | null>({
	key: 'nextPageUrlState',
	default: 'https://pokeapi.co/api/v2/pokemon?limit=10',
});
