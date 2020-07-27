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
                maintainAspectRatio: false
            }
        }
    },
    created() {
        this.calculateData()

    },
    methods: {
        calculateData() {
            let board = _.cloneDeep(this.board);
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
            this.chartData.fullName=[];
            this.chartData.imgSrc=[];
            this.chartData.ticketCount=[];
            for (const member in memberMap) {
                
                this.chartData.fullName.push(memberMap[member].fullName);
                this.chartData.imgSrc.push(memberMap[member].imgSrc);
                this.chartData.ticketCount.push(memberMap[member].ticketCount);
            }
            let colorsArray=['#FF0000','#FF7F00','#FFD400','#FFFF00','#BFFF00','#6AFF00',
            '#00EAFF','#0095FF','#0040FF','#AA00FF','#FF00AA','#EDB9B9','#E7E9B9','#B9EDE0',
            '#B9D7ED','#DCB9ED','#8F2323','#8F6A23','#4F8F23','#23628F','#6B238F','#000000','#737373','#CCCCCC'];

            var colors = [];
            while (colors.length < this.chartData.ticketCount.length) {
                let colorIndex = Math.floor(Math.random() * Math.floor(colorsArray.length));
                colors.push(colorsArray[colorIndex]);
            }
            this.chartData.colors=colors;
        }
    },
    components: {
        TicketsPerMemberChart
    }
}
</script>