<template>
    <section class="dashboard">
        <bar :chartdata="chartdata" :options="options" />
        <!-- <button @click="increase()">Increase height</button> -->
    </section>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

export default {
    name: "Dashboard",
    extends: Bar,
    data() {
        return {
            chartdata: {
                labels: ['TO DO', 'IN PROGRESS', 'DONE'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [18, 7, 43]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    // props: {
    // board: {
    //     type: Object,
    //     require: true
    // },
    // chartdata: {
    //     type: Object,
    //     default: null
    // },
    // options: {
    //     type: Object,
    //     default: null
    // }
    // },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    },
    components: {
        Bar
    }
}
</script>