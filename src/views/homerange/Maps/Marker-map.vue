<template>
  <div class="h-[400px] w-full">
    <l-map
      :center="center"
      v-model="zoom"
      v-model:zoom="zoom"
      :minZoom="3"
      :maxZoom="18"
      :zoomAnimation="true"
    >
      <l-tile-layer :url="url" />
      <l-marker v-if="isLion" v-for="item in markers" :key="i" :lat-lng="item" />
      <l-polygon :lat-lngs="homerange.latlngs" :color="homerange.color" />
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
      isLion: false,
      // markers: [
      //   [-17.838018, 31.006427],
      //   [-17.838011, 31.006668],
      //   [-17.838099, 31.006838],
      //   [-17.838110, 31.007140],
      //   [-17.837940, 31.007384],
      //   [-17.837897, 31.007559],
      // ],
      count: 0,
      circle: {
        center: [47.31322, -1.319482],
        radius: 4500,
        color: "#EA5455",
      },
      homerange: 
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
          latlngs: [],
          color: "#00CA98",
        }
        // {
        //   latlngs: [
        //     [-17.839306, 31.006467],
        //     [-17.838547, 31.006291],
        //     [-17.838390, 31.007062],
        //     [-17.839104, 31.007234],
        //     [-17.839306, 31.006467],
        //   ],
        //   color: "#00CA98",
        // },
        // {
        //   latlngs: [
        //     [-17.838859, 31.008348],
        //     [-17.837077, 31.007894],
        //     [-17.837235, 31.007181],
        //     [-17.839028, 31.007613],
        //     [-17.838859, 31.008348],
        //   ],
        //   color: "#00EBFD",
        // },
        // {
        //   latlngs: [
        //     [-17.839095, 31.007257],
        //     [-17.839014, 31.007609],
        //     [-17.838081, 31.007368],
        //     [-17.838158, 31.007031],
        //     [-17.839095, 31.007257],
        //   ],
        //   color: "#FF8B63",
        // },
        // {
        //   latlngs: [
        //     [-17.838363, 31.007046],
        //     [-17.838502, 31.006232],
        //     [-17.837306, 31.006047],
        //     [-17.837148, 31.006795],
        //     [-17.838363, 31.007046],
        //   ],
        //   color: "#FDEB00",
        // },
        // {
        //   latlngs: [
        //     [-17.837459, 31.006901],
        //     [-17.838129, 31.007036],
        //     [-17.838071, 31.007353],
        //     [-17.837368, 31.007162],
        //     [-17.837459, 31.006901],
        //   ],
        //   color: "#7367F0",
        // },
    };
  },

  methods: {
    calculateDistance(coord1, coord2) {
      const R = 6371e3; // Earth's radius in meters
      const lat1 = coord1[0];
      const lon1 = coord1[1];
      const lat2 = coord2[0];
      const lon2 = coord2[1];

      const phi1 = lat1 * (Math.PI / 180);
      const phi2 = lat2 * (Math.PI / 180);
      const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
      const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) *
          Math.cos(phi2) *
          Math.sin(deltaLambda / 2) *
          Math.sin(deltaLambda / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      return distance;
    },

    isPointWithinDistance(point, coordinates, distanceThreshold) {
      for (const coord of coordinates) {
        const distance = this.calculateDistance(point, coord);
        if (distance > distanceThreshold) {
          return false;
        }
      }
      return true;
    },

    findOuterCoordinates(coordinates) {
      const n = coordinates.length;
      if (n < 3) {
        return [];
      }

      const isClockwise = (a, b, c) => {
        return (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1]) < 0;
      };

      coordinates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

      const lowerHull = [];
      for (let i = 0; i < n; i++) {
        while (lowerHull.length >= 2 && !isClockwise(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], coordinates[i])) {
          lowerHull.pop();
        }
        lowerHull.push(coordinates[i]);
      }

      const upperHull = [];
      for (let i = n - 1; i >= 0; i--) {
        while (upperHull.length >= 2 && !isClockwise(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], coordinates[i])) {
          upperHull.pop();
        }
        upperHull.push(coordinates[i]);
      }

      upperHull.pop();
      lowerHull.pop();
      const outerCoordinates = lowerHull.concat(upperHull);
      return outerCoordinates;
    },

    findConvexPolygon(coordinates) {
      const closeCoordinates = [];
      const distanceThreshold = 500; // meters

      for (let i = 0; i < coordinates.length; i++) {
        const current = coordinates[i];
        if (this.isPointWithinDistance(current, coordinates, distanceThreshold)) {
          closeCoordinates.push(current);
        }
      }

      const outerCoordinates = this.findOuterCoordinates(closeCoordinates);
      outerCoordinates[outerCoordinates.length] = outerCoordinates[0]
      this.homerange.latlngs = outerCoordinates
    }
  },

  computed: {
    ...mapGetters([
      "sortedAnimalLocations",
      "allAnimalLocations"
    ]),

    markers(){
      return this.allAnimalLocations.map(l => [l.lat, l.lng])
    }

    // markerLatLng() {
    //   return [this.sortedAnimalLocations[0].lat, this.sortedAnimalLocations[0].lng];
    // },
  },

  created(){
    this.findConvexPolygon(this.markers)
  },

  mounted(){
    this.$emitter.on('CronJob', () => {
      this.count++
      if(this.count == 3){
        window.alert('LION: Cecil has entered Sector E!')
      } else if(this.count == 4){
        window.alert('LION: Cecil has entered Sector D!')
      }
    })

    this.$emitter.on('LionHomerange', () => {
      this.isLion = true
      this.findConvexPolygon(this.markers)
    })

    this.$emitter.on('EverythingElse', () => {
      this.isLion = false
      this.homerange.latlngs = []
    })
  }
};
</script>
