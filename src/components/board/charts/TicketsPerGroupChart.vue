<script>
import { Bar } from 'vue-chartjs'
Chart.defaults.global.defaultFontColor = 'white';


export default {
    name:'TicketsPerGroupChart',
    extends: Bar,
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
    mounted() {
        const groupTitle = this.chartData.groupTitle
        const ticketCount = this.chartData.ticketCount

        this.renderChart({
            labels: groupTitle,
            datasets: [{
                label: this.label,
                data: ticketCount,
                backgroundColor:this.chartData.colors,
                borderColor:this.chartData.colors,
            }]
        }, this.options)
    }
}

</script>