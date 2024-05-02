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
      <l-marker :lat-lng="defaultMarker" />
      <l-polygon v-for="item in geofences" :key="i" :lat-lngs="item.latlngs" :color="item.color" />
    </l-map>
  </div>
</template>

<script>
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapGetters } from 'vuex';
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
      zoom: 17,
      center: [-17.83868526679876, 31.007369057051193],
      markerLatLng: [-17.839515, 31.007354],
      defaultMarker: [-17.839494, 31.007320],
      markers: [
        [-17.838018, 31.006427],
        [-17.838011, 31.006668],
        [-17.838099, 31.006838],
        [-17.838110, 31.007140],
        [-17.837940, 31.007384],
        [-17.837897, 31.007559],
      ],
      count: 0,
      circle: {
        center: [47.31322, -1.319482],
        radius: 4500,
        color: "#EA5455",
      },
      geofences: [
        // {
        //   latlngs: [
        //     [-17.839699, 31.008737],
        //     [-17.838739, 31.008544],
        //     [-17.838515, 31.009515],
        //     [-17.839439, 31.009767],
        //     [-17.839699, 31.008737]
        //   ],
        //   color: "#7367F0",
        // },
        {
          latlngs: [
            [-17.839296, 31.006870],
            [-17.839030, 31.008029],
            [-17.839209, 31.008201],
            [-17.839680, 31.007596],
            [-17.839503, 31.006876],
            [-17.839296, 31.006870],
          ],
          color: "#2C6AF9",
        },
        {
          latlngs: [
            [-17.839306, 31.006467],
            [-17.838547, 31.006291],
            [-17.838390, 31.007062],
            [-17.839104, 31.007234],
            [-17.839306, 31.006467],
          ],
          color: "#00CA98",
        },
        {
          latlngs: [
            [-17.838859, 31.008348],
            [-17.837077, 31.007894],
            [-17.837235, 31.007181],
            [-17.839028, 31.007613],
            [-17.838859, 31.008348],
          ],
          color: "#00EBFD",
        },
        {
          latlngs: [
            [-17.839095, 31.007257],
            [-17.839014, 31.007609],
            [-17.838081, 31.007368],
            [-17.838158, 31.007031],
            [-17.839095, 31.007257],
          ],
          color: "#FF8B63",
        },
        {
          latlngs: [
            [-17.838363, 31.007046],
            [-17.838502, 31.006232],
            [-17.837306, 31.006047],
            [-17.837148, 31.006795],
            [-17.838363, 31.007046],
          ],
          color: "#FDEB00",
        },
        {
          latlngs: [
            [-17.837459, 31.006901],
            [-17.838129, 31.007036],
            [-17.838071, 31.007353],
            [-17.837368, 31.007162],
            [-17.837459, 31.006901],
          ],
          color: "#7367F0",
        },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "sortedAnimalLocations",
      "allAnimalLocations"
    ]),

    // markerLatLng() {
    //   return [this.sortedAnimalLocations[0].lat, this.sortedAnimalLocations[0].lng];
    // },
  },

  mounted(){
    this.$emitter.on('CronJob', () => {
      // this.count++
      // if(this.count == 3){
      //   window.alert('LION: Cecil has entered Sector E!')
      // } else if(this.count == 4){
      //   window.alert('LION: Cecil has entered Sector D!')
      // }
    })
  }
};
</script>
