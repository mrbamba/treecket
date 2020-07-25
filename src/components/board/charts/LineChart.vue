<script>
import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    props: {
        label: {
            type: String,
        },
        chartData: {
            type: Object,
        },
        options: {
            type: Object,
        }
    },
    created(){
        console.log(this.chartData);
    },
    mounted() {
        const weeks = this.chartData.weeks
        const ticketCount = this.chartData.ticketCount
        console.log(ticketCount)

        this.renderChart({
            labels: weeks,
            datasets: [{
                label: this.label,
                data: ticketCount
            }]
        }, this.options)
    }
}

</script>