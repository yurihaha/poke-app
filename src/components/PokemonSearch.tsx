import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../interfaces/pokemonTypes';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchPokemonData } from '../api/pokemonapi';
import pokemonball from '../assets/pokemonball.png';
import styled from 'styled-components';

const Container = styled.div`
	text-align: center;
	margin: 20px;
`;

const Title = styled.h1`
	font-size: 24px;
`;

const SearchContainer = styled.div`
	margin: 20px 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	margin-right: 10px;
`;

const SearchButton = styled.button`
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 8px 16px;
	cursor: pointer;
`;

const ResultContainer = styled.div`
	margin: 20px 0;
`;

const LoadingImage = styled.img`
	width: 50px;
`;

const NoMorePokemon = styled.p`
	color: #999;
`;

const PokemonList = styled.ul`
	list-style: none;
	padding: 0;
`;

const PokemonItem = styled.li`
	margin: 10px 0;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: #333;
	font-weight: bold;

	&:hover {
		color: #007bff;
	}
`;

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
		<Container>
			<Title>Pokemon Search</Title>
			<SearchContainer>
				<Input
					type='text'
					placeholder='포켓몬 id 검색'
					onChange={handleSearchIndexChange}
				/>
				<SearchButton onClick={handleSearch}>검색</SearchButton>
			</SearchContainer>

			{filteredPokemon ? (
				<ResultContainer>
					<h2>검색 결과:</h2>
					<StyledLink to={`/detail/${searchIndex}`}>
						{filteredPokemon[0].name}
					</StyledLink>
				</ResultContainer>
			) : (
				<ResultContainer>
					<PokemonList>
						{pokemonList.map((pokemon, index) => (
							<PokemonItem key={index}>
								<StyledLink to={`/detail/${index + 1}`}>
									{pokemon.name}
								</StyledLink>
							</PokemonItem>
						))}
					</PokemonList>
					{loading && <LoadingImage src={pokemonball} alt='Loading' />}
					{!loading && !hasMore && (
						<NoMorePokemon>더 이상 로드될 포켓몬이 없습니다</NoMorePokemon>
					)}
				</ResultContainer>
			)}
		</Container>
	);
};

export default PokemonSearch;
