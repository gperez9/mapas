export type AutonomousCommunity = {
  id: string;
  preferredDisplayName: string;
  acceptedNames: string[];
  svgRegionId: string;
  labelAnchor: {
    x: number;
    y: number;
  };
  dropRadius?: number;
};

export const autonomousCommunities: AutonomousCommunity[] = [
  {
    id: "andalucia",
    preferredDisplayName: "Andalucía",
    acceptedNames: ["Andalucía"],
    svgRegionId: "andalucia",
    labelAnchor: { x: 328, y: 534 },
  },
  {
    id: "aragon",
    preferredDisplayName: "Aragón",
    acceptedNames: ["Aragón"],
    svgRegionId: "aragon",
    labelAnchor: { x: 573, y: 278 },
  },
  {
    id: "asturias",
    preferredDisplayName: "Asturias",
    acceptedNames: ["Asturias", "Principado de Asturias"],
    svgRegionId: "asturias",
    labelAnchor: { x: 248, y: 159 },
  },
  {
    id: "islas-baleares",
    preferredDisplayName: "Islas Baleares",
    acceptedNames: ["Islas Baleares", "Illes Balears"],
    svgRegionId: "islas-baleares",
    labelAnchor: { x: 790, y: 406 },
    dropRadius: 95,
  },
  {
    id: "canarias",
    preferredDisplayName: "Canarias",
    acceptedNames: ["Canarias"],
    svgRegionId: "canarias",
    labelAnchor: { x: 213, y: 692 },
  },
  {
    id: "cantabria",
    preferredDisplayName: "Cantabria",
    acceptedNames: ["Cantabria"],
    svgRegionId: "cantabria",
    labelAnchor: { x: 365, y: 168 },
  },
  {
    id: "castilla-la-mancha",
    preferredDisplayName: "Castilla-La Mancha",
    acceptedNames: ["Castilla-La Mancha"],
    svgRegionId: "castilla-la-mancha",
    labelAnchor: { x: 418, y: 386 },
  },
  {
    id: "castilla-y-leon",
    preferredDisplayName: "Castilla y León",
    acceptedNames: ["Castilla y León"],
    svgRegionId: "castilla-y-leon",
    labelAnchor: { x: 338, y: 261 },
  },
  {
    id: "cataluna",
    preferredDisplayName: "Cataluña",
    acceptedNames: ["Cataluña", "Catalunya"],
    svgRegionId: "cataluna",
    labelAnchor: { x: 727, y: 259 },
  },
  {
    id: "comunidad-valenciana",
    preferredDisplayName: "Comunidad Valenciana",
    acceptedNames: ["Comunidad Valenciana", "Comunitat Valenciana"],
    svgRegionId: "comunidad-valenciana",
    labelAnchor: { x: 591, y: 409 },
  },
  {
    id: "extremadura",
    preferredDisplayName: "Extremadura",
    acceptedNames: ["Extremadura"],
    svgRegionId: "extremadura",
    labelAnchor: { x: 232, y: 415 },
  },
  {
    id: "galicia",
    preferredDisplayName: "Galicia",
    acceptedNames: ["Galicia"],
    svgRegionId: "galicia",
    labelAnchor: { x: 111, y: 189 },
  },
  {
    id: "madrid",
    preferredDisplayName: "Madrid",
    acceptedNames: ["Madrid", "Comunidad de Madrid"],
    svgRegionId: "madrid",
    labelAnchor: { x: 377, y: 333 },
  },
  {
    id: "murcia",
    preferredDisplayName: "Murcia",
    acceptedNames: ["Murcia", "Región de Murcia"],
    svgRegionId: "murcia",
    labelAnchor: { x: 523, y: 488 },
  },
  {
    id: "navarra",
    preferredDisplayName: "Navarra",
    acceptedNames: ["Navarra", "Comunidad Foral de Navarra"],
    svgRegionId: "navarra",
    labelAnchor: { x: 515, y: 201 },
  },
  {
    id: "pais-vasco",
    preferredDisplayName: "País Vasco",
    acceptedNames: ["País Vasco", "Euskadi"],
    svgRegionId: "pais-vasco",
    labelAnchor: { x: 454, y: 179 },
  },
  {
    id: "la-rioja",
    preferredDisplayName: "La Rioja",
    acceptedNames: ["La Rioja"],
    svgRegionId: "la-rioja",
    labelAnchor: { x: 465, y: 222 },
  },
];
