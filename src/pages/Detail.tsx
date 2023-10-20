import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	AbilityData,
	FlavorTextEntry,
	Name,
} from '../interfaces/ abilityTypes';

function Detail() {
	const { id } = useParams();
	const [abilityData, setAbilityData] = useState<AbilityData | null>(null);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/ability/${id}/`)
			.then((res) => {
				const data: AbilityData = res.data;
				setAbilityData(data);
			})
			.catch((error) => {
				console.error('Error fetching ability data:', error);
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
			{abilityData && (
				<div>
					<h3>
						포켓몬 이름: {abilityData.name} {abilityData.id}
					</h3>
					<br />
					<p>EffectChange(이팩트 체인지)</p>
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
			)}
		</div>
	);
}

export default Detail;
