<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-6" v-for="(item, i) in animals" :key="i">
      <!-- header -->
      <header class="flex justify-between items-end">
        <div class="flex space-x-4 items-center">
          <div class="flex-none">
            <div
              class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize"
            >
              {{ item.Species.charAt(0) + item.Species.charAt(1) }}
            </div>
          </div>
          <div class="font-medium text-base leading-6">
            <div
              class="dark:text-slate-200 text-slate-900 max-w-[160px] truncate"
            >
              {{ item.Species }}
            </div>
          </div>
        </div>
        <div>
          <Dropdown classMenuItems=" w-[130px]">
            <span
              class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400"
              ><Icon icon="heroicons-outline:dots-vertical"
            /></span>
            <template v-slot:menus>
              <MenuItem v-for="(mneu, i) in actions" :key="i">
                <div
                  @click="mneu.doit(item)"
                  :class="`
                
                  ${'hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white'}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  capitalize `"
                >
                  <span class="text-base"><Icon :icon="mneu.icon" /></span>
                  <span>{{ mneu.name }}</span>
                </div>
              </MenuItem>
            </template>
          </Dropdown>
        </div>
      </header>
      <!-- description -->
      <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-3">
        <b>Name: </b> {{ item.Name }} <br/>
        <b>Age: </b> {{ item.Age }} <br/>
        <b>Condition: </b> {{ item.Condition }} <br/>
        <span
          v-if="item.Monitor"
          class="inline-block text-center space-x-1 bg-success-500 bg-opacity-[0.16] min-w-[110px] text-success-500 text-xs font-normal px-2 py-1 rounded-full my-3 mr-2"
        >
          Monitoring
        </span>
        <span
          v-else
          class="inline-block text-center space-x-1 bg-info-500 bg-opacity-[0.16] min-w-[110px] text-info-500 text-xs font-normal px-2 py-1 rounded-full my-3 mr-2"
        >
          Not monitoring
        </span>
      </div>
      <!--  date -->
      <div class="flex space-x-4">
        <!-- start date -->
        <div>
          <span class="block date-label">Date Created</span>
          <span class="block date-text">{{ item.createdAt.substring(0, 10) }}</span>
        </div>
        <!-- end date -->
        <div>
          <span class="block date-label">Date Updated</span>
          <span class="block date-text">{{ item.updatedAt.substring(0, 10) }}</span>
        </div>
      </div>
    </Card>
    <Modal
      title="Edit Animal"
      label=""
      labelClass="btn-small"
      ref="modal2"
      centered sizeClass="max-w-5xl"
    >
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <VueSelect v-if="!view" label="Species"
          ><vSelect :options="['Lion', 'Zebra', 'Impala', 'Eland', 'Wildebeest']" v-model="currentAnimal.Species"
        /></VueSelect>
        <Textinput
          v-else
          label="Species"
          type="text"
          v-model="currentAnimal.Species"
          placeholder="Enter Animal Species"
          name="species"
          isReadonly
        />
        <Textinput
          label="Name"
          type="text"
          v-model="currentAnimal.Name"
          placeholder="Enter Animal Name"
          name="name"
          :isReadonly="view"
        />
        <Textinput
          label="Age"
          type="number"
          v-model="currentAnimal.Age"
          placeholder="Enter Age"
          name="age"
          :isReadonly="view"
        />
        <Textinput
          label="Condition"
          type="text"
          v-model="currentAnimal.Condition"
          placeholder="Enter Condition"
          name="condition"
          :isReadonly="view"
        />
        <Checkbox v-model="currentAnimal.Monitor" :checked="currentAnimal.Monitor" :disabled="view" label="Monitor Animal?" />
      </div>

      <template v-if="!view" v-slot:footer>
        <Button
          text="Submit"
          btnClass="btn-dark "
          @click="updateAnimal()"
        />
      </template>
      <template v-else v-slot:footer>
        <Button
          text="Close"
          btnClass="btn-dark "
          @click="$refs.modal2.closeModal()"
        />
      </template>
    </Modal>
  </div>
</template>
<script setup>
import Card from '@/components/Card';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal/Modal';
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import VueSelect from "@/components/Select/VueSelect";
import Checkbox from "@/components/Checkbox";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { MenuItem } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const animals = computed(() => store.getters.allAnimals);

let view = ref(false);
let currentAnimal = ref({});
const modal2 = ref(null)

const totalDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffDays = endDate.getDate() - startDate.getDate();
  return diffDays;
};

const actions = ref([
  {
    name: 'view',
    icon: 'heroicons:eye',
    doit: (data) => {
      view.value = true;
      currentAnimal.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Edit',
    icon: 'heroicons-outline:pencil-alt',
    doit: (data) => {
      view.value = false;
      currentAnimal.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Delete',
    icon: 'heroicons-outline:trash',
    doit: (data) => {
      const toast = useToast();
      store.dispatch('deleteAnimal', data)
      .then(response => {
        toast.success(response.data.message, {
          timeout: 2000,
        });    
      },
      error => {
        toast.error((error.response && error.response.data) ||
            error.message ||
            error.toString(), {
          timeout: 2000,
        });   
      })
    },
  },
]);

const updateAnimal = () => {
  const toast = useToast();
  store.dispatch('updateAnimal', currentAnimal.value)
  .then(response => {
    modal2.value.closeModal();
    toast.success(response.data.message, {
      timeout: 2000,
    });    
  },
  error => {
    modal2.value.closeModal();
    toast.error((error.response && error.response.data) ||
        error.data.message ||
        error.toString(), {
      timeout: 2000,
    });   
  })
}
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>
