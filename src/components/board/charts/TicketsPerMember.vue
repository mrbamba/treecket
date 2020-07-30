<template>
    <section class="tickets-per-member">
        <tickets-per-member-chart
            :options="options"
            label="Tickets per member"
            :chartData="chartData"
        />
    </section>
</template>

<script>
// import moment from 'moment'
import TicketsPerMemberChart from '@/components/board/charts/TicketsPerMemberChart.vue'
import cloneDeep from 'lodash/cloneDeep';



export default {
    name: "TicketsPerMember",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    // extends: Line,
    data() {
        return {
            chartData: {},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: "white",
                        fontSize: 16
                    }
                },
            }
        }
    },
    created() {
        this.calculateData()

    },
    methods: {
        calculateData() {
            let board = cloneDeep(this.board);
            //Create array on all board tickets
            let tickets = [];
            board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    tickets.push(ticket);
                });
            });

            let memberMap = {};
            tickets.forEach(ticket => {
                ticket.members.forEach(member => {
                    let memberId = member._id;
                    if (memberMap.hasOwnProperty(memberId)) {

                        memberMap[memberId].ticketCount++;
                    } else {
                        memberMap[memberId] = {
                            fullName: member.fullName,
                            imgSrc: member.imgSrc,
                            ticketCount: 1
                        }
                    }

                });
            });
            this.chartData.fullName = [];
            this.chartData.imgSrc = [];
            this.chartData.ticketCount = [];
            for (const member in memberMap) {

                this.chartData.fullName.push(memberMap[member].fullName);
                this.chartData.imgSrc.push(memberMap[member].imgSrc);
                this.chartData.ticketCount.push(memberMap[member].ticketCount);
            }
            let colorsArray = ['#355070', '#6D597A', '#B56576', '#E56B6F', '#EAAC8B', '#17bebb',
                '#9fa2b2', '#09bc8a', '#a0a4b8', '#034078', '#f4f9e9', '#776290', '#674D73', '#d9e5d6',
                '#baf2e9', '#674D73', '#c16e70', '#b4b8ab', '#04395e', '#c17c74', '#a7cced', '#82a0bc'];
            // let colorsArray=['#FF0000','#FF7F00','#FFD400','#FFFF00','#BFFF00','#6AFF00',
            // '#00EAFF','#0095FF','#0040FF','#AA00FF','#FF00AA','#EDB9B9','#E7E9B9','#B9EDE0',
            // '#B9D7ED','#DCB9ED','#8F2323','#8F6A23','#4F8F23','#23628F','#6B238F','#000000','#737373','#CCCCCC'];

            var colors = [];
            while (colors.length < this.chartData.ticketCount.length) {
                let colorIndex = Math.floor(Math.random() * Math.floor(colorsArray.length));
                colors.push(colorsArray[colorIndex]);
            }
            this.chartData.colors = colors;
        }
    },
    components: {
        TicketsPerMemberChart
    }
}
</script>