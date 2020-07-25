<template>
    <section class="dashboard">
        <Line :options="options" />
        <!-- <button @click="increase()">Increase height</button> -->
    </section>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import moment from 'moment'


export default {
    props: ['board'],
    name: "Dashboard",
    extends: Line,
    data() {
        return {
            ticketCount: [],
            dates: [],
            // chartdata: {
            //     labels: ['TO DO', 'IN PROGRESS', 'DONE'],
            //     datasets: [
            //         {
            //             label: 'Data One',
            //             backgroundColor: '#f87979',
            //             data: [18, 7, 43]
            //         }
            //     ]
            // },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

}
</script>