<template>
  <div class="space-y-5">
    <div class="flex flex-wrap justify-between items-center mb-4">
      <span></span>
      <div
        class="md:flex md:space-x-4 md:justify-end items-center"
        :class="width < 768 ? 'space-x-rb' : ''"
      >
        <VueSelect label="Animal"
          ><vSelect :on-change="handleAnimalChange()" :options="['Lion', 'Zebra', 'Impala', 'Eland', 'Wildebeest']" v-model="animal"
        /></VueSelect>
      </div>
    </div>
    <Card title="Home Range">
      <markerMap />
    </Card>
    <!-- <Card title="leaflet GeoJSON Map">
      <Map4 />
    </Card> -->
  </div>
</template>
<script setup>
import Card from "@/components/Card";
import Map from "../home/Analytics-Component/Map";
import Map2 from "../home/Analytics-Component/Map2";
import Map4 from "./Maps/LefletOne";
import Map3 from "./Maps/Basic";
import markerMap from "./Maps/Marker-map.vue";
import VueSelect from "@/components/Select/VueSelect";
import vSelect from "vue-select";
import { ref } from "vue";
import { useEmitter } from "@/mitt";
const {emitter} = useEmitter();

let animal = ref("");

const handleAnimalChange = () => {
  if(animal.value == 'Lion'){
    emitter.emit('LionHomerange')
  } else {
    emitter.emit('EverythingElse')
  }
}
</script>
<style></style>
