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
  note: 'Papanasam is the temple beach at the south end. North Cliff is the path with the cafes. Black Beach is the north end of that cliff. South Cliff is past the temple, away from the cafe strip. Edava is the quieter beach to the north.',
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
    id: 'the-lost-hostel',
    kind: 'stay',
    name: 'The Lost Hostel',
    nightlyInr: 900,
    seasonNightlyInr: 1350,
    area: 'North Cliff',
    address: 'Cliff Street, Varkala, Kerala 695311',
    lat: 8.73657,
    lng: 76.7036959,
    osmType: 'node',
    osmId: 10548711909,
    pinNote:
      'The pin is The Lost Hostel on Cliff Street. It is not Le Coco or Sea View, which are further along the same road.',
    reviews: [
      {
        id: 'lost-devi',
        author: 'Devi',
        visited: 'Two nights, July 2026',
        body: 'I took a lower bunk in a mixed dorm on Cliff Street. The locker fit a day bag and not the big rucksack, so the rucksack stayed under the bed. The fan worked; the air conditioner in that room did not, and nobody pretended otherwise. Breakfast was not included. I walked up the cliff path to coffee. This is the hostel on Cliff Street, not the resort signs further along it.',
        signals: [
          'Which bunk and which road',
          'The locker, the fan, and the air conditioner that did not work',
          'Separates this hostel from the resorts on Cliff Street',
        ],
      },
    ],
  },
  {
    id: 'hostel-littoral',
    kind: 'stay',
    name: 'Hostel Littoral',
    nightlyInr: 1100,
    seasonNightlyInr: 1650,
    area: 'North Cliff',
    address: 'Helipad Road, Varkala, Kerala 695311',
    lat: 8.737153,
    lng: 76.7052519,
    osmType: 'node',
    osmId: 10651034705,
    pinNote:
      'The pin is Hostel Littoral on Helipad Road. The Hostel Stories and VEXP Hostel are other hostels on that road.',
    reviews: [
      {
        id: 'littoral-sam',
        author: 'Sam',
        visited: 'Three nights, January 2026',
        body: 'The desk is on Helipad Road, a short walk inland from the cliff edge. I had a private room, not a dorm, with a fan and a bathroom that was clean and small. Hot water came in the evening and not at 7am. Wifi held for messages and dropped on a call. I would not confuse this door with The Hostel Stories, which is further down the same road.',
        signals: [
          'Helipad Road, and a private room rather than a dorm',
          'Hot water in the evening, and wifi that dropped',
          'Names the other hostel on the same road',
        ],
      },
    ],
  },
  {
    id: 'the-hostel-stories',
    kind: 'stay',
    name: 'The Hostel Stories',
    nightlyInr: 800,
    seasonNightlyInr: 1200,
    area: 'North Cliff',
    address: 'Helipad Road, Varkala, Kerala 695311',
    lat: 8.7363379,
    lng: 76.7057689,
    osmType: 'node',
    osmId: 10736652205,
    pinNote:
      'The pin is The Hostel Stories on Helipad Road, south of Hostel Littoral and VEXP Hostel.',
    reviews: [
      {
        id: 'stories-leela',
        author: 'Leela',
        visited: 'One night, August 2026',
        body: 'I checked into a four-bed dorm. The sheet was clean and the mattress was thin. Someone was at the desk when I arrived after dark, and the lane outside was quiet compared with Cliff Street. There is no sea view from the bed. The cliff path is a walk, not a step from the door. This pin is The Hostel Stories, not Littoral.',
        signals: [
          'A four-bed dorm, and no sea view from the bed',
          'Arrival after dark, and how far the cliff path is',
          'Which hostel on Helipad Road this is',
        ],
      },
    ],
  },
  {
    id: 'zebra-hostel',
    kind: 'stay',
    name: 'Zebra Hostel',
    nightlyInr: 1000,
    seasonNightlyInr: 1500,
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.738215,
    lng: 76.7052438,
    osmType: 'node',
    osmId: 10736456105,
    pinNote:
      'The pin is Zebra Hostel on Cliff 2nd street. Deshadan is the guesthouse further along that street, not this hostel.',
    reviews: [
      {
        id: 'zebra-arjun',
        author: 'Arjun',
        visited: 'Two nights, February 2026',
        body: 'The room I got was a private double on Cliff 2nd street, with a fan and an air conditioner that managed the afternoon. The common fridge had space for water. I could hear the lane until about 11, then it went quiet. Breakfast was eggs if I asked, and it was not included in the bed rate. Deshadan is a different building on this street.',
        signals: [
          'A private double on Cliff 2nd street',
          'The fridge, the lane noise, and breakfast that cost extra',
          'Separates this hostel from Deshadan',
        ],
      },
    ],
  },
  {
    id: 'vexp-hostel',
    kind: 'stay',
    name: 'VEXP Hostel',
    nightlyInr: 700,
    seasonNightlyInr: 1050,
    area: 'North Cliff',
    address: 'Helipad Road, Varkala, Kerala 695311',
    lat: 8.7375591,
    lng: 76.7055738,
    osmType: 'node',
    osmId: 4382876989,
    pinNote:
      'The pin is VEXP Hostel on Helipad Road. Hostel Littoral and The Hostel Stories are separate doors on the same road.',
    reviews: [
      {
        id: 'vexp-ina',
        author: 'Ina',
        visited: 'Four nights, June 2026',
        body: 'I had a top bunk. The ladder was steep and the socket was by the lower bunk, so I charged the phone in the common room. Showers were cold in the morning and fine later. The place is on Helipad Road, inland from the cafes, and the walk to Cliff Street took about ten minutes with a bag. I did not walk into Littoral; the sign at this door says VEXP.',
        signals: [
          'A top bunk, and where the socket was',
          'Cold morning showers, and the walk to Cliff Street',
          'Which sign is on this door',
        ],
      },
    ],
  },
  {
    id: 'yog-hostel',
    kind: 'stay',
    name: 'YoG Hostel',
    nightlyInr: 1200,
    seasonNightlyInr: 1800,
    area: 'Black Beach',
    address: 'Thiruvambadi Beach Road, Varkala, Kerala 695311',
    lat: 8.7434024,
    lng: 76.6987358,
    osmType: 'node',
    osmId: 13481855354,
    pinNote:
      'The pin is YoG Hostel on Thiruvambadi Beach Road at the black-beach end. Black Beach Resort is the other pin nearby, not this hostel.',
    reviews: [
      {
        id: 'yog-farah',
        author: 'Farah',
        visited: 'Two nights, March 2026',
        body: 'This is the north end of the cliff, on Thiruvambadi Beach Road, not the cafe strip. I slept in a small private room. The balcony faced the lane, not the sea. The beach below is the dark sand, and the path down is steep. Wifi was enough for a map and not for a video call. Black Beach Resort is the neighbouring name; this desk is the hostel.',
        signals: [
          'Which end of the cliff, and a lane-facing balcony',
          'The steep path to the dark sand',
          'Distinguishes Black Beach Resort',
        ],
      },
    ],
  },
  {
    id: 'prasanthi-cliff-beach-resort',
    kind: 'stay',
    name: 'Prasanthi Cliff Beach Resort',
    nightlyInr: 5500,
    seasonNightlyInr: 8250,
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.739777,
    lng: 76.6999424,
    osmType: 'way',
    osmId: 299267534,
    pinNote:
      'The pin is the Prasanthi Cliff Beach Resort building on Cliff 2nd street, on the sea side of that road. It is not Zebra Hostel.',
    reviews: [
      {
        id: 'prasanthi-joseph',
        author: 'Joseph',
        visited: 'Two nights, December 2025',
        body: 'We had a room facing the cliff path, not a full sea view from the bed. The building is on Cliff 2nd street. Air conditioning was quiet. The restaurant downstairs did a thali at dinner that was ordinary and filling. Towels were thin. I would book this for the cliff walk, and I would not expect the hostel prices on the same street.',
        signals: [
          'Which way the room faced, and which street',
          'A quiet air conditioner and an ordinary thali',
          'Thin towels, and that this is not a hostel',
        ],
      },
    ],
  },
  {
    id: 'sea-view-beach-resort',
    kind: 'stay',
    name: 'Sea View Beach Resort',
    nightlyInr: 5000,
    seasonNightlyInr: 7500,
    area: 'North Cliff',
    address: 'Cliff Street, Varkala, Kerala 695311',
    lat: 8.737574,
    lng: 76.7025151,
    osmType: 'node',
    osmId: 13462317464,
    pinNote:
      'The pin is Sea View Beach Resort on Cliff Street. Le Coco Beach Resort is a separate building on that street.',
    reviews: [
      {
        id: 'seaview-maya',
        author: 'Maya',
        visited: 'One night, November 2025',
        body: 'The room was on the upper floor of the Cliff Street building. I could see water from the balcony and the cafe roofs from the bed. The shower was hot. The mattress was hard. Checkout was straightforward at 10. This is the Sea View pin, not Le Coco, which is a different front on the same street.',
        signals: [
          'Upper floor, and what the balcony showed',
          'A hot shower and a hard mattress',
          'Separates this resort from Le Coco',
        ],
      },
    ],
  },
  {
    id: 'black-beach-resort',
    kind: 'stay',
    name: 'Black Beach Resort',
    nightlyInr: 6000,
    seasonNightlyInr: 9000,
    area: 'Black Beach',
    address: 'Thiruvambadi Beach Road, Varkala, Kerala 695141',
    lat: 8.7433922,
    lng: 76.6992057,
    osmType: 'node',
    osmId: 5300920239,
    pinNote:
      'The pin is Black Beach Resort on Thiruvambadi Beach Road, by the helipad label on the map. YoG Hostel is the nearby hostel, not this resort.',
    reviews: [
      {
        id: 'blackbeach-ravi',
        author: 'Ravi',
        visited: 'Three nights, January 2026',
        body: 'We stayed in a sea-side room at the north end, on Thiruvambadi Beach Road. The sand below is dark, and the steps down are uneven. The room had an air conditioner and a balcony with a plastic chair. Dinner in the restaurant was late and the fish was fine. I would not send someone here who wants to roll out of bed into Clafouti; that walk is a real one.',
        signals: [
          'A sea-side room at the north end, and the uneven steps',
          'The balcony chair and a late fish dinner',
          'How far this is from the cafe strip',
        ],
      },
    ],
  },
  {
    id: 'pachamama-beach-resort',
    kind: 'stay',
    name: 'Pachamama Beach Resort',
    nightlyInr: 6500,
    seasonNightlyInr: 9750,
    area: 'North Cliff',
    address: 'Thiruvambadi Beach Road, Varkala, Kerala 695141',
    lat: 8.7398691,
    lng: 76.7043791,
    osmType: 'node',
    osmId: 11001125505,
    pinNote:
      'The pin is Pachamama Beach Resort on Thiruvambadi Beach Road. Happy Buddha Resort is a different building on that road.',
    reviews: [
      {
        id: 'pachamama-claire',
        author: 'Claire',
        visited: 'Two nights, February 2026',
        body: 'The cottage we got was set back from Thiruvambadi Beach Road, with a small porch. I could hear the sea and not see it from the bed. Mosquitoes were in the bathroom at dusk. The fan was enough at night in February; I used the air conditioner for an hour in the afternoon. Happy Buddha is not this gate.',
        signals: [
          'A cottage porch, and no sea view from the bed',
          'Mosquitoes at dusk, and when the air conditioner was needed',
          'Which resort gate this is',
        ],
      },
    ],
  },
  {
    id: 'le-coco-beach-resort',
    kind: 'stay',
    name: 'Le Coco Beach Resort',
    nightlyInr: 4500,
    seasonNightlyInr: 6750,
    area: 'North Cliff',
    address: 'Cliff Street, Varkala, Kerala 695311',
    lat: 8.7378786,
    lng: 76.7032661,
    osmType: 'way',
    osmId: 1467991160,
    pinNote:
      'The pin is the Le Coco Beach Resort building on Cliff Street. Sea View Beach Resort and The Lost Hostel are other pins on that street.',
    reviews: [
      {
        id: 'lecoco-nikhil',
        author: 'Nikhil',
        visited: 'One night, September 2026',
        body: 'I had a standard room on Cliff Street, second line back from the edge. The window looked at a wall and a bit of sky. The bed was fine, the bathroom tap dripped, and they left a towel. It is a resort room, not a dorm. The Lost Hostel is a different door on this street, and so is Sea View.',
        signals: [
          'A standard room set back from the cliff edge',
          'A dripping tap, and that this is not a dorm',
          'Names the other stays on Cliff Street',
        ],
      },
    ],
  },
  {
    id: 'hilltop-beach-resort',
    kind: 'stay',
    name: 'Hilltop Beach Resort',
    nightlyInr: 4000,
    seasonNightlyInr: 6000,
    area: 'North Cliff',
    address: 'Cliff 2nd street, Varkala, Kerala 695311',
    lat: 8.7386386,
    lng: 76.7011389,
    osmType: 'node',
    osmId: 13481855368,
    pinNote:
      'The pin is Hilltop Beach Resort on Cliff 2nd street. Prasanthi Cliff Beach Resort is the larger building closer to the sea on that street.',
    reviews: [
      {
        id: 'hilltop-sara',
        author: 'Sara',
        visited: 'Two nights, April 2026',
        body: 'The room was up a flight, on Cliff 2nd street, with a partial view of roofs and then the water. The air conditioner rattled on the low setting. Breakfast was toast and fruit and it was included the first morning only. I walked to the cliff edge in about three minutes. Prasanthi is the other resort building toward the sea, not this one.',
        signals: [
          'An upstairs room and a partial view',
          'A rattling air conditioner, and breakfast only on the first morning',
          'How this pin differs from Prasanthi',
        ],
      },
    ],
  },
  {
    id: 'happy-buddha-resort',
    kind: 'stay',
    name: 'Happy Buddha Resort',
    nightlyInr: 4800,
    seasonNightlyInr: 7200,
    area: 'North Cliff',
    address: 'Thiruvambadi Beach Road, Varkala, Kerala 695311',
    lat: 8.7404531,
    lng: 76.7021735,
    osmType: 'way',
    osmId: 1468744816,
    pinNote:
      'The pin is the Happy Buddha Resort building on Thiruvambadi Beach Road. Pachamama Beach Resort is a separate pin on that road.',
    reviews: [
      {
        id: 'buddha-omar',
        author: 'Omar',
        visited: 'One night, August 2026',
        body: 'I arrived by auto and the driver stopped on Thiruvambadi Beach Road at this gate, not at Pachamama. The room was simple, the sheets were clean, and the balcony furniture was a plastic chair. I could see the cliff path. There was no pool when I asked. Dinner was a short menu and I ate at a cafe instead.',
        signals: [
          'Where the auto stopped, and which gate it was not',
          'Clean sheets, a plastic chair, and no pool',
          'A short dinner menu he skipped',
        ],
      },
    ],
  },
  {
    id: 'ashokam-resort',
    kind: 'stay',
    name: 'Ashokam Resort',
    nightlyInr: 3500,
    seasonNightlyInr: 5250,
    area: 'Edava',
    address: 'Sree Eight - Manthara Cliff way, Edava, Varkala, Kerala 695311',
    lat: 8.758872,
    lng: 76.6885718,
    osmType: 'way',
    osmId: 1434307542,
    pinNote:
      'The pin is Ashokam Resort on Sree Eight - Manthara Cliff way in Edava. Blue Water is the hotel on Anjumukku - Odayam Road, not this building.',
    reviews: [
      {
        id: 'ashokam-priya',
        author: 'Priya',
        visited: 'Two nights, July 2026',
        body: 'This is Edava, on Sree Eight - Manthara Cliff way, north of the cafe cliff. The auto from the station took about twenty-five minutes. The room faced a garden. The beach is a walk down a local path, and it was empty on a Tuesday. The air conditioner was weak and the fan was the useful one. Blue Water is a different hotel on a different road.',
        signals: [
          'Which road in Edava, and how long the auto took',
          'A garden-facing room and an empty Tuesday beach',
          'Separates this resort from Blue Water',
        ],
      },
    ],
  },
  {
    id: 'elixir-cliff-beach-resort',
    kind: 'stay',
    name: 'Elixir Cliff Beach Resort And Spa',
    nightlyInr: 9000,
    seasonNightlyInr: 13500,
    area: 'South Cliff',
    address: 'Varkala Taluk Hospital - Aliyirakkam Road, South Cliff, Varkala, Kerala 695141',
    lat: 8.7253791,
    lng: 76.712759,
    osmType: 'way',
    osmId: 1429738337,
    pinNote:
      'The pin is the Elixir resort grounds on Varkala Taluk Hospital - Aliyirakkam Road in South Cliff. South Cliff Beach Resort is the separate pin on Temple Road.',
    reviews: [
      {
        id: 'elixir-helen',
        author: 'Helen',
        visited: 'Two nights, December 2025',
        body: 'The resort is south of the temple, on the hospital road, not on the North Cliff cafe path. I had a room with a balcony toward the sea and an air conditioner that was quiet. The spa menu was a printed sheet and I did not book a treatment. Breakfast was included and it was idli, fruit, and eggs. The walk to Papanasam is shorter than the walk to Clafouti. South Cliff Beach Resort is not this gate.',
        signals: [
          'South of the temple, on the hospital road',
          'A quiet air conditioner, and a spa menu she did not use',
          'Breakfast, and which resort this is not',
        ],
      },
    ],
  },
  {
    id: 'south-cliff-beach-resort',
    kind: 'stay',
    name: 'South Cliff Beach Resort',
    nightlyInr: 4200,
    seasonNightlyInr: 6300,
    area: 'South Cliff',
    address: 'Temple Road, Varkala, Kerala 695312',
    lat: 8.7283466,
    lng: 76.709905,
    osmType: 'node',
    osmId: 13458344799,
    pinNote:
      'The pin is South Cliff Beach Resort on Temple Road. Elixir Cliff Beach Resort And Spa is the larger grounds on the hospital road, not this node.',
    reviews: [
      {
        id: 'southcliff-thomas',
        author: 'Thomas',
        visited: 'One night, October 2025',
        body: 'I stayed in a ground-floor room on Temple Road, on the south side of town. The cliff here is quieter than North Cliff. The room had a fan and an air conditioner, and the fan was what I used. There is no cafe strip outside the door. An auto back to the temple beach was a short ride. Elixir is the other resort, on the hospital road.',
        signals: [
          'A ground-floor room on Temple Road',
          'A fan he actually used, and no cafe strip outside',
          'How this differs from Elixir',
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
