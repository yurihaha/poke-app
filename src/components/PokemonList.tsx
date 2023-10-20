import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { pokemonListState, nextPageUrlState } from '../recoil/atom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

type Pokemon = {
	name: string;
	url: string;
};

type PokemonList = {
	results: Pokemon[];
	next: string | null;
};

function PokemonListComponent() {
	const [pokemonList, setPokemonList] = useRecoilState(pokemonListState);
	const nextPageUrl = useRecoilValue(nextPageUrlState);
	const setNextPageUrl = useSetRecoilState(nextPageUrlState);

	const loadMoreData = async () => {
		if (nextPageUrl) {
			try {
				const res = await axios.get<PokemonList>(nextPageUrl);
				setPokemonList((prevList) => [...prevList, ...res.data.results]);
				setNextPageUrl(res.data.next);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	};

	useEffect(() => {
		loadMoreData();
	}, []);

	//무한 스크롤
	useInfiniteScroll(loadMoreData);

	return (
		<div>
			<h1>Pokémon List</h1>
			<ul>
				{pokemonList.map((pokemon, index) => (
					<li key={index}>
						<Link to={`/detail/${index + 1}`}>{pokemon.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default PokemonListComponent;
