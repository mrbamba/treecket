<template>
    <div class="board-menu">
        <button @click="toggleTypeMenu" class="board-menu-btn">Background</button>
        <Basic-modal>
            <section class="background-type-selector" v-if="show.typeMenu">
                <div  @click="openBackgroundSelector('images')">
                    <div class="images-navigator"></div>
                <span>Images</span>
                </div>
                <div>
                <div class="colors-navigator" @click="openBackgroundSelector('backgroundColors')">
                </div>
                <span>Colors</span>
                </div>
            </section>
            <div v-else-if="show.backgroundSelector">
                <Background-Palette :type="type" @setBackground="setBackground"/>
            </div>
        </Basic-Modal>
        <button @click="deleteBoard" class="board-menu-delete">Delete Board</button>
        <board-history
            v-for="activity in activities"
            :key="activity.id"
            :activity="activity"
            :boardId="boardId"
        />
    </div>
</template>

<script>
import BoardHistory from '@/components/board/BoardHistory.vue'
import BasicModal from '@/components/BasicModal.vue'
import BackgroundPalette from '@/components/BackgroundPalette.vue'
export default {
    name: 'BoardMenu',
    props: {
        activities: {
            type: Array,
            require: true
        },
        boardId: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            type: '',
            show: {
                backgroundSelector: false,
                typeMenu: false,
            }
        }
    },
    methods: {
        deleteBoard(boardId) {
            this.$emit('deleteBoard');
        },
        editBackground() {
            this.$emit('editBackground');
        },
        openBackgroundSelector(type){
            this.show.typeMenu = false;
            this.show.backgroundSelector = true;
            this.type = type;
        },
        toggleTypeMenu() {
            this.show.backgroundSelector = false;
            this.type = '';
            this.show.typeMenu = (this.show.typeMenu) ? false : true;
        },
        setBackground(background) {
            this.$emit('setBackground', background);
            // this.show.backgroundSelector = false;
            // this.type = '';
            // this.show.typeMenu = false;
        }
    },
    components:{
        BoardHistory,
        BasicModal,
        BackgroundPalette
    }
}
</script>

<style>
</style>