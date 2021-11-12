// This file holds some static data on our products.
// In a more realistic scenario, this would come from a database and would only
// be accessible on the backend.

export const PRODUCTS = [
  {
    id: 12345,
    name: "Face cream",
    unitsPerYear: 100000,
    manufacturingLocation: {
      name: "Edison, NJ",
      latitude: 40.5274,
      longitude: -74.3933
    }
  },
  {
    id: 23456,
    name: "Toothpaste",
    unitsPerYear: 452000,
    manufacturingLocation: {
      name: "Phoenix, AZ",
      latitude: 33.448333,
      longitude: -112.073889
    }
  },
  {
    id: 34567,
    name: "Shampoo",
    unitsPerYear: 238000,
    manufacturingLocation: {
      name: "Seoul, South Korea",
      latitude: 37.5666791,
      longitude: -126.9782914
    }
  }
];

export const PACKAGING = [
  {
    id: 111,
    type: "Jar",
    productId: 12345,
    weightG: 15,
    manufacturingLocation: {
      name: "London, United Kingdom",
      latitude: 51.5073219,
      longitude: -0.1276474,
    }
  },
  {
    id: 112,
    type: "Lid",
    productId: 12345,
    weightG: 5,
    manufacturingLocation: {
      name: "London, United Kingdom",
      latitude: 51.5073219,
      longitude: -0.1276474,
    }
  },
  {
    id: 221,
    type: "Tube",
    productId: 23456,
    weightG: 10,
    manufacturingLocation: {
      name: "Shanghai, China",
      latitude: 31.2322758,
      longitude: 121.4692071
    }
  },
  {
    id: 222,
    type: "Cap",
    productId: 23456,
    weightG: 2,
    manufacturingLocation: {
      name: "Shanghai, China",
      latitude: 31.2322758,
      longitude: 121.4692071
    }
  },
  {
    id: 223,
    type: "Carton",
    productId: 23456,
    weightG: 3,
    manufacturingLocation: {
      name: "Secaucus, NJ",
      latitude: 40.7899291,
      longitude: -74.0566735
    }
  },
  {
    id: 331,
    type: "Bottle",
    productId: 34567,
    weightG: 25,
    manufacturingLocation: {
      name: "New York, NY",
      latitude: 40.7127281,
      longitude: -74.0060152
    }
  },
  {
    id: 332,
    type: "Cap",
    productId: 34567,
    weightG: 5,
    manufacturingLocation: {
      name: "Rome, Italy",
      latitude: 41.883333,
      longitude: 12.5
    }
  }
];
