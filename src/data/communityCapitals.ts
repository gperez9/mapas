export type CommunityCapital = {
  communityId: string;
  displayAnswer: string;
  acceptedAnswers: string[];
  mapAnchor: {
    x: number;
    y: number;
  };
  dropRadius?: number;
};

export const communityCapitals: CommunityCapital[] = [
  {
    communityId: "andalucia",
    displayAnswer: "Sevilla",
    acceptedAnswers: ["Sevilla"],
    mapAnchor: { x: 261, y: 485 },
  },
  {
    communityId: "aragon",
    displayAnswer: "Zaragoza",
    acceptedAnswers: ["Zaragoza"],
    mapAnchor: { x: 562, y: 208 },
  },
  {
    communityId: "asturias",
    displayAnswer: "Oviedo",
    acceptedAnswers: ["Oviedo", "Uviéu"],
    mapAnchor: { x: 245, y: 117 },
  },
  {
    communityId: "islas-baleares",
    displayAnswer: "Palma",
    acceptedAnswers: ["Palma", "Palma de Mallorca"],
    mapAnchor: { x: 795, y: 367 },
    dropRadius: 62,
  },
  {
    communityId: "canarias",
    displayAnswer: "Las Palmas de Gran Canaria o Santa Cruz de Tenerife",
    acceptedAnswers: [
      "Las Palmas de Gran Canaria",
      "Santa Cruz de Tenerife",
      "Las Palmas de Gran Canaria o Santa Cruz de Tenerife",
      "Santa Cruz de Tenerife o Las Palmas de Gran Canaria",
      "Las Palmas de Gran Canaria y Santa Cruz de Tenerife",
      "Santa Cruz de Tenerife y Las Palmas de Gran Canaria",
    ],
    mapAnchor: { x: 205, y: 700 },
    dropRadius: 115,
  },
  {
    communityId: "cantabria",
    displayAnswer: "Santander",
    acceptedAnswers: ["Santander"],
    mapAnchor: { x: 363, y: 125 },
  },
  {
    communityId: "castilla-la-mancha",
    displayAnswer: "Toledo",
    acceptedAnswers: ["Toledo"],
    mapAnchor: { x: 353, y: 340 },
  },
  {
    communityId: "castilla-y-leon",
    displayAnswer: "Valladolid",
    acceptedAnswers: ["Valladolid"],
    mapAnchor: { x: 315, y: 217 },
  },
  {
    communityId: "cataluna",
    displayAnswer: "Barcelona",
    acceptedAnswers: ["Barcelona"],
    mapAnchor: { x: 751, y: 214 },
  },
  {
    communityId: "comunidad-valenciana",
    displayAnswer: "Valencia",
    acceptedAnswers: ["Valencia", "València"],
    mapAnchor: { x: 569, y: 361 },
  },
  {
    communityId: "extremadura",
    displayAnswer: "Mérida",
    acceptedAnswers: ["Mérida"],
    mapAnchor: { x: 236, y: 409 },
  },
  {
    communityId: "galicia",
    displayAnswer: "Santiago de Compostela",
    acceptedAnswers: ["Santiago de Compostela", "Santiago"],
    mapAnchor: { x: 120, y: 185 },
  },
  {
    communityId: "madrid",
    displayAnswer: "Madrid",
    acceptedAnswers: ["Madrid"],
    mapAnchor: { x: 375, y: 292 },
  },
  {
    communityId: "murcia",
    displayAnswer: "Murcia",
    acceptedAnswers: ["Murcia"],
    mapAnchor: { x: 523, y: 450 },
  },
  {
    communityId: "navarra",
    displayAnswer: "Pamplona",
    acceptedAnswers: ["Pamplona", "Iruña", "Pamplona/Iruña", "Iruña/Pamplona"],
    mapAnchor: { x: 516, y: 159 },
  },
  {
    communityId: "pais-vasco",
    displayAnswer: "Vitoria-Gasteiz",
    acceptedAnswers: ["Vitoria", "Gasteiz", "Vitoria-Gasteiz", "Vitoria Gasteiz"],
    mapAnchor: { x: 443, y: 144 },
  },
  {
    communityId: "la-rioja",
    displayAnswer: "Logroño",
    acceptedAnswers: ["Logroño"],
    mapAnchor: { x: 465, y: 180 },
  },
];
