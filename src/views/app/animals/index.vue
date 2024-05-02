<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-4">
      <Breadcrumb />

      <div
        class="md:flex md:space-x-4 md:justify-end items-center"
        :class="width < 768 ? 'space-x-rb' : ''"
      >
        <Button
          icon="heroicons:list-bullet"
          text="List view"
          :btnClass="`${
            fillter === 'list'
              ? 'bg-slate-900 dark:bg-slate-700  text-white'
              : ' bg-white dark:bg-slate-800 dark:text-slate-300'
          }   h-min text-sm font-normal`"
          iconClass=" text-lg"
          @click="fillter = 'list'"
          :isLoading="isSkeletion2"
          :isDisabled="isSkeletion"
        />
        <Button
          icon="heroicons-outline:view-grid"
          text="Grid view"
          :btnClass="`${
            fillter === 'grid'
              ? 'bg-slate-900 dark:bg-slate-700 text-white'
              : ' bg-white dark:bg-slate-800 dark:text-slate-300'
          }   h-min text-sm font-normal`"
          iconClass=" text-lg"
          @click="fillter = 'grid'"
          :isLoading="isSkeletion"
          :isDisabled="isSkeletion2"
        />
        <Modal
          title="New Animal"
          label="➕ Add Animal"
          labelClass="btn-dark dark:bg-green-800  h-min text-sm font-normal"
          ref="modal2"
          centered sizeClass="max-w-5xl"
        >
          <form class="space-y-4">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <VueSelect label="Species"
                ><vSelect :options="['Lion', 'Zebra', 'Impala', 'Eland', 'Wildebeest']" v-model="animal.Species"
              /></VueSelect>
              <Textinput
                label="Name"
                type="text"
                v-model="animal.Name"
                placeholder="Enter Animal Name"
                name="name"
              />
              <Textinput
                label="Age"
                type="number"
                v-model="animal.Age"
                placeholder="Enter Age"
                name="age"
              />
              <Textinput
                label="Condition"
                type="text"
                v-model="animal.Condition"
                placeholder="Enter Condition"
                name="condition"
              />
              <Checkbox v-model="animal.Monitor" :checked="animal.Monitor" label="Monitor Animal?" />
            </div>
          </form>
          <template v-slot:footer>
            <Button
              text="Submit"
              btnClass="btn-dark "
              @click="handleNew(animal); $refs.modal2.closeModal()"
            />
          </template>
        </Modal>
      </div>
    </div>
    <GridSkletion :count="animals.length" v-if="isSkeletion" />
    <TableSkeltion :count="animals.length" v-if="isSkeletion2" />
    <Grid v-if="fillter === 'grid' && !isSkeletion" />
    <List v-if="fillter === 'list' && !isSkeletion2" />

    <AnimalAddmodal />
    <updateModal />
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import GridSkletion from "@/components/Skeleton/Project-grid";
import TableSkeltion from "@/components/Skeleton/Table";
import Modal from '@/components/Modal/Modal';
import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import Checkbox from "@/components/Checkbox";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { computed, ref, watch, onMounted, defineEmits } from "vue";
import AnimalAddmodal from "./AddAnimal";
import updateModal from "./EditAnimal";
import List from "./Animals-list";
import Grid from "./Animals-grid";
import { useStore } from "vuex";
import { useEmitter } from "@/mitt";

const {emitter} = useEmitter();
const store = useStore();

let fillter = ref("grid");
const openAnimal = () => {
  store.dispatch("openAnimal");
};

let animal = {};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};

const handleEmit = () => {
  fillter.value = "list";
  setTimeout(() => {
    emitter.emit('search')
  }, 500);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  emitter.on('notification', () => {
    handleEmit();
  })
});

const animals = computed(() => store.getters.allAnimals);

const isSkeletion = ref(true);
const isSkeletion2 = ref(null);
setTimeout(() => {
  isSkeletion.value = false;
  isSkeletion2.value = false;
}, 1000);

const toast = useToast();
const handleNew = (new_animal) => {
  store.dispatch("createAnimal", new_animal)
  .then(data =>{
    // use vue-toast-notification app use
    toast.success(data.data.message, {
        timeout: 2000,
      });          
  },
  error => {
    toast.error((error.response && error.response.data) ||
          error.data.message ||
          error.toString(), {
        timeout: 2000,
      });   
  })
}

// watch fillter with switch case
watch(fillter, () => {
  switch (fillter.value) {
    case "grid":
      fillter.value = "grid";
      isSkeletion.value = true;
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);

      break;
    case "list":
      fillter.value = "list";
      isSkeletion2.value = true;
      setTimeout(() => {
        isSkeletion2.value = false;
      }, 1000);
      break;
    default:
      fillter.value = "grid";
      break;
  }
});
</script>
<style lang=""></style>
