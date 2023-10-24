import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAbilityData } from '../api/pokemonapi';
import { AbilityData, FlavorTextEntry, Name } from '../interfaces/abilityTypes';
import pokemonball from '../assets/pokemonball.png';

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
		<div>
			<h2>Ability Detail</h2>
			{isLoading ? (
				<div>
					<img src={pokemonball} alt='Loading' />
				</div>
			) : abilityData ? (
				<div>
					<h3>포켓몬 이름: {abilityData.name}</h3>
					<br />
					<p>EffectChange</p>
					<ul>
						{abilityData?.effect_changes.map((entry, index) => (
							<li key={index}>
								{entry?.effect_entries.map((effectEntry, entryIndex) => (
									<p key={entryIndex}>{effectEntry.effect}</p>
								))}
							</li>
						))}
					</ul>
					<br />
					<br />
					<ul>
						{getkoFlavorText(abilityData.flavor_text_entries).map(
							(entry, index) => (
								<li key={index}>{entry}</li>
							),
						)}
					</ul>
					{getkoFlavorText(abilityData.flavor_text_entries).length === 0 && (
						<p>flavor 없음</p>
					)}
					<br />
					<p>Generation: {abilityData.generation.name}</p>
					<br />
					<ul>
						{getkoNames(abilityData.names).map((name, index) => (
							<li key={index}>{name}</li>
						))}
					</ul>
					{getkoNames(abilityData.names).length === 0 && <p>names 없음</p>}
					<br />
					<p>포켓몬:</p>
					<ul>
						{abilityData?.pokemon.map((character, index) => (
							<li key={index}>{character.pokemon.name}</li>
						))}
					</ul>
				</div>
			) : (
				<div>포켓몬 기술 없음</div>
			)}
		</div>
	);
}

export default Detail;
