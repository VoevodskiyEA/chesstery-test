export interface IPokemonAtack {
    cost: Array<string>;
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
  }
  
  export interface IPokemonWeakness {
    type: string;
    value: string;
  }
  
  export interface IPokemonResistance {
    type: string;
    value: string;
  }
  
  export interface IPokemonAbility {
    name: string;
    text: string;
    type: string;
  }
  
  export interface IPokemonAncientTrait {
    name: string;
    text: string;
  }
  
  export interface IPokemon {
    id: string;
    name: string;
    imageUrl: string;
    imageUrlHiRes: string;
    supertype: string;
  
    number: string;
    artist: string;
    rarity: string;
    series: string;
  
    setCode: string;
    attacks?: Array<IPokemonAtack>;
    weaknesses?: Array<IPokemonWeakness>;
    retreatCost?: Array<string>;
    convertedRetreatCost?: number;
    resistances?: Array<IPokemonResistance>;
    evolvesFrom?: string;
    text?: Array<string>;
    nationalPokedexNumber?: number;
    types?: Array<string>;
    ability?: IPokemonAbility;
    hp?: string;
    set?: string;
    subtype?: string;
    ancientTrait?: IPokemonAncientTrait;
  }