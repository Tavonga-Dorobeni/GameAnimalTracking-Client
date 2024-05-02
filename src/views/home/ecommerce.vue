<template>
  <div>
    <!-- <Breadcrumb /> -->
    <!-- <div class="grid grid-cols-12 gap-5 mb-5">
      <div class="2xl:col-span-3 lg:col-span-4 col-span-12">
        <div
          class="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative"
          :style="{
            backgroundImage:
              'url(' + require(`@/assets/images/all-img/widget-bg-2.png`) + ')',
          }"
        >
          <div>
            <h4 class="text-xl font-medium text-white mb-2">
              <span class="block font-normal">Good day,</span>
              <span class="block">Mr. Tavonga Dorobeni</span>
            </h4>
            <p class="text-sm text-white font-normal">Welcome to GATS</p>
          </div>
        </div>
      </div>
      <div class="2xl:col-span-9 lg:col-span-8 col-span-12">
        <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div v-for="(item, i) in statistics" :key="i">
            <Card bodyClass="pt-4 pb-3 px-4">
              <div class="flex space-x-3">
                <div class="flex-none">
                  <div
                    class="h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl"
                    :class="`${item.bg} ${item.text}`"
                  >
                    <Icon :icon="item.icon" />
                  </div>
                </div>
                <div class="flex-1">
                  <div
                    class="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    class="text-slate-900 dark:text-white text-lg font-medium"
                  >
                    {{ item.count }}
                  </div>
                </div>
              </div>
              <div class="ml-auto max-w-[124px]">
                <apexchart
                  type="area"
                  height="41"
                  width="124"
                  :options="item.name.chartOptions"
                  :series="item.name.series"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div> -->
    <div class="grid grid-cols-12 gap-5">
      <div class="2xl:col-span-8 lg:col-span-7 col-span-12">
        <Card title="Game Park Geofences">
          <Map />

          <ul
            class="bg-slate-50 dark:bg-slate-900 rounded p-4 min-w-[184px] mt-8 flex justify-between flex-wrap items-center text-center"
          >
            <li
              v-for="(item, i) in mostSales2"
              :key="i"
              class="text-sm text-slate-600 dark:text-slate-300"
            >
              <span class="block space-x-2">
                <span
                  :class="item.cls"
                  class="inline-flex h-[6px] w-[6px] bg-primary-500 ring-opacity-25 rounded-full ring-4"
                ></span>
                <span>{{ item.title }}</span></span
              >
            </li>
          </ul>
        </Card>
      </div>
      <div class="2xl:col-span-4 lg:col-span-5 col-span-12">
        <Card title="Animal Distribution">
          <template #header>
            <DropEvent />
          </template>
          <apexchart
            type="bar"
            height="350"
            :options="
              this.$store.state.isDark
                ? radarChartDark.chartOptions
                : radarChart.chartOptions
            "
            :series="series[6]"
        /></Card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Customer from "./Analytics-Component/Customer";
import {
  areaLine,
  areaLineDark,
  basicArea,
  basicAreaDark,
  columnCharthome,
  columnCharthomeDark,
  columnCharthome2,
  donutChart,
  donutChartDark,
  radarChart,
  radarChartDark,
  shapeLine1,
  shapeLine2,
  shapeLine3,
  mostSales2,
} from "./Analytics-Component/data";
import DropEvent from "./Analytics-Component/DropEvent";
import Etable from "./Analytics-Component/Etable";
import Map from "../map/Maps/Marker-map.vue";
import Products from "./Analytics-Component/Products";
import SelectMonth from "./Analytics-Component/SelectMonth";
import Breadcrumb from "./Analytics-Component/Breadcrumbs";
export default {
  components: {
    Card,
    Etable,
    Map,
    Customer,
    Products,
    Icon,
    DropEvent,
    SelectMonth,
    Breadcrumb,
  },
  data() {
    return {
      count: 0,
      series: [
        [
          {
            name: "Count",
            data: [0, 0, 0, 0, 0, 1],
          }
        ],
        [
          {
            name: "Count",
            data: [0, 0, 0, 0, 0, 1],
          }
        ],
        [
          {
            name: "Count",
            data: [0, 0, 0, 0, 0, 1],
          }
        ],
        [
          {
            name: "Count",
            data: [0, 0, 0, 0, 1, 0],
          }
        ],
        [
          {
            name: "Count",
            data: [0, 0, 0, 1, 0, 0],
          }
        ],
        [
          {
            name: "Count",
            data: [0, 0, 0, 1, 0, 0],
          }
        ],
        [
          {
            name: "Count",
            data: [1, 0, 0, 0, 0, 0],
          }
        ],
      ],
      mostSales2,
      columnCharthome,
      columnCharthomeDark,
      columnCharthome2,
      fillterMap: "usa",
      areaLine,
      areaLineDark,
      basicArea,
      basicAreaDark,
      donutChart,
      donutChartDark,
      radarChart,
      radarChartDark,
      statistics: [
        {
          name: shapeLine1,
          title: "Totel revenue",
          count: "3,564",
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
          text: "text-info-500",
          icon: "heroicons:shopping-cart",
        },
        {
          name: shapeLine2,
          title: "Products sold",
          count: "564",
          bg: "bg-[#FFEDE6] dark:bg-slate-900	",
          text: "text-warning-500",
          icon: "heroicons:cube",
        },
        {
          name: shapeLine3,
          title: "Growth",
          count: "+5.0%",
          bg: "bg-[#EAE6FF] dark:bg-slate-900	",
          text: "text-[#5743BE]",
          icon: "heroicons:arrow-trending-up-solid",
        },
      ],
      activity: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 6,
        },
        {
          id: 6,
        },
      ],
    };
  },

  mounted(){
    this.$emitter.on('CronJob', () => {
      this.count++
    })
  }
};
</script>
<style></style>
