// Call for Action Events for the Baltic Sea Region
// This file defines public events and initiatives encouraging community
// engagement, innovation and cooperation on climate risks. The activities
// span CBSS member states and address flooding, heat stress and coastal erosion.

export interface CallForAction {
    type: string;
    name: string;
    organizer: string;
    dateStart: string; // ISO‑8601 date string
    dateEnd: string;   // ISO‑8601 date string
    description: string;
    lat: number;
    lng: number;
    image?: string;
}

// List of upcoming calls for action. Dates are in 2025 and chosen to
// encourage forward‑planning. Lat/lng coordinates correspond to host cities or
// coastal sites. Descriptions emphasise cross‑border cooperation and
// innovative solutions, reflecting the mission of the climate‑risk map.
// Define a base list of call‑for‑action events. We will duplicate
// this array to double the number of events. This approach retains
// the same event information while creating a larger dataset for
// demonstration purposes.

const _baseCallForActions: CallForAction[] = [
    {
        type: 'Science', // Hackathon → Science
        name: 'Copenhagen Flood Resilience Hackathon',
        organizer: 'Danish Climate Lab',
        dateStart: '2025-09-20',
        dateEnd: '2025-09-21',
        description: 'Develop open‑source tools and apps to forecast flooding and improve early‑warning systems.',
        lat: 55.6761,
        lng: 12.5683,
    },
    {
        type: 'Workshop',
        name: 'Tallinn Urban Heat Workshop',
        organizer: 'Estonian Green Building Council',
        dateStart: '2025-08-22',
        dateEnd: '2025-08-23',
        description: 'City planners, architects and activists discuss green roofs, parks and cooling strategies to mitigate urban heat islands.',
        lat: 59.437,
        lng: 24.7536,
    },
    {
        type: 'Training',
        name: 'Helsinki Heatwave Response Training',
        organizer: 'Finnish Red Cross',
        dateStart: '2025-08-25',
        dateEnd: '2025-08-25',
        description: 'Public training on recognising heatstroke, establishing cooling shelters and organising community response during heat waves.',
        lat: 60.1699,
        lng: 24.9384,
    },
    {
        type: 'Cleanup',
        name: 'Kiel Bay Coastal Cleanup',
        organizer: 'Kiel University Sustainability Initiative',
        dateStart: '2025-09-05',
        dateEnd: '2025-09-05',
        description: 'Volunteers remove marine litter from beaches and discuss how waste and erosion amplify flood risks.',
        lat: 54.3233,
        lng: 10.1228,
    },
    {
        type: 'Workshop', // Festival → Workshop
        name: 'Reykjavík Climate Awareness Festival',
        organizer: 'Icelandic Youth Environmental Association',
        dateStart: '2025-08-15',
        dateEnd: '2025-08-17',
        description: 'Music, art and workshops highlighting climate adaptation, sea‑level rise and coastal resilience along the North Atlantic.',
        lat: 64.1466,
        lng: -21.9426,
    },
    {
        type: 'Seminar', // stays Seminar
        name: 'Riga Urban Heat Seminar',
        organizer: 'Latvian Environmental Protection Club',
        dateStart: '2025-09-10',
        dateEnd: '2025-09-10',
        description: 'Experts and city officials present strategies for tree planting, reflective surfaces and public health measures during heat waves.',
        lat: 56.9496,
        lng: 24.1052,
    },
    {
        type: 'Workshop',
        name: 'Klaipėda Coastal Defence Workshop',
        organizer: 'Lithuanian Coastal Research Institute',
        dateStart: '2025-09-18',
        dateEnd: '2025-09-19',
        description: 'Interactive sessions on dune restoration, nature‑based solutions and citizen science to counter shoreline erosion.',
        lat: 55.7033,
        lng: 21.1443,
    },
    {
        type: 'Training',
        name: 'Bergen Rainfall Preparedness Drill',
        organizer: 'Norwegian Directorate for Civil Protection',
        dateStart: '2025-08-27',
        dateEnd: '2025-08-28',
        description: 'Hands‑on drill to prepare communities for intense rainfall and flash floods, including emergency communication exercises.',
        lat: 60.3913,
        lng: 5.3221,
    },
    {
        type: 'Cleanup',
        name: 'Gdańsk Erosion Awareness Day',
        organizer: 'Polish Coastal Protection Fund',
        dateStart: '2025-09-02',
        dateEnd: '2025-09-02',
        description: 'Guided tours along the Vistula Spit explain historic erosion rates and showcase shoreline protection projects.',
        lat: 54.352,
        lng: 18.6466,
    },
    {
        type: 'Workshop', // Festival → Workshop
        name: 'Stockholm Heat Island Solutions Fair',
        organizer: 'Swedish Environment Agency',
        dateStart: '2025-10-05',
        dateEnd: '2025-10-06',
        description: 'Exhibition of cooling technologies, green roofs and shading innovations for hotter summers, with hands‑on demonstrations.',
        lat: 59.3293,
        lng: 18.0686,
    },
    {
        type: 'Seminar', // Summit → Seminar
        name: 'Baltic Coastal Resilience Summit',
        organizer: 'Council of the Baltic Sea States',
        dateStart: '2025-11-05',
        dateEnd: '2025-11-07',
        description: 'Cross‑border summit in Turku for policymakers, scientists and activists to share best practices on flooding, heat stress, erosion and sea‑level rise.',
        lat: 60.4518,
        lng: 22.2666,
    },
    {
        type: 'Protest', // stays Protest
        name: 'Oslo Climate Justice Protest',
        organizer: 'Nordic Youth for Climate',
        dateStart: '2025-09-20',
        dateEnd: '2025-09-20',
        description: 'Demonstration calling for stronger climate action to protect vulnerable coastal communities from flooding and heat stress.',
        lat: 59.9139,
        lng: 10.7522,
    },
    {
        type: 'Workshop',
        name: 'Odense Flood Preparedness Workshop',
        organizer: 'Odense Environmental Network',
        dateStart: '2025-10-12',
        dateEnd: '2025-10-12',
        description: 'Hands‑on training in sandbagging, emergency kits and flood barrier construction for residents of the Odense region.',
        lat: 55.4038,
        lng: 10.4024,
    },
    {
        type: 'Workshop', // Buildathon → Workshop
        name: 'Tartu Green Roof Buildathon',
        organizer: 'Tartu University Environmental Club',
        dateStart: '2025-09-15',
        dateEnd: '2025-09-16',
        description: 'Volunteers help install a pilot green roof while learning about its cooling benefits for urban heat islands.',
        lat: 58.3776,
        lng: 26.729,
    },
    {
        type: 'Training',
        name: 'Oulu Heatwave Response Drill',
        organizer: 'Finnish Civil Defence',
        dateStart: '2025-08-30',
        dateEnd: '2025-08-30',
        description: 'Role‑playing exercise with first responders and volunteers on heatwave emergency protocols and vulnerable population outreach.',
        lat: 65.0121,
        lng: 25.4651,
    },
    {
        type: 'Cleanup',
        name: 'Hamburg Dune Restoration Day',
        organizer: 'Hamburg Coastal Friends',
        dateStart: '2025-09-12',
        dateEnd: '2025-09-12',
        description: 'Residents and students rebuild dunes along the Elbe estuary to reduce coastal erosion and protect habitats.',
        lat: 53.5511,
        lng: 9.9937,
    },
    {
        type: 'Workshop', // Camp → Workshop
        name: 'Akureyri Climate Youth Camp',
        organizer: 'Icelandic Youth Environmental Association',
        dateStart: '2025-08-22',
        dateEnd: '2025-08-24',
        description: 'Youth camp featuring lectures and excursions focused on climate adaptation for northern communities.',
        lat: 65.6839,
        lng: -18.1106,
    },
    {
        type: 'Workshop', // Fair → Workshop
        name: 'Liepaja Heat Health Fair',
        organizer: 'Latvian Red Cross',
        dateStart: '2025-08-29',
        dateEnd: '2025-08-29',
        description: 'Outdoor fair offering free health checks and guidance on staying cool during heat waves, with local music and food.',
        lat: 56.5103,
        lng: 21.0137,
    },
    {
        type: 'Seminar', // Summit → Seminar
        name: 'Neringa Flood & Tourism Summit',
        organizer: 'Lithuanian Coastal Tourism Association',
        dateStart: '2025-10-10',
        dateEnd: '2025-10-11',
        description: 'Summit in Neringa on flood prevention, sustainable tourism and preserving the UNESCO‑listed Curonian Spit.',
        lat: 55.368,
        lng: 21.06,
    },
    {
        type: 'Workshop',
        name: 'Trondheim Rain Garden Workshop',
        organizer: 'Norwegian University of Science and Technology',
        dateStart: '2025-09-07',
        dateEnd: '2025-09-07',
        description: 'Participants learn how to build rain gardens to absorb runoff, reduce flooding and improve urban biodiversity.',
        lat: 63.4305,
        lng: 10.3951,
    },
    {
        type: 'Seminar', // Forum → Seminar
        name: 'Szczecin Coastal Defence Forum',
        organizer: 'West Pomeranian Marine Institute',
        dateStart: '2025-09-18',
        dateEnd: '2025-09-19',
        description: 'Forum exploring innovations in breakwaters, beach nourishment and community‑led dune maintenance on the Polish coast.',
        lat: 53.4285,
        lng: 14.5528,
    },
    {
        type: 'Workshop', // Expo → Workshop
        name: 'Gothenburg Heat Adaptation Expo',
        organizer: 'City of Gothenburg',
        dateStart: '2025-09-25',
        dateEnd: '2025-09-26',
        description: 'Expo showcasing shading structures, reflective pavement and climate‑resilient urban planning solutions.',
        lat: 57.7089,
        lng: 11.9746,
    },
    {
        type: 'Seminar', // Roundtable → Seminar
        name: 'Åland Sea‑Level Roundtable',
        organizer: 'Åland Islands Environment Institute',
        dateStart: '2025-09-30',
        dateEnd: '2025-10-01',
        description: 'Local governments from Finland and Sweden meet to discuss integrated sea‑level rise adaptation in the Åland archipelago.',
        lat: 60.1169,
        lng: 19.9071,
    },
];




// Duplicate the base events array to double the number of call‑for‑action
// entries (original ×2). This results in 44 events total, supporting
// denser plotting on the interactive map without inventing new mock
// events.
export const callForActions: CallForAction[] = [
    ..._baseCallForActions,
    ..._baseCallForActions,
];