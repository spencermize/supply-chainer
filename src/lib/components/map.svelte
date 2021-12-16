<script lang="ts">
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

    import type { PRODUCTS, PACKAGING } from "$lib/data";
    import { onMount, tick } from "svelte";
    import Style from "ol/style/Style";
    import Stroke from "ol/style/Stroke";
    
    export let product: typeof PRODUCTS[0];
    export let packaging: typeof PACKAGING;
    export let currentPackaging: number;

    let map: Map;

    onMount(initMap);

    const productLocationSource = new VectorSource();
    const transitSource = new VectorSource();

    function initMap() {
        const view: View = new View({
            projection: "EPSG:3857",
            zoom: 13
        });

        const tileLayer = new TileLayer({
            source: new Stamen({
                layer: "terrain",
            }),
        });

        const productLocationLayer = new VectorLayer({
            source: productLocationSource,
        });

        const transitLayer = new VectorLayer({
            source: transitSource,
            style: (feature) => {
                return new Style({
                    stroke: new Stroke({
                        color: currentPackaging === feature.getId() ? 'blue' : 'grey',
                        width: currentPackaging === feature.getId() ? 5 : 2
                    })
                });
            }
        });
        map = new Map({
            target: "map",
            interactions: defaults({ dragPan: true, mouseWheelZoom: true }),
            layers: [tileLayer, productLocationLayer, transitLayer],
            view,
        });
    }

    $: {
        if (map) {
            currentPackaging; // Simply including this here makes the map get re-rendered when it changes, picking up on the new value.
            const productLocation = [
                product.manufacturingLocation.longitude,
                product.manufacturingLocation.latitude,
            ];

            const productLocationFeature = new Feature(
                new Point(fromLonLat(productLocation))
            );

            productLocationSource.clear();   
            productLocationSource.addFeature(productLocationFeature);

            transitSource.clear();
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
                features.forEach((feature) => {
                    feature.setId(item.id);
                    transitSource.addFeature(feature);
                });
            });
            tick().then( () => {
                map.getView().animate({zoom: 3}, {center: fromLonLat(productLocation)});
            });
        }
    }
</script>

<div id="map" class="h-screen" />
