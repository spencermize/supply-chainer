<script lang="ts" context="module">
  export async function load({ page, fetch }) {
    const response = await fetch(`/product/${page.params.id}/details`);
    if (response.ok) {
      const responseJson = await response.json();

      return {
        props: responseJson,
      };
    } else {
      console.error("Error in loading product details");
      return {
        props: {},
      };
    }
  }

  // Tip: if you have trouble debugging the response from the endpoint, try
  // disabling server-side rendering by uncommenting the following line. That
  // will force the fetch to happen in the browser.
  // export const ssr = false;
</script>

<script lang="ts">
  // This special "export let" syntax is to define this component's props in Svelte.
  // As part of SvelteKit, the props will be set from the props field in the
  // return value from `load` above.
  export let product = null;
  export let packaging = [];
  export let meta = null;

  import greatCirlce from "@turf/great-circle";
  import Stamen from "ol/source/Stamen";
  import Map from "ol/Map";
  import View from "ol/View";
  import TileLayer from "ol/layer/Tile";
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";
  import { defaults } from "ol/interaction";
  import Feature from "ol/Feature";
  import GeoJSON from "ol/format/GeoJSON";
  import { fromLonLat } from "ol/proj";
  import Point from "ol/geom/Point";

  function buildMap(target) {
    const productLocation = [
      product.manufacturingLocation.longitude,
      product.manufacturingLocation.latitude,
    ];

    const view: View = new View({
      projection: "EPSG:3857",
      zoom: 13,
      center: [-85.4812, 41.1668],
    });

    const tile = new TileLayer({
      source: new Stamen({
        layer: "terrain",
      }),
    });

    const gps = new VectorLayer({
      source: new VectorSource({
        features: [new Feature(new Point(fromLonLat(productLocation)))],
      }),
    });

    const transitSource = new VectorSource();
    const transit = new VectorLayer({
      source: transitSource,
    });

    const map = new Map({
      target,
      interactions: defaults({ dragPan: true, mouseWheelZoom: true }),
      layers: [tile, gps, transit],
      view,
    });

    packaging.forEach((item) => {
      const arc = greatCirlce(
        [
          item.manufacturingLocation.longitude,
          item.manufacturingLocation.latitude,
        ],
        productLocation
      );

      const features = new GeoJSON().readFeatures(arc, {
        featureProjection: "EPSG:3857",
      });
      features.forEach((feature) => transitSource.addFeature(feature));
    });

    map.getView().fit(transitSource.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });

    // map.getView().setCenter(productLocation);
  }
</script>

<div class="container mx-auto h-screen">
  <a href="/">Back to products</a>

  <div class="p-4 grid grid-cols-2 min-h-3/4">
    <div class="left px-4">
      <h1 class="text-6xl font-normal leading-normal mt-0 mb-1">
        Product Data
      </h1>
      <h2 class="text-5xl font-normal leading-normal mt-0 mb-2 text-green-500">
        {product.name}
      </h2>
      <div class="mb-3 pt-0 px-3">
        <label class="font-bold block pb-1" for="unitsPerYear"
          >Units Per Year</label
        >
        <input
          type="number"
          id="unitsPerYear"
          value={product.unitsPerYear}
          min="0"
          placeholder="Placeholder"
          class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
        />
      </div>

      <h1 class="text-6xl font-normal leading-normal mt-0 mb-2">
        Packaging data
      </h1>
      {#each packaging as { id, type, weightG, manufacturingLocation }, i}
        <div class="p-4">
          <div class="mb-3 pt-0 px-3">
            <h3 class="font-bold text-3xl">
              {type}
              <small class="block text-gray-300 font-normal text-base"
                >Item ID: {id}</small
              >
            </h3>
            <p>
              <span class="font-bold">Manufacturing Location:</span>
              {manufacturingLocation.name}
            </p>
            <label class="font-bold block pb-1" for="weightInGrams"
              >Weight in Grams</label
            >
            <input
              type="number"
              id="weightInGrams"
              value={weightG}
              min="0"
              placeholder="Placeholder"
              class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
            />
          </div>
        </div>
      {/each}
      <h1 class="text-6xl font-normal leading-normal mt-0 mb-2">
        Calculated results
      </h1>
      <ul class="pt-4">
        <li>
          Length of supply chain: {meta.supplyChainLength.toLocaleString()} km
        </li>
        <li>
          Amount of packaging per year: {meta.annualPackagingWeight / 1000000}
          tonnes
        </li>
        <li>
          Pieces of packaging per year: {meta.annualPackagingPieces.toLocaleString()}
        </li>
        <li>
          Total weight transported: {(
            (meta.annualPackagingWeight / 1000000) *
            meta.supplyChainLength
          ).toLocaleString()} tonne-kms
        </li>
      </ul>
    </div>
    <div class="right px-4">
      <div id="map" class="h-full" use:buildMap />
    </div>
  </div>
</div>
