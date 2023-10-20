import { atom } from 'recoil';

type Pokemon = {
	name: string;
	url: string;
};

export const pokemonListState = atom<Pokemon[]>({
	key: 'pokemonListState',
	default: [],
});

export const nextPageUrlState = atom<string | null>({
	key: 'nextPageUrlState',
	default: 'https://pokeapi.co/api/v2/pokemon?limit=10',
});
