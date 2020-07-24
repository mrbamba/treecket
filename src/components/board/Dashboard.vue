<template>
    <section class="dashboard">
        <line-chart :styles="myStyles" />
        <button @click="increase()">Increase height</button>
    </section>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
export default {
    name: "Dashboard",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            height: 300
        }
    },
    created() {
        console.log(this.board);
    },
    methods: {
        increase() {
            this.height += 10
        },
    },
    computed: {
        myStyles() {
            return {
                height: `${this.height}px`,
                position: 'relative'
            }
        }
    }

}
</script>

<style>
</style>