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
				const response = await axios.get<PokemonList>(nextPageUrl);
				setPokemonList((prevList) => [...prevList, ...response.data.results]);
				setNextPageUrl(response.data.next);
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
						<Link to={`/detail/${index + 1}`}>
							{' '}
							{/* 각 포켓몬의 URL 페이지로 이동하는 Link */}
							{pokemon.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default PokemonListComponent;
