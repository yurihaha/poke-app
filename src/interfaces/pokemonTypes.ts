export interface Pokemon {
	name: string;
	url: string;
}

export interface PokemonListType {
	results: Pokemon[];
	next: string | null;
}
