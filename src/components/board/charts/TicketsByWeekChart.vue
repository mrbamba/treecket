<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
    name: 'TicketsByWeekChart',
    extends: Line,
    mixins: [reactiveProp],

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
    data() {
        return {
            gradient: null
        }
    },
    mounted() {
        this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)


        this.gradient.addColorStop(0, 'rgba(2, 198, 237, 0.9)')
        this.gradient.addColorStop(0.5, 'rgba(2, 198, 237, 0.5)');
        this.gradient.addColorStop(1, 'rgba(2, 198, 237, 0)');

        const weeks = this.chartData.weeks
        const ticketCount = this.chartData.ticketCount
        var gradientStroke = this.$refs.canvas.getContext('2d').createLinearGradient(0, 230, 0, 50);

        // gradientStroke.addColorStop(1, 'rgba(253,93,147,0.8)');
        // gradientStroke.addColorStop(0, 'rgba(253,93,147,0.8)'); //blue colors

        this.renderChart({
            labels: weeks,
            datasets: [{
                label: this.label,
                data: this.chartData.ticketCount,
                backgroundColor: this.gradient,
                borderColor: 'rgba(2, 198, 237,.5)',
                pointBackgroundColor: '#fff',
            }]
        }, this.options)
    }
}

</script>