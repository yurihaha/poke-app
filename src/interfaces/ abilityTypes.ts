export interface AbilityData {
	effect_changes: EffectChange[];
	effect_entries: EffectEntry[];
	flavor_text_entries: FlavorTextEntry[];
	generation: Generation;
	id: number;
	is_main_series: boolean;
	name: string;
	names: Name[];
	pokemon: Pokemon[];
}

export interface EffectChange {
	effect_entries: {
		effect: string;
		language: Language;
	}[];
	version_group: VersionGroup;
}

export interface EffectEntry {
	effect: string;
	language: Language;
	short_effect: string;
}

export interface FlavorTextEntry {
	flavor_text: string;
	language: Language;
	version_group: VersionGroup;
}

export interface Generation {
	name: string;
	url: string;
}

export interface Name {
	language: Language;
	name: string;
}

export interface Language {
	name: string;
	url: string;
}

export interface VersionGroup {
	name: string;
	url: string;
}

export interface Pokemon {
	is_hidden: boolean;
	pokemon: {
		name: string;
		url: string;
	};
	slot: number;
}
