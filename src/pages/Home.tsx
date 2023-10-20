import React, { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import PokemonList from '../components/PokemonList';
import { pokemonListState } from '../recoil/atom';

type Pokemon = {
	name: string;
	url: string;
};

type PokemonList = {
	results: Pokemon[];
};

function PokemonListApp() {
	const setPokemonList = useSetRecoilState(pokemonListState);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get<PokemonList>(
					'https://pokeapi.co/api/v2/pokemon?limit=10',
				);
				setPokemonList(res.data.results);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [setPokemonList]);

	return (
		<div>
			<PokemonList />
		</div>
	);
}

export default PokemonListApp;
