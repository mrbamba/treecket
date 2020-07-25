<template>
    <div class="checklist">
        <form @submit.prevent="saveTitle" v-if="showChecklistTitleEdit">
            <input
                v-model="checklist.title"
                ref="checklistTitle"
                type="text"
                @blur="cancelUpdateTitle($event, checklist)"
                @keydown.tab="saveTitle"
            />
            <button class="save-button" type="submit" data-prevent-blur="saveTitle">Save</button>
            <button class="cancel-button" type="button">X</button>
        </form>
        <section v-else class="check-list-title-preview">
            <h4 @click="editTitle(checklist)">{{checklist.title}}:</h4>
            <button @click="deleteChecklist" class="delete-button">Delete</button>
        </section>
        <div class="progress-bar-container">
            <h6>{{ checklist.items | progressBar }}</h6>
            <div class="progress-bar">
                <div
                    class="prec-done"
                    :class="{complete: doneItemsPrec === '100%'}"
                    :style="{width: doneItemsPrec}"
                ></div>
            </div>
        </div>
        <ul class="clean-list">
            <li v-for="(item, itemIdx) in checklist.items" :key="item.id">
                <div v-if="onEditItemId !== item.id" class="checklist-item">
                    <div>
                        <input @change.stop="updateChecklist" type="checkbox" v-model="item.isDone" />
                        <span
                            :class="{done: item.isDone}"
                            @click="toggleEditItem(item)"
                        >{{ item.txt }}</span>
                    </div>
                    <button @click="deleteItem(itemIdx)" class="underline-button">Delete</button>
                </div>
                <div v-else>
                    <!-- @keyup.enter="saveUpdateChanges(item)" -->
                    <textarea
                        ref="editItem"
                        @blur="onBlurEditItem($event, item)"
                        v-model="item.txt"
                        cols="30"
                        rows="3"
                    />
                    <button data-prevent-blur="save" class="save-button">Save</button>
                    <button class="cancel-button">Cancel</button>
                </div>
            </li>
            <div v-if="showNewItem && checklist.id === onEditChecklistId">
                <input
                    ref="addItem"
                    @keyup.enter="onAddItem($event, checklist.id)"
                    @blur="onBlurAddItem($event, checklist.id)"
                    v-model="itemTxt"
                    type="text"
                    placeholder="Add an item"
                    class="minimal-input"
                />
                <button data-prevent-blur="add" class="save-button">Save</button>
                <button @click="toggleAddItem" class="cancel-button">Cancel</button>
            </div>
            <button
                v-else
                @click="toggleAddItem(true, checklist.id)"
                class="add-button add-an-item"
            >Add an item</button>
        </ul>
    </div>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js';
export default {
    props: ['checklist', 'checklistIdx'],
    data() {
        return {
            showNewItem: false,
            onEditChecklistId: null,
            onEditItemId: null,
            itemTxt: '',
            onEditItemTxt: '',
            showChecklistTitleEdit: false,
            onEditChecklistTitle: '',
            allowConfetti: true
        }
    },
    created() {
        eventBus.$on('checklistAdded', (checklist) => {
            console.log(checklist.id);
            this.editTitle(checklist)
        })
    },
    computed: {
        doneItemsPrec() {
            const doneItemsCount = this.checklist.items.reduce((acc, item) => {
                return (item.isDone) ? ++acc : acc
            }, 0);
            return (doneItemsCount) ? ((doneItemsCount / this.checklist.items.length) * 100).toFixed(0) + '%' : '0%'
        }
    },
    methods: {
        updateChecklist() {
            this.$emit('updateChecklist', this.checklist);
            if (this.checklist.items.length > 0 && this.checklist.items.every(item => item.isDone)) {
                this.confetti();
            }
        },
        deleteChecklist() {
            this.$emit('deleteChecklist', this.checklistIdx, this.checklist.id);
        },
        editTitle(checklist) {
            this.onEditChecklistTitle = checklist.title;
            this.showChecklistTitleEdit = true;
            this.$nextTick(() => this.$refs.checklistTitle.focus())
        },
        saveTitle() {
            if (!this.checklist.title) {
                this.$nextTick(() => this.$refs.checklistTitle.focus())
                return;
            }
            this.onEditChecklistTitle = '';
            this.showChecklistTitleEdit = false;
            this.updateChecklist()
        },
        cancelUpdateTitle(ev, checklist) {
            if (!ev.relatedTarget ||
                ev.relatedTarget && ev.relatedTarget.dataset.preventBlur === "saveTitle") return
            console.log('cancel');
            checklist.title = this.onEditChecklistTitle;
            this.onEditChecklistTitle = '';
            this.showChecklistTitleEdit = false;
        },
        toggleAddItem(inputShowingNextStatus, checklistId) {
            this.showNewItem = inputShowingNextStatus
            if (this.showNewItem) this.$nextTick(() => this.$refs.addItem.focus())
            this.itemTxt = '';
            this.onEditChecklistId = (this.showNewItem) ? checklistId : null;
        },
        toggleEditItem(item) {
            if (this.onEditItemId) {
                this.onEditItemId = null;
                this.onEditItemTxt = '';
            } else {
                this.showNewItem = false;
                this.onEditItemId = item.id;
                this.$nextTick(() => this.$refs.editItem[0].focus());
                this.onEditItemTxt = item.txt;
            }
        },
        onAddItem(ev, checklistId) {
            if (!this.itemTxt) return;
            this.$emit('addItem', { itemTxt: this.itemTxt, checklistId });
            this.itemTxt = '';
            this.toggleAddItem(false);
        },
        onBlurAddItem(ev, checklistId) {
            console.log('blur');
            if (ev.relatedTarget && ev.relatedTarget.dataset.preventBlur === "add") {
                this.onAddItem(ev, checklistId);
            } else {
                this.toggleAddItem(false);
            }
        },
        onBlurEditItem(ev, item) {
            if (ev.relatedTarget && ev.relatedTarget.dataset.preventBlur === "save") {
                this.saveUpdateChanges(item);
            } else {
                item.txt = this.onEditItemTxt;
                this.toggleEditItem(item);
            }
        },
        saveUpdateChanges(item) {
            this.updateChecklist();
            this.toggleEditItem(item);
        },
        deleteItem(itemIdx) {
            this.checklist.items.splice(itemIdx, 1);
            this.updateChecklist();
        },
        confetti() {
            // this.$refs.confetti.style.display = 'block';
            console.log(this.$confetti)
            if (!this.allowConfetti) return;
            this.allowConfetti = false;
            this.$confetti.start({
                particles: [
                    {
                        type: 'image',
                        url: 'https://res.cloudinary.com/dfhfhz5le/image/upload/v1595372019/treecket_hmoifu.png',
                        size: 20
                    },
                    {
                        type: 'rect',
                    },
                ],
                defaultDropRate: 16,
                // canvasId: 'confetti'
            });
            this.lastConfetti = Date.now();
            setTimeout(() => {
                this.$confetti.stop();
            }, 3500);
        }
    }
}
</script>

<style>
</style>