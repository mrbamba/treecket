<template>
<div>
    <el-row class="block-col-2">
  <el-col :span="12">
    <span class="demonstration">Move ticket</span>
    <el-dropdown @command="moveTicket">
      <span class="el-dropdown-link">
        {{currGroupSummary.title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item v-for="group in boardGroupsSummary" :key="group.id" :command="group.id">{{group.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
  </el-row>
</div>
</template>

<script>
export default {
    name:'TicketGroupSelector',
    props:{
        boardGroupsSummary: {
            type: Array,
            require: true
        },
        currGroupSummary:{
            type:Object,
            require:true
        }
    },
    methods:{
        moveTicket(newGroupId){
            console.log('running move ticket on group selector')
            this.$emit('moveTicket',newGroupId)
        }
    }

}
</script>

<style>
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>