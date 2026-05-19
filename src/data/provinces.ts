export type Province = {
  id: string;
  communityId: string;
  preferredDisplayName: string;
  acceptedNames: string[];
  svgRegionId: string;
  labelAnchor: { x: number; y: number };
  dropRadius?: number;
};

export const provinces: Province[] = [
  { id: "alava", communityId: "pais-vasco", preferredDisplayName: "Álava", acceptedNames: ["Álava", "Araba"], svgRegionId: "alava", labelAnchor: { x: 443, y: 144 } },
  { id: "albacete", communityId: "castilla-la-mancha", preferredDisplayName: "Albacete", acceptedNames: ["Albacete"], svgRegionId: "albacete", labelAnchor: { x: 498, y: 408 } },
  { id: "alicante", communityId: "comunidad-valenciana", preferredDisplayName: "Alicante", acceptedNames: ["Alicante", "Alacant"], svgRegionId: "alicante", labelAnchor: { x: 592, y: 431 } },
  { id: "almeria", communityId: "andalucia", preferredDisplayName: "Almería", acceptedNames: ["Almería"], svgRegionId: "almeria", labelAnchor: { x: 467, y: 523 } },
  { id: "avila", communityId: "castilla-y-leon", preferredDisplayName: "Ávila", acceptedNames: ["Ávila"], svgRegionId: "avila", labelAnchor: { x: 302, y: 286 } },
  { id: "badajoz", communityId: "extremadura", preferredDisplayName: "Badajoz", acceptedNames: ["Badajoz"], svgRegionId: "badajoz", labelAnchor: { x: 236, y: 409 } },
  { id: "islas-baleares-provincia", communityId: "islas-baleares", preferredDisplayName: "Islas Baleares", acceptedNames: ["Islas Baleares", "Illes Balears"], svgRegionId: "islas-baleares-provincia", labelAnchor: { x: 795, y: 367 }, dropRadius: 80 },
  { id: "barcelona", communityId: "cataluna", preferredDisplayName: "Barcelona", acceptedNames: ["Barcelona"], svgRegionId: "barcelona", labelAnchor: { x: 751, y: 214 } },
  { id: "burgos", communityId: "castilla-y-leon", preferredDisplayName: "Burgos", acceptedNames: ["Burgos"], svgRegionId: "burgos", labelAnchor: { x: 400, y: 177 } },
  { id: "caceres", communityId: "extremadura", preferredDisplayName: "Cáceres", acceptedNames: ["Cáceres"], svgRegionId: "caceres", labelAnchor: { x: 219, y: 342 } },
  { id: "cadiz", communityId: "andalucia", preferredDisplayName: "Cádiz", acceptedNames: ["Cádiz"], svgRegionId: "cadiz", labelAnchor: { x: 249, y: 548 } },
  { id: "castellon", communityId: "comunidad-valenciana", preferredDisplayName: "Castellón", acceptedNames: ["Castellón", "Castelló"], svgRegionId: "castellon", labelAnchor: { x: 614, y: 310 } },
  { id: "ciudad-real", communityId: "castilla-la-mancha", preferredDisplayName: "Ciudad Real", acceptedNames: ["Ciudad Real"], svgRegionId: "ciudad-real", labelAnchor: { x: 373, y: 393 } },
  { id: "cordoba", communityId: "andalucia", preferredDisplayName: "Córdoba", acceptedNames: ["Córdoba"], svgRegionId: "cordoba", labelAnchor: { x: 312, y: 457 } },
  { id: "la-coruna", communityId: "galicia", preferredDisplayName: "La Coruña", acceptedNames: ["La Coruña", "A Coruña"], svgRegionId: "la-coruna", labelAnchor: { x: 76, y: 126 } },
  { id: "cuenca", communityId: "castilla-la-mancha", preferredDisplayName: "Cuenca", acceptedNames: ["Cuenca"], svgRegionId: "cuenca", labelAnchor: { x: 481, y: 330 } },
  { id: "gerona", communityId: "cataluna", preferredDisplayName: "Gerona", acceptedNames: ["Gerona", "Girona"], svgRegionId: "gerona", labelAnchor: { x: 781, y: 193 } },
  { id: "granada", communityId: "andalucia", preferredDisplayName: "Granada", acceptedNames: ["Granada"], svgRegionId: "granada", labelAnchor: { x: 410, y: 493 } },
  { id: "guadalajara", communityId: "castilla-la-mancha", preferredDisplayName: "Guadalajara", acceptedNames: ["Guadalajara"], svgRegionId: "guadalajara", labelAnchor: { x: 457, y: 279 } },
  { id: "guipuzcoa", communityId: "pais-vasco", preferredDisplayName: "Guipúzcoa", acceptedNames: ["Guipúzcoa", "Gipuzkoa"], svgRegionId: "guipuzcoa", labelAnchor: { x: 481, y: 125 } },
  { id: "huelva", communityId: "andalucia", preferredDisplayName: "Huelva", acceptedNames: ["Huelva"], svgRegionId: "huelva", labelAnchor: { x: 183, y: 486 } },
  { id: "huesca", communityId: "aragon", preferredDisplayName: "Huesca", acceptedNames: ["Huesca"], svgRegionId: "huesca", labelAnchor: { x: 614, y: 189 } },
  { id: "jaen", communityId: "andalucia", preferredDisplayName: "Jaén", acceptedNames: ["Jaén"], svgRegionId: "jaen", labelAnchor: { x: 404, y: 457 } },
  { id: "leon", communityId: "castilla-y-leon", preferredDisplayName: "León", acceptedNames: ["León"], svgRegionId: "leon", labelAnchor: { x: 241, y: 158 } },
  { id: "lerida", communityId: "cataluna", preferredDisplayName: "Lérida", acceptedNames: ["Lérida", "Lleida"], svgRegionId: "lerida", labelAnchor: { x: 689, y: 194 } },
  { id: "la-rioja-provincia", communityId: "la-rioja", preferredDisplayName: "La Rioja", acceptedNames: ["La Rioja"], svgRegionId: "la-rioja-provincia", labelAnchor: { x: 465, y: 180 } },
  { id: "lugo", communityId: "galicia", preferredDisplayName: "Lugo", acceptedNames: ["Lugo"], svgRegionId: "lugo", labelAnchor: { x: 145, y: 131 } },
  { id: "madrid-provincia", communityId: "madrid", preferredDisplayName: "Madrid", acceptedNames: ["Madrid"], svgRegionId: "madrid-provincia", labelAnchor: { x: 375, y: 292 } },
  { id: "malaga", communityId: "andalucia", preferredDisplayName: "Málaga", acceptedNames: ["Málaga"], svgRegionId: "malaga", labelAnchor: { x: 319, y: 531 } },
  { id: "murcia-provincia", communityId: "murcia", preferredDisplayName: "Murcia", acceptedNames: ["Murcia"], svgRegionId: "murcia-provincia", labelAnchor: { x: 523, y: 450 } },
  { id: "navarra-provincia", communityId: "navarra", preferredDisplayName: "Navarra", acceptedNames: ["Navarra"], svgRegionId: "navarra-provincia", labelAnchor: { x: 516, y: 159 } },
  { id: "orense", communityId: "galicia", preferredDisplayName: "Orense", acceptedNames: ["Orense", "Ourense"], svgRegionId: "orense", labelAnchor: { x: 136, y: 186 } },
  { id: "asturias-provincia", communityId: "asturias", preferredDisplayName: "Asturias", acceptedNames: ["Asturias"], svgRegionId: "asturias-provincia", labelAnchor: { x: 245, y: 117 } },
  { id: "palencia", communityId: "castilla-y-leon", preferredDisplayName: "Palencia", acceptedNames: ["Palencia"], svgRegionId: "palencia", labelAnchor: { x: 334, y: 172 } },
  { id: "las-palmas", communityId: "canarias", preferredDisplayName: "Las Palmas", acceptedNames: ["Las Palmas"], svgRegionId: "las-palmas", labelAnchor: { x: 262, y: 688 }, dropRadius: 90 },
  { id: "pontevedra", communityId: "galicia", preferredDisplayName: "Pontevedra", acceptedNames: ["Pontevedra"], svgRegionId: "pontevedra", labelAnchor: { x: 81, y: 175 } },
  { id: "salamanca", communityId: "castilla-y-leon", preferredDisplayName: "Salamanca", acceptedNames: ["Salamanca"], svgRegionId: "salamanca", labelAnchor: { x: 235, y: 277 } },
  { id: "santa-cruz-de-tenerife", communityId: "canarias", preferredDisplayName: "Santa Cruz de Tenerife", acceptedNames: ["Santa Cruz de Tenerife"], svgRegionId: "santa-cruz-de-tenerife", labelAnchor: { x: 114, y: 707 }, dropRadius: 90 },
  { id: "cantabria-provincia", communityId: "cantabria", preferredDisplayName: "Cantabria", acceptedNames: ["Cantabria"], svgRegionId: "cantabria-provincia", labelAnchor: { x: 363, y: 125 } },
  { id: "segovia", communityId: "castilla-y-leon", preferredDisplayName: "Segovia", acceptedNames: ["Segovia"], svgRegionId: "segovia", labelAnchor: { x: 365, y: 255 } },
  { id: "sevilla", communityId: "andalucia", preferredDisplayName: "Sevilla", acceptedNames: ["Sevilla"], svgRegionId: "sevilla", labelAnchor: { x: 261, y: 485 } },
  { id: "soria", communityId: "castilla-y-leon", preferredDisplayName: "Soria", acceptedNames: ["Soria"], svgRegionId: "soria", labelAnchor: { x: 449, y: 224 } },
  { id: "tarragona", communityId: "cataluna", preferredDisplayName: "Tarragona", acceptedNames: ["Tarragona"], svgRegionId: "tarragona", labelAnchor: { x: 677, y: 259 } },
  { id: "teruel", communityId: "aragon", preferredDisplayName: "Teruel", acceptedNames: ["Teruel"], svgRegionId: "teruel", labelAnchor: { x: 571, y: 288 } },
  { id: "toledo", communityId: "castilla-la-mancha", preferredDisplayName: "Toledo", acceptedNames: ["Toledo"], svgRegionId: "toledo", labelAnchor: { x: 353, y: 340 } },
  { id: "valencia", communityId: "comunidad-valenciana", preferredDisplayName: "Valencia", acceptedNames: ["Valencia", "València"], svgRegionId: "valencia", labelAnchor: { x: 569, y: 361 } },
  { id: "valladolid", communityId: "castilla-y-leon", preferredDisplayName: "Valladolid", acceptedNames: ["Valladolid"], svgRegionId: "valladolid", labelAnchor: { x: 315, y: 217 } },
  { id: "vizcaya", communityId: "pais-vasco", preferredDisplayName: "Vizcaya", acceptedNames: ["Vizcaya", "Bizkaia"], svgRegionId: "vizcaya", labelAnchor: { x: 432, y: 120 } },
  { id: "zamora", communityId: "castilla-y-leon", preferredDisplayName: "Zamora", acceptedNames: ["Zamora"], svgRegionId: "zamora", labelAnchor: { x: 227, y: 218 } },
  { id: "zaragoza", communityId: "aragon", preferredDisplayName: "Zaragoza", acceptedNames: ["Zaragoza"], svgRegionId: "zaragoza", labelAnchor: { x: 562, y: 208 } },
];
