// Pins are OpenStreetMap object centers. The address uses the road
// Nominatim returns for that same pin.

export type PlaceKind = 'stay' | 'cafe'

export type Review = {
  id: string
  author: string
  visited: string
  body: string
  signals: string[]
  heldOut?: boolean
  heldReasons?: string[]
}

export type Place = {
  id: string
  kind: PlaceKind
  name: string
  // Sample room rates for stays only. nightlyInr is the monsoon sample.
  // seasonNightlyInr is that figure plus half, for vacation season.
  // Neither is a live or booked tariff. Cafes omit both.
  nightlyInr?: number
  seasonNightlyInr?: number
  area: string
  address: string
  lat: number
  lng: number
  osmType: 'node' | 'way'
  osmId: number
  pinNote: string
  reviews: Review[]
}

export const vacationSeasonMonths = 'mid-December through March'
export const monsoonMonths = 'June through September'
export const seasonPeakNote =
  'Onam week and long weekends can sit closer to the season sample.'

export function sampleRoomRates(
  place: Place,
): { seasonInr: number; nonSeasonInr: number } | null {
  if (place.kind !== 'stay' || place.nightlyInr == null || place.seasonNightlyInr == null) {
    return null
  }
  return { seasonInr: place.seasonNightlyInr, nonSeasonInr: place.nightlyInr }
}

export const city = {
  name: 'Varkala',
  region: 'Kerala',
  note: 'Papanasam is the temple beach at the south end. North Cliff is the path with the cafes. Edava is the quieter beach to the north.',
}

export const places: Place[] = [
  {
    id: 'hindustan-beach-retreat',
    kind: 'stay',
    name: 'Hindustan Beach Retreat',
    nightlyInr: 4500,
    seasonNightlyInr: 6750,
    area: 'Papanasam',
    address: 'Papanasam Beach - Varkala Road, Chaluvila, Varkala, Kerala 695311',
    lat: 8.7328506,
    lng: 76.7065872,
    osmType: 'way',
    osmId: 1467318331,
    pinNote:
      'The pin is the hotel on Papanasam Beach - Varkala Road. It is the building at the temple beach, not a cafe up on North Cliff.',
    reviews: [
      {
        id: 'hbr-meera',
        author: 'Meera',
        visited: 'Two nights, March 2026',
        body: 'We booked a sea-facing room and got one, second floor, looking onto Papanasam beach. I walked along the sand to the Janardana temple steps without going up to the cliff. Breakfast was idli, dosa, and fruit. The coffee was instant, so I stopped after one cup. The air conditioner rattled on the setting that was cool enough to sleep. They kept our bags the afternoon we arrived early. This is the temple beach, not North Cliff.',
        signals: [
          'Names the beach and the walk to the temple',
          'Says what breakfast and the coffee were',
          'Mentions the noisy air conditioner and bag storage',
        ],
      },
      {
        id: 'hbr-tom',
        author: 'Tom',
        visited: 'One night, January 2026',
        body: 'The taxi from the airport stopped on Papanasam Beach Road at the hotel gate, not up at the cliff. The room was clean, the shower was hot, and there was no kettle. I could hear the waves and the road. It was a fine night before a train. The cliff cafes are not next door: I took an auto up to Cliff Street for dinner, a short ride rather than a stroll from the lobby.',
        signals: [
          'Says where the taxi stopped',
          'Notes the room, the shower, and the missing kettle',
          'Separates this beach from the cliff cafes',
        ],
      },
    ],
  },
  {
    id: 'the-gateway-hotel',
    kind: 'stay',
    name: 'The Gateway Hotel',
    nightlyInr: 8000,
    seasonNightlyInr: 12000,
    area: 'Papanasam',
    address: 'Varkala - Kallambalam Road, Chaluvila, Varkala, Kerala 695311',
    lat: 8.7344776,
    lng: 76.7077583,
    osmType: 'node',
    osmId: 2152043498,
    pinNote:
      'The pin is the hotel on Varkala - Kallambalam Road. Hindustan Beach Retreat is the separate building on Papanasam Beach Road.',
    reviews: [
      {
        id: 'gateway-lakshmi',
        author: 'Lakshmi',
        visited: 'Two nights, August 2026',
        body: 'I stayed in the main building, in a room facing the garden rather than the sea. The hotel is on Varkala–Kallambalam Road, up from Papanasam, so the beach is a walk down and not a flat stroll with a suitcase. The pool was open and quiet on a Tuesday. The dinner buffet had a lot of dishes and not much I wanted twice. Staff moved us off a room where the corridor door slammed. It is a different pin from Hindustan, which is down on the beach road.',
        signals: [
          'Which road, and which way the room faced',
          'What the walk down to the beach is like',
          'A door they fixed, and a meal that was ordinary',
        ],
      },
      {
        id: 'gateway-yusuf',
        author: 'Yusuf',
        visited: 'One night after the train, November 2025',
        body: 'I checked in around 8pm after the Varkala train. The gate is on the main road. The first auto turn was toward the beach market, which is the wrong entrance. Reception is inside, a few minutes from the gate with bags. The room was large, the bathroom fittings were a bit tired, and the bed was fine. I used the gym in the morning and it was empty.',
        signals: [
          'Train arrival and the wrong first turn',
          'Where reception sits relative to the gate',
        ],
      },
      {
        id: 'gateway-paid',
        author: 'Kerala Luxury Desk',
        visited: 'No visit described',
        body: 'The Gateway Hotel Varkala is a world-class luxury escape on the Arabian Sea! Breathtaking views, impeccable hospitality, and the best premium stay in Kerala. Book now for an unforgettable five-star holiday. Highly recommended for couples and families seeking paradise!',
        signals: [],
        heldOut: true,
        heldReasons: [
          'No day, room, or how they arrived',
          'Stacked superlatives and a book-now close',
          'Reads like a listing, not a stay',
        ],
      },
    ],
  },
  {
    id: 'deshadan',
    kind: 'stay',
    name: 'Deshadan',
    nightlyInr: 5200,
    seasonNightlyInr: 7800,
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.7392468,
    lng: 76.7041953,
    osmType: 'node',
    osmId: 340285289,
    pinNote:
      'The pin is the Deshadan guesthouse on Cliff 2nd street, inland from the cliff-edge cafes. It is not Clafouti.',
    reviews: [
      {
        id: 'deshadan-anjali',
        author: 'Anjali',
        visited: 'Three nights, February 2026',
        body: 'The room was on the upper floor, with a fan and an air conditioner. The guesthouse is on Cliff 2nd street but set inland: I could not see the sea from the bed, and the cliff edge is a walk downhill toward Clafouti. Breakfast was eggs and toast, nothing special, and it was included. They lent a scooter helmet that actually fit. Hot water came and went the second morning, and the owner sorted it before noon. It was quiet at night compared with the cafes on the edge.',
        signals: [
          'Where the room sits relative to the sea',
          'A plain breakfast and a helmet that fit',
          'Hot water that failed, and when it was fixed',
        ],
      },
      {
        id: 'deshadan-helen',
        author: 'Helen',
        visited: 'Four nights, December 2025',
        body: 'I worked two mornings from the common balcony. There is a table, and the wifi held for email, then dropped during a call, so I stopped trying. Mosquitoes showed up at dusk even with the coil they offered. The family who run it were direct about which rooms face the lane. I would ask for the upper room, not the one by the kitchen exhaust.',
        signals: [
          'What working from the balcony was like',
          'Which room to ask for, and why',
        ],
      },
    ],
  },
  {
    id: 'blue-water',
    kind: 'stay',
    name: 'Blue Water',
    nightlyInr: 3200,
    seasonNightlyInr: 4800,
    area: 'Edava',
    address: 'Anjumukku - Odayam Road, Edava, Varkala, Kerala 695311',
    lat: 8.7502824,
    lng: 76.694251,
    osmType: 'node',
    osmId: 342835319,
    pinNote:
      'The pin is the Blue Water hotel on Anjumukku - Odayam Road in Edava. Another guesthouse with the same name is mapped nearby; this is the hotel, not that building.',
    reviews: [
      {
        id: 'blue-rohan',
        author: 'Rohan',
        visited: 'Two nights, September 2026',
        body: 'This is the north end, on the Edava side, on Anjumukku–Odayam Road. We took an auto from Varkala station and said the hotel name. It was roughly twenty minutes, and the driver did not confuse it with the cliff. The beach at this end was quiet on a Monday morning, a few fishermen, not the Papanasam crowds. We walked down to the sand from the hotel. The room was simple, the sheets were clean, and the air conditioner was weak but enough. Dinner on site was a short menu and the fish was fine, not worth planning the evening around. The sign we walked into was this hotel, not the other Blue Water guesthouse nearby.',
        signals: [
          'Which road and which end of the beach',
          'How the auto from the station went',
          'What the room and the fish were like',
          'Distinguishes the other Blue Water',
        ],
      },
      {
        id: 'blue-nia',
        author: 'Nia',
        visited: 'One night, April 2026',
        body: 'I came up from the cliff by scooter at midday. The last stretch is a local road, not the cafe strip, and I almost turned into the other Blue Water because the names match. The hotel desk is the one set back from the beach path. The shower was cold for the first few minutes. I left at 6am for a train and someone was at the desk. I would send a friend who wants quiet sand, not someone who wants to step out to Darjeeling.',
        signals: [
          'How she almost went to the wrong Blue Water',
          'Where the desk is, and the cold shower',
          'Who this end of the beach suits',
        ],
      },
      {
        id: 'blue-paid',
        author: 'BookTheBeach',
        visited: 'No visit described',
        body: 'Blue Water is the ultimate boutique beach resort in Varkala! Pristine shores, luxury comfort, and magical sunsets await. Five stars, must book, best location in Kerala for the perfect romantic getaway. Reserve your unforgettable stay today!',
        signals: [],
        heldOut: true,
        heldReasons: [
          'No room, road, or mix-up with the other Blue Water',
          'Brochure language and a reserve-today close',
        ],
      },
    ],
  },
  {
    id: 'clafouti',
    kind: 'cafe',
    name: 'Clafouti Restaurant and Bakery',
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.739246,
    lng: 76.6997148,
    osmType: 'node',
    osmId: 2790823890,
    pinNote:
      'The pin is the restaurant and bakery on the cliff side of Cliff 2nd street. Rooms that use the Clafouti name sit just inland; this pin is the cafe, not a stay.',
    reviews: [
      {
        id: 'clafouti-diego',
        author: 'Diego',
        visited: 'Breakfast, March 2026',
        body: 'I was on the terrace by 8:15, before the path got busy. I had chocolate cake and a filter coffee. The cake was moist. The coffee was ordinary and a bit weak. We sat facing the sea and the wind kept lifting the receipt. This building is on the cliff side of Cliff 2nd street. The rooms people also call Clafouti are the place just inland. I came back two days later at 1pm and the chocolate cake was gone.',
        signals: [
          'Time of day and what he ordered',
          'What was good and what was weak',
          'Which building this is, and which Clafouti it is not',
          'A second visit when the cake had run out',
        ],
      },
      {
        id: 'clafouti-fatima',
        author: 'Fatima',
        visited: 'Sunset, October 2025',
        body: 'We shared a banana cake and a lime soda. The soda was very sweet, and they remade it when I asked. Service was slow at sunset, which seemed normal rather than a slight. There was no power outlet at the terrace tables. I stayed about 40 minutes. The view is the reason to sit here, and the cake is the reason I did not just stand at the railing.',
        signals: [
          'What they ordered and what they sent back',
          'How long they stayed, and the missing outlet',
          'A plain reason for sitting down',
        ],
      },
      {
        id: 'clafouti-bot',
        author: 'HappyTraveler_99',
        visited: 'No visit described',
        body: 'Amazing cafe!!! Best cake in India, wow wow wow, must visit hidden gem, five stars, perfect coffee magical sunset highly recommend to everyone love love love!!!',
        signals: [],
        heldOut: true,
        heldReasons: [
          'No order, time, or which Clafouti',
          'Repeated superlatives and no visit detail',
          'Reads as bot-like praise',
        ],
      },
    ],
  },
  {
    id: 'darjeeling-cafe',
    kind: 'cafe',
    name: 'Darjeeling Cafe',
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.7402388,
    lng: 76.6997223,
    osmType: 'node',
    osmId: 340289064,
    pinNote:
      'The pin is Darjeeling Cafe on Cliff 2nd street, a short walk north of Clafouti Restaurant and Bakery. It is not a second pin for Clafouti.',
    reviews: [
      {
        id: 'darjeeling-arun',
        author: 'Arun',
        visited: 'Breakfast, January 2026',
        body: 'I had a banana pancake and ginger lemon honey, just after 9 on a Thursday. The pancake was thick and still wet in the middle. The ginger drink was the better half, and they did not skimp on ginger. Our table was inside because the terrace was full. You can see the sea from the room, not only from outside. We sat close to an hour. It is a short walk north of Clafouti on the same cliff road, and the pin is this cafe.',
        signals: [
          'What he ordered and what was undercooked',
          'Where they sat',
          'Where it is relative to Clafouti',
        ],
      },
      {
        id: 'darjeeling-peter',
        author: 'Peter',
        visited: 'A rainy afternoon, July 2026',
        body: 'I came in out of the rain and ordered masala chai. It arrived fast and was spicy rather than milky-sweet. The room is small. With wet bags we were in the way, and we moved to a corner table when one opened. I would not open a laptop here. Staff wrote the bill by hand. It is a useful stop if you are already walking the cliff.',
        signals: [
          'The weather and how the chai tasted',
          'How cramped the room was',
        ],
      },
    ],
  },
  {
    id: 'cafe-del-mar',
    kind: 'cafe',
    name: 'Cafe del Mar',
    area: 'North Cliff',
    address: 'Cliff Street, Varkala, Kerala 695311',
    lat: 8.7376457,
    lng: 76.7019002,
    osmType: 'node',
    osmId: 340282837,
    pinNote:
      'The pin is Cafe del Mar on Cliff Street, south of the Clafouti terrace. Cliff Street and Cliff 2nd street are different roads.',
    reviews: [
      {
        id: 'delmar-priya',
        author: 'Priya',
        visited: 'Sunset, February 2026',
        body: 'I sat on the upper side with a fresh lime soda. The first one was mostly sugar, and they fixed it. The music was loud enough that we stopped trying to talk and just watched the water. The fries were stale at the edges, so I would not come for a meal. The entrance is on Cliff Street, south of the Clafouti terrace, which is a different road from Cliff 2nd street. We stayed until the light went, about half an hour.',
        signals: [
          'The drink they sent back',
          'The noise and the fries',
          'Which street, and that it is not Clafouti',
        ],
      },
      {
        id: 'delmar-jonah',
        author: 'Jonah',
        visited: 'Late morning, August 2026',
        body: 'It was much calmer before noon than it is at sunset. I had a black coffee and it was fine, nothing I would cross town for. One person was taking orders, so it took a few minutes even with empty tables. The step down toward the view is uneven. I watched someone catch a bag on it. It is a good place to stop if you are walking south along the cliff, and it is not the restaurant with the cake.',
        signals: [
          'Time of day compared with sunset',
          'The coffee and the pace of service',
        ],
      },
      {
        id: 'delmar-bot',
        author: 'SunsetFan_2024',
        visited: 'No visit described',
        body: 'Cafe del Mar Varkala is the best sunset spot in the world!!! Incredible vibes, amazing food, perfect for Instagram, five stars, you have to go, highly recommended premium cliff experience. Love it!!!',
        signals: [],
        heldOut: true,
        heldReasons: [
          'No time, order, or street',
          'Ranking language and no specific detail',
          'Reads as bot-like praise',
        ],
      },
    ],
  },
]

export function osmUrl(place: Place): string {
  return `https://www.openstreetmap.org/${place.osmType}/${place.osmId}`
}
