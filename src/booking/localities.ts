export type Locality = {
  id: string
  name: string
  lat: number
  lng: number
  keys: string[]
}

export const localities: Locality[] = [
  { id: 'adugodi', name: 'Adugodi', lat: 12.942, lng: 77.61, keys: ['adugodi'] },
  { id: 'banashankari', name: 'Banashankari', lat: 12.9255, lng: 77.5468, keys: ['banashankari'] },
  { id: 'banaswadi', name: 'Banaswadi', lat: 13.015, lng: 77.65, keys: ['banaswadi'] },
  { id: 'bannerghatta', name: 'Bannerghatta Road', lat: 12.889, lng: 77.5975, keys: ['bannerghatta'] },
  { id: 'basavanagudi', name: 'Basavanagudi', lat: 12.941, lng: 77.571, keys: ['basavanagudi'] },
  { id: 'begur', name: 'Begur', lat: 12.86, lng: 77.63, keys: ['begur'] },
  { id: 'bellandur', name: 'Bellandur', lat: 12.926, lng: 77.6762, keys: ['bellandur', 'kadubeesanahalli'] },
  { id: 'benson', name: 'Benson Town', lat: 13.0005, lng: 77.6, keys: ['benson town'] },
  { id: 'bommanahalli', name: 'Bommanahalli', lat: 12.905, lng: 77.62, keys: ['bommanahalli'] },
  { id: 'brookefield', name: 'Brookefield', lat: 12.966, lng: 77.716, keys: ['brookefield', 'brooke field'] },
  { id: 'btm', name: 'BTM Layout', lat: 12.9166, lng: 77.6101, keys: ['btm layout', 'btm'] },
  { id: 'commercial', name: 'Commercial Street', lat: 12.982, lng: 77.608, keys: ['commercial street'] },
  { id: 'cooke', name: 'Cooke Town', lat: 13.0, lng: 77.625, keys: ['cooke town'] },
  { id: 'cox', name: 'Cox Town', lat: 12.995, lng: 77.62, keys: ['cox town'] },
  { id: 'cunningham', name: 'Cunningham Road', lat: 12.9892, lng: 77.5948, keys: ['cunningham'] },
  { id: 'cv-raman', name: 'CV Raman Nagar', lat: 12.985, lng: 77.664, keys: ['cv raman', 'c.v. raman'] },
  { id: 'devanahalli', name: 'Devanahalli', lat: 13.248, lng: 77.711, keys: ['devanahalli', 'kempegowda airport'] },
  { id: 'domlur', name: 'Domlur', lat: 12.961, lng: 77.638, keys: ['domlur'] },
  { id: 'ejipura', name: 'Ejipura', lat: 12.945, lng: 77.626, keys: ['ejipura'] },
  { id: 'electronic-city', name: 'Electronic City', lat: 12.8452, lng: 77.6603, keys: ['electronic city', 'electronics city'] },
  { id: 'frazer', name: 'Frazer Town', lat: 12.997, lng: 77.614, keys: ['frazer town', 'fraser town'] },
  { id: 'haralur', name: 'Haralur', lat: 12.905, lng: 77.665, keys: ['haralur'] },
  { id: 'hbr', name: 'HBR Layout', lat: 13.035, lng: 77.625, keys: ['hbr layout'] },
  { id: 'hebbal', name: 'Hebbal', lat: 13.0354, lng: 77.597, keys: ['hebbal kempapura', 'hebbal'] },
  { id: 'hennur', name: 'Hennur', lat: 13.035, lng: 77.64, keys: ['hennur'] },
  { id: 'hoodi', name: 'Hoodi', lat: 12.992, lng: 77.715, keys: ['hoodi'] },
  { id: 'horamavu', name: 'Horamavu', lat: 13.027, lng: 77.66, keys: ['horamavu'] },
  { id: 'hosur', name: 'Hosur Road', lat: 12.9, lng: 77.625, keys: ['hosur road'] },
  { id: 'hsr', name: 'HSR Layout', lat: 12.9121, lng: 77.6446, keys: ['hsr layout', 'hsr'] },
  { id: 'indiranagar', name: 'Indiranagar', lat: 12.9784, lng: 77.6408, keys: ['indiranagar', 'indira nagar', 'chinmaya mission', 'cmh road'] },
  { id: 'infantry', name: 'Infantry Road', lat: 12.982, lng: 77.6, keys: ['infantry road'] },
  { id: 'jakkur', name: 'Jakkur', lat: 13.078, lng: 77.606, keys: ['jakkur'] },
  { id: 'jalahalli', name: 'Jalahalli', lat: 13.052, lng: 77.548, keys: ['jalahalli'] },
  { id: 'jayanagar', name: 'Jayanagar', lat: 12.9308, lng: 77.5838, keys: ['jayanagar', 'jaya nagar'] },
  { id: 'jayamahal', name: 'Jayamahal', lat: 13.002, lng: 77.595, keys: ['jayamahal'] },
  { id: 'jeevan-bhima', name: 'Jeevan Bhima Nagar', lat: 12.967, lng: 77.656, keys: ['jeevan bhima', 'jeevanbheema'] },
  { id: 'jp-nagar', name: 'JP Nagar', lat: 12.91, lng: 77.585, keys: ['jp nagar', 'j.p. nagar', 'j p nagar'] },
  { id: 'kalyan-nagar', name: 'Kalyan Nagar', lat: 13.0225, lng: 77.6405, keys: ['kalyan nagar'] },
  { id: 'kammanahalli', name: 'Kammanahalli', lat: 13.015, lng: 77.637, keys: ['kammanahalli', 'kamannahalli'] },
  { id: 'kanakapura', name: 'Kanakapura Road', lat: 12.888, lng: 77.56, keys: ['kanakapura'] },
  { id: 'kasturi', name: 'Kasturi Nagar', lat: 13.005, lng: 77.66, keys: ['kasturi nagar'] },
  { id: 'kengeri', name: 'Kengeri', lat: 12.899, lng: 77.482, keys: ['kengeri'] },
  { id: 'konanakunte', name: 'Konanakunte', lat: 12.885, lng: 77.568, keys: ['konanakunte'] },
  { id: 'koramangala', name: 'Koramangala', lat: 12.9352, lng: 77.6245, keys: ['koramangala'] },
  { id: 'kothanur', name: 'Kothanur', lat: 13.061, lng: 77.648, keys: ['kothanur'] },
  { id: 'kr-puram', name: 'KR Puram', lat: 13.0005, lng: 77.695, keys: ['krishnarajapuram', 'kr puram', 'k.r. puram'] },
  { id: 'kumaraswamy', name: 'Kumaraswamy Layout', lat: 12.908, lng: 77.558, keys: ['kumaraswamy'] },
  { id: 'kundalahalli', name: 'Kundalahalli', lat: 12.968, lng: 77.715, keys: ['kundalahalli'] },
  { id: 'lavelle', name: 'Lavelle Road', lat: 12.9718, lng: 77.5985, keys: ['lavelle'] },
  { id: 'magadi', name: 'Magadi Road', lat: 12.9755, lng: 77.51, keys: ['magadi'] },
  { id: 'mahadevpura', name: 'Mahadevpura', lat: 12.989, lng: 77.692, keys: ['mahadevpura'] },
  { id: 'majestic', name: 'Majestic', lat: 12.977, lng: 77.572, keys: ['majestic', 'gandhi nagar'] },
  { id: 'malleshwaram', name: 'Malleshwaram', lat: 13.0031, lng: 77.5694, keys: ['malleshwaram', 'malleswaram', 'sampige road'] },
  { id: 'marathahalli', name: 'Marathahalli', lat: 12.9592, lng: 77.701, keys: ['marathahalli', 'marathahally'] },
  { id: 'mathikere', name: 'Mathikere', lat: 13.032, lng: 77.56, keys: ['mathikere'] },
  { id: 'mg-road', name: 'MG Road', lat: 12.975, lng: 77.606, keys: ['mahatma gandhi road', 'brigade road', 'church street', 'ashok nagar', 'shanthala nagar', 'sampangi', 'mg road'] },
  { id: 'nagawara', name: 'Nagawara', lat: 13.0435, lng: 77.6205, keys: ['nagawara', 'nagavara', 'manyata'] },
  { id: 'new-bel', name: 'New BEL Road', lat: 13.0295, lng: 77.5645, keys: ['new bel road', 'bel road'] },
  { id: 'old-airport', name: 'Old Airport Road', lat: 12.957, lng: 77.65, keys: ['old airport', 'hal airport'] },
  { id: 'padmanabhanagar', name: 'Padmanabhanagar', lat: 12.918, lng: 77.558, keys: ['padmanabhanagar'] },
  { id: 'panathur', name: 'Panathur', lat: 12.936, lng: 77.705, keys: ['panathur'] },
  { id: 'peenya', name: 'Peenya', lat: 13.033, lng: 77.52, keys: ['peenya'] },
  { id: 'rajajinagar', name: 'Rajajinagar', lat: 12.9991, lng: 77.555, keys: ['rajajinagar', 'rajaji nagar', 'rajkumar road'] },
  { id: 'ramamurthy', name: 'Ramamurthy Nagar', lat: 13.012, lng: 77.678, keys: ['ramamurthy'] },
  { id: 'richmond', name: 'Richmond Town', lat: 12.963, lng: 77.601, keys: ['richmond town', 'richmond road'] },
  { id: 'rr-nagar', name: 'RR Nagar', lat: 12.92, lng: 77.52, keys: ['rajarajeshwari', 'rr nagar'] },
  { id: 'rt-nagar', name: 'RT Nagar', lat: 13.02, lng: 77.595, keys: ['rt nagar', 'r.t. nagar', 'r t nagar'] },
  { id: 'sadashivanagar', name: 'Sadashivanagar', lat: 13.008, lng: 77.58, keys: ['sadashivanagara', 'sadashivanagar', 'sadashivnagar'] },
  { id: 'sahakar', name: 'Sahakar Nagar', lat: 13.062, lng: 77.588, keys: ['sahakar nagar'] },
  { id: 'sanjay', name: 'Sanjay Nagar', lat: 13.03, lng: 77.58, keys: ['sanjay nagar'] },
  { id: 'sarjapur', name: 'Sarjapur Road', lat: 12.91, lng: 77.683, keys: ['sarjapur'] },
  { id: 'seshadripuram', name: 'Seshadripuram', lat: 12.993, lng: 77.575, keys: ['seshadripuram'] },
  { id: 'shantinagar', name: 'Shantinagar', lat: 12.956, lng: 77.599, keys: ['shantinagar', 'shanti nagar'] },
  { id: 'shivajinagar', name: 'Shivajinagar', lat: 12.986, lng: 77.603, keys: ['shivajinagar', 'shivaji nagar'] },
  { id: 'st-marks', name: "St Mark's Road", lat: 12.972, lng: 77.601, keys: ["saint mark's", "st. mark's", 'st marks', 'residency road', 'vittal mallya'] },
  { id: 'ulsoor', name: 'Ulsoor', lat: 12.9815, lng: 77.619, keys: ['ulsoor', 'halasuru'] },
  { id: 'uttarahalli', name: 'Uttarahalli', lat: 12.906, lng: 77.545, keys: ['uttarahalli'] },
  { id: 'vasanth', name: 'Vasanth Nagar', lat: 12.991, lng: 77.5925, keys: ['vasanth nagar', 'palace road'] },
  { id: 'vijayanagar', name: 'Vijayanagar', lat: 12.97, lng: 77.537, keys: ['vijayanagar', 'vijaya nagar'] },
  { id: 'whitefield', name: 'Whitefield', lat: 12.9698, lng: 77.7499, keys: ['whitefield', 'kadugodi'] },
  { id: 'wilson', name: 'Wilson Garden', lat: 12.95, lng: 77.595, keys: ['wilson garden', 'dairy circle'] },
  { id: 'yelahanka', name: 'Yelahanka', lat: 13.1005, lng: 77.5963, keys: ['yelahanka'] },
  { id: 'yeshwanthpur', name: 'Yeshwanthpur', lat: 13.028, lng: 77.54, keys: ['yeshwanthpur', 'yeshwantpur', 'yeshwanthapura'] },
]

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const matchers = localities
  .flatMap((locality) =>
    locality.keys.map((key) => ({
      locality,
      length: key.length,
      pattern: new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(key)}(?:[^a-z0-9]|$)`, 'i'),
    })),
  )
  .sort((a, b) => b.length - a.length)

export function locateRestaurant(restaurant: {
  name: string
  area: string
  address: string
}): Locality | null {
  const haystack = `${restaurant.name} ${restaurant.area} ${restaurant.address}`
  let best: { index: number; length: number; locality: Locality } | null = null

  for (const matcher of matchers) {
    const found = matcher.pattern.exec(haystack)
    if (!found) continue
    const index = found.index
    if (
      !best ||
      index < best.index ||
      (index === best.index && matcher.length > best.length)
    ) {
      best = { index, length: matcher.length, locality: matcher.locality }
    }
  }

  return best?.locality ?? null
}

export function localityById(id: string): Locality | null {
  return localities.find((place) => place.id === id) ?? null
}
