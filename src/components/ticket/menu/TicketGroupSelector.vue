<template>
    <div class="ticket-group-selector">
        <!-- <el-row class="block-col-5"> -->
        <!-- <el-col :span="12"> -->
        <dropdown @command="moveTicket">
            <span class="el-dropdown-link">
                {{currGroupSummary.title.toUpperCase()}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <dropdown-menu slot="dropdown" class="group-selector">
                <dropdown-item
                    v-for="group in boardGroupsSummary"
                    :key="group.id"
                    :command="group.id"
                >{{group.title.toUpperCase()}}</dropdown-item>
            </dropdown-menu>
        </dropdown>
        <!-- </el-col> -->
        <!-- </el-row> -->
    </div>
</template>

<script>
import Dropdown from 'element-ui/lib/dropdown'
import DropdownItem from 'element-ui/lib/dropdown-item'
import DropdownMenu from 'element-ui/lib/dropdown-menu'

export default {
    name: 'TicketGroupSelector',
    props: {
        boardGroupsSummary: {
            type: Array,
            require: true
        },
        currGroupSummary: {
            type: Object,
            require: true
        }
    },
    methods: {
        moveTicket(newGroupId) {
            this.$emit('moveTicket', newGroupId)
        }
    },
    components:{
        Dropdown,
        DropdownItem,
        DropdownMenu,
    }

}
</script>