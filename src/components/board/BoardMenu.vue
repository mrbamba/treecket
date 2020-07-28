<template>
    <div class="board-menu">
        <header>
        <button class="close-button" @click="closeMenu">
            <img src="@/assets/icons/close-medium.png" alt="">
        </button>
        <h3>Menu</h3>
        </header>
        <div class="buttons-container">
            <div>
                <span class="background-icon" :style="{background: boardBackground}"></span>
                <button @click="toggleTypeMenu" class="board-menu-btn">Background</button>
            </div>
        <basic-modal>
            <transition name="slide-up-fade-right" mode="out-in">
            <section class="background-type-selector" v-if="show.typeMenu">
                <div @click="openBackgroundSelector('images')">
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
                <background-palette :type="type" @setBackground="setBackground"/>
            </div>
            </transition>
        </basic-modal>
        <div class="delete-button-container">
            <button @click="deleteBoard" class="board-menu-delete">Delete Board</button>
            <i class="far fa-trash-alt" />
        </div>
        </div>
        <div class="activity-header">
            <i class="fas fa-list-ul" />
            <h3>Activity</h3>
        </div>
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
        },
        boardBackground: {
            type: String
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
        },
        closeMenu() {
            this.$emit('closeBoardMenu')
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