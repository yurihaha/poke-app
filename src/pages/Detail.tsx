import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AbilityData } from '../interfaces/ abilityTypes';

function Detail() {
	const { id } = useParams(); // 동적 파라미터 :id를 가져옴
	const [abilityData, setAbilityData] = useState<AbilityData | null>(null); // AbilityData 타입으로 상태 정의

	useEffect(() => {
		// 능력 데이터를 불러오는 API 요청
		axios
			.get(`https://pokeapi.co/api/v2/ability/${id}/`)
			.then((response) => {
				const data: AbilityData = response.data; // API 응답을 AbilityData 타입으로 변환
				setAbilityData(data);
			})
			.catch((error) => {
				console.error('Error fetching ability data:', error);
			});
	}, [id]);

	// 능력 데이터를 사용하여 컴포넌트를 렌더링
	return (
		<div>
			<h2>Ability Detail</h2>
			{abilityData && (
				<div>
					<h3>
						포켓몬 이름: {abilityData.name} {abilityData.id}
					</h3>
					<p>Generation: {abilityData.generation.name}</p>
					<ul>
						{abilityData?.effect_entries.map((entry, index) => (
							<li key={index}>{entry.effect}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Detail;
