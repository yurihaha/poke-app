import axios from 'axios';
import { AbilityData } from '../interfaces/abilityTypes';

// 포켓몬 능력치 가져오는 Api
export const fetchAbilityData = (
	id: string | undefined,
): Promise<AbilityData> => {
	return axios
		.get<AbilityData>(`https://pokeapi.co/api/v2/ability/${id}/`)
		.then((res) => res.data);
};

export const fetchPokemonData = async (offset: number) => {
	const res = await axios.get(
		`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
	);
	return res.data.results;
};
