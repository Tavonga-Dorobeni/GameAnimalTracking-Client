<template>
  <div class="h-[350px] w-full">
    <l-map
      :center="center"
      v-model="zoom"
      v-model:zoom="zoom"
      :minZoom="3"
      :maxZoom="18"
      :zoomAnimation="true"
    >
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="markerLatLng" />
      <l-polygon :lat-lngs="polygon_N.latlngs" :color="polygon_N.color" />
      <l-polygon :lat-lngs="polygon_S.latlngs" :color="polygon_S.color" />
    </l-map>
  </div>
</template>

<script>
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircle,
  LPolygon,
} from "@vue-leaflet/vue-leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle,
    LPolygon,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 16,
      center: [-17.83868526679876, 31.007369057051193],
      markerLatLng: [-17.839515, 31.007354],
      circle: {
        center: [47.31322, -1.319482],
        radius: 4500,
        color: "#EA5455",
      },
      polygon_S: {
        latlngs: [
          [-17.83923341307041, 31.00650569939989],
          [-17.839067451877124, 31.006468148475484],
          [-17.838914256792176, 31.00716552278599],
          [-17.83907511162792, 31.007200391501513],
          [-17.83923341307041, 31.00650569939989],
        ],
        color: "#7367F0",
      },
      polygon_N: {
        latlngs: [
          [-17.838870851494125, 31.006419868715522],
          [-17.838709996473856, 31.006384999999998],
          [-17.838551694565975, 31.007074327683842],
          [-17.838715102984672, 31.00710919639937],
          [-17.838870851494125, 31.006419868715522],
        ],
        color: "#EA5455",
      },
    };
  },
};
</script>
