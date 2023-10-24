#기술 스택
React, TypeScript, Recoil, Styled-component

### `npm start`
1. cd poke-app 
2. npm start
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `구현기능`
1. 포켓몬 순차적으로 List 뿌리기
2. PockmonSearch : 포켓몬 id 검색, 무한 스크롤 기능, 포켓몬 클릭시 해당 id의 Detail 페이지로 이동
3. Detail : detail/id 로 페이지 이동해서 포켓몬 상세 정보 가져옴, 진화단계 표시


### 폴더구조

```
📦 poke-app
├─ package-lock.json
├─ package.json
├─ public
├─ src
│  ├─ api
│  │  └─ pokemonapi.ts
│  ├─ assets
│  │  └─ pokemonball.png
│  ├─ components
│  │  └─ PokemonSearch.tsx
│  ├─ hooks
│  │  └─ useInfiniteScroll.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ interfaces
│  │  ├─ abilityTypes.ts
│  │  └─ pokemonTypes.ts
│  ├─ pages
│  │  ├─ Detail.tsx
│  │  └─ Home.tsx
│  ├─ recoil
│  │  └─ atom.ts
│  ├─ reportWebVitals.ts
│  └─ setupTests.ts
└─ tsconfig.json
```

