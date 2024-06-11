<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6 text-left">
                <h5 class="card-category">Number of active alumini users by district</h5>
                <h2 class="card-title">Active users</h2>
              </div>
              <div class="col-sm-6"></div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="config.colors.primaryGradient"
              :gradient-stops="[1, 0.4, 0]"
              :extra-options="chartConfigs.purpleChartOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="config.colors.primaryGradient"
              :gradient-stops="[1, 0.2, 0]"
              :extra-options="chartConfigs.greenChartOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
            </h3>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <card type="tasks" style="height: auto">
          <template slot="header">
            <h6 class="title d-inline">Posts</h6>
          </template>
          <PostList></PostList>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import PostList from "./PostList.vue";
import config from "@/config";

import * as api from "../api/api";

function getRandomItems(arr, numItems) {
  let shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
}

export default {
  components: {
    LineChart,
    BarChart,
    PostList,
  },
  data() {
    return {
      config: config,
      chartConfigs: chartConfigs,
      chartDataUsers: [],
      bigLineChart: {
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
      },
      purpleLineChart: {
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },

      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {},
  methods: {
    async initDataBgDistrict() {
      const params = new URLSearchParams({
        district: true,
      });
      let queryResult = await api.get(`users/1/backgrounds?${params.toString()}`);
      console.log(queryResult);

      let districtsBruto = await api.get(`districts`);
      let districts = [];
      for (let district in districtsBruto) {
        districts.push(districtsBruto[district].district);
      }
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: queryResult,
          },
        ],
        labels: districts,
      };
      this.bigLineChart.chartData = chartData;
    },
    async initDataBgPosition() {
      const params = new URLSearchParams({
        positions: true,
      });
      let queryResult = await api.get(`users/1/backgrounds?${params.toString()}`);
      console.log(queryResult);

      let data = [];
      let labels = [];
      for (let result of queryResult) {
        data.push(result.count);
        labels.push(result.namePos);
      }
      let chartData = {
        datasets: [
          {
            label: "Data",
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: data,
          },
        ],
        labels: labels,
      };
      data.sort();

      chartConfigs.greenChartOptions.scales.yAxes[0].ticks.suggestedMin = data[0];
      data.reverse();
      chartConfigs.greenChartOptions.scales.yAxes[0].ticks.suggestedMax = data[0] + 5;

      this.purpleLineChart.chartData = chartData;
    },
  },
  mounted() {
    this.initDataBgDistrict();
    this.initDataBgPosition();
    this.i18n = this.$i18n;
  },
};
</script>
<style></style>
