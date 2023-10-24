import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../interfaces/pokemonTypes';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchPokemonData } from '../api/pokemonapi';
import pokemonball from '../assets/pokemonball.png';

const PokemonSearch: React.FC = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [searchIndex, setSearchIndex] = useState<number | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			const newPokemonList = await fetchPokemonData(offset);
			setPokemonList([...pokemonList, ...newPokemonList]);
			setOffset(offset + 20);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setHasMore(false);
		}
	};

	const handleSearchIndexChange = (event: ChangeEvent<HTMLInputElement>) => {
		const index = parseInt(event.target.value);
		setSearchIndex(isNaN(index) ? null : index);
	};

	const handleSearch = () => {
		setPokemonList([]);
		setOffset(0);
		fetchData();
	};

	useEffect(() => {
		fetchData();
	}, []);

	useInfiniteScroll(fetchData);

	const filteredPokemon =
		searchIndex !== null ? [pokemonList[searchIndex]] : null;

	return (
		<div>
			<h1>Pokemon Search</h1>
			<div>
				<input
					type='text'
					placeholder='포켓몬 id 검색'
					onChange={handleSearchIndexChange}
				/>
				<button onClick={handleSearch}>검색 </button>
			</div>

			{filteredPokemon ? (
				<div>
					<h2>검색 결과:</h2>
					<Link to={`/detail/${searchIndex}`}>{filteredPokemon[0].name}</Link>
				</div>
			) : (
				<div>
					<ul>
						{pokemonList.map((pokemon, index) => (
							<li key={index}>
								<Link to={`/detail/${index + 1}`}>{pokemon.name}</Link>
							</li>
						))}
					</ul>
					{loading && (
						<div>
							<img src={pokemonball} alt='Loading' />
						</div>
					)}
					{!loading && !hasMore && <p>더이상 로드될 포켓몬이 없습니다</p>}
				</div>
			)}
		</div>
	);
};

export default PokemonSearch;
