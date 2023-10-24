import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAbilityData } from '../api/pokemonapi';
import { AbilityData, FlavorTextEntry, Name } from '../interfaces/abilityTypes';
import pokemonball from '../assets/pokemonball.png';
import styled from 'styled-components';

const Container = styled.div`
	text-align: center;
	padding: 20px;
	background-color: #f2f2f2;
`;

const LoadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 300px;
`;

const AbilityDetail = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const PokemonImage = styled.img`
	max-width: 100px;
	max-height: 100px;
`;

const DetailList = styled.ul`
	list-style: none;
	padding: 0;
`;

function Detail() {
	const { id } = useParams();
	const [abilityData, setAbilityData] = useState<AbilityData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);
		fetchAbilityData(id)
			.then((res) => {
				const data: AbilityData = res;
				setAbilityData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching ability data:', error);
				setIsLoading(false);
			});
	}, [id]);

	const getkoFlavorText = (
		entries: FlavorTextEntry[] | undefined,
	): string[] => {
		const koreanEntries = entries
			?.filter((entry) => entry.language.name === 'ko')
			.map((entry) => entry.flavor_text);

		return Array.from(new Set(koreanEntries || []));
	};

	const getkoNames = (names: Name[] | undefined): string[] => {
		const koreanNames = names
			?.filter((names) => names.language.name === 'ko')
			.map((names) => names.name);

		return Array.from(new Set(koreanNames || []));
	};

	return (
		<Container>
			<h2>Ability Detail</h2>
			{isLoading ? (
				<LoadingContainer>
					<PokemonImage src={pokemonball} alt='Loading' />
				</LoadingContainer>
			) : abilityData ? (
				<AbilityDetail>
					<h3>포켓몬 이름: {abilityData.name}</h3>
					<br />
					<p>EffectChange</p>
					<DetailList>
						{abilityData?.effect_changes.map((entry, index) => (
							<li key={index}>
								{entry?.effect_entries.map((effectEntry, entryIndex) => (
									<p key={entryIndex}>{effectEntry.effect}</p>
								))}
							</li>
						))}
					</DetailList>
					<br />
					<br />
					<DetailList>
						{getkoFlavorText(abilityData.flavor_text_entries).map(
							(entry, index) => (
								<li key={index}>{entry}</li>
							),
						)}
					</DetailList>
					{getkoFlavorText(abilityData.flavor_text_entries).length === 0 && (
						<p>flavor 없음</p>
					)}
					<br />
					<p>{abilityData.generation.name}</p>
					<DetailList>
						{getkoNames(abilityData.names).map((name, index) => (
							<li key={index}>{name}</li>
						))}
					</DetailList>
					{getkoNames(abilityData.names).length === 0 && <p>names 없음</p>}
					<br />
					<p>진화 포켓몬:</p>
					<DetailList>
						{abilityData?.pokemon.map((character, index) => (
							<li key={index}>{character.pokemon.name}</li>
						))}
					</DetailList>
				</AbilityDetail>
			) : (
				<div>포켓몬 기술 없음</div>
			)}
		</Container>
	);
}

export default Detail;
