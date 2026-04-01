export const SITE_DATA = {
  "siteName": "Lyon Short Stay",
  "contactEmail": "contact@lyonshortstay.fr",
  "contactPhone": "+33 6 42 98 45 35",
  "currency": "€",
  "language": "fr",
  "properties": [
    {
      "name": "Appartement Lyon",
      "bedrooms": 1,
      "location": "Lyon, France",
      "amenities": [
        "WiFi",
        "Cuisine équipée"
      ],
      "maxGuests": 2,
      "bookingUrl": "mailto:contact@lyonshortstay.fr",
      "description": "Charmant appartement d'une chambre situé à Lyon, la capitale de la gastronomie française. Idéalement placé pour explorer la Presqu'île, le Vieux-Lyon et les fameux bouchons lyonnais. Un séjour authentique au cœur de la deuxième ville de France.",
      "pricePerNight": 90
    }
  ]
};

export type SiteData = typeof SITE_DATA;
