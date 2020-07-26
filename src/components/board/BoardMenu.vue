<template>
        <transition name="slide-left">

    <div class="board-menu">
        <button @click="editBackground" class="board-menu-btn">Background</button>
        <button @click="deleteBoard" class="board-menu-delete">Delete Board</button>
        <board-history v-for="activity in activities" :key="activity.id" :activity="activity" :boardId="boardId"/>
    </div>
    </transition>
</template>

<script>
import BoardHistory from '@/components/board/BoardHistory.vue'
export default {
    name: 'BoardMenu',
    props:{
        activities:{
            type:Array,
            require:true
        },
        boardId:{
            type:String,
            require:true
        }
    },
    methods:{
        deleteBoard(boardId){
            this.$emit('deleteBoard');
        },
        editBackground(){
            this.$emit('editBackground');
        }
    },
    components:{
        BoardHistory
    }
}
</script>

<style>
</style>