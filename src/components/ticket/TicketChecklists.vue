<template>
    <div>
        <section v-for="(checklist, checklistIdx) in ticket.checklists" :key="checklist.id">
            <form v-if="showChecklistTitleEdit">
                <input v-model="checklist.title" type="text" />
                <button @click="saveTitle">Save</button>
                <button @click="cancelUpdateTitle(checklist)">X</button>
            </form>
            <section v-else>
                <h4 @click="editTitle(checklist)">{{checklist.title}}:</h4>
                <button @click="deleteChecklist(checklistIdx)">Delete</button>
            </section>
                <div>
                    <h6>{{ checklist.items | progressBar }}</h6>
                </div>
            <ul>
                <li v-for="(item, itemIdx) in checklist.items" :key="item.id">
                    <div v-if="onEditItemId !== item.id">
                        <input @change.stop="updateTicket" type="checkbox" v-model="item.isDone" />
                        <span
                            :class="{done: item.isDone}"
                            @click="toggleEditItem(item)"
                        >{{ item.txt }}</span>
                        <button @click="deleteItem(checklist, itemIdx)">x</button>
                    </div>
                    <div v-else>
                        <textarea
                            ref="editItem"
                            @keyup.enter="saveUpdateChanges(item)"
                            @blur="onBlurEditItem($event, item)"
                            v-model="item.txt"
                            cols="30"
                            rows="3"
                        />
                        <button data-prevent-blur="save">Save</button>
                        <button>X</button>
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
                    />
                    <button data-prevent-blur="add">Add</button>
                    <button @click="toggleAddItem">X</button>
                </div>
                <button v-else @click="toggleAddItem(true, checklist.id)">Add an item</button>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    props: ['ticket'],
    data() {
        return {
            showNewItem: false,
            onEditChecklistId: null,
            onEditItemId: null,
            itemTxt: '',
            onEditItemTxt: '',
            showChecklistTitleEdit: false,
            onEditChecklistTitle: ''
        }
    },
    computed: {
        doneItemsPrec() {
            // console.log('items', checklist);
            // const precs = items.reduce((acc, item) => {
                //     if (item.isDone) acc++
            // }, 0)
            // console.log('precs', precs);
            return this.ticket.checklists.length
        }
    },
    methods: {
        updateTicket() {
            this.$emit('updateTicket', this.ticket);
        },
        editTitle(checklist) {
            this.onEditChecklistTitle = checklist.title;
            this.showChecklistTitleEdit = true;
        },
        saveTitle() {
            this.onEditChecklistTitle = '';
            this.showChecklistTitleEdit = false;
            this.updateTicket()
        },
        cancelUpdateTitle(checklist) {
            checklist.title = this.onEditChecklistTitle;
            this.onEditChecklistTitle = '';
            this.showChecklistTitleEdit = false;
        },
        toggleAddItem(inputShowingNextStatus, checklistId) {
            this.showNewItem = inputShowingNextStatus
            if (this.showNewItem) this.$nextTick(() => this.$refs.addItem[0].focus())
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
            this.$emit('addItem', { itemTxt: this.itemTxt, checklistId });
            this.itemTxt = '';
            this.toggleAddItem(false);
        },
        onBlurAddItem(ev, checklistId) {
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
            this.updateTicket();
            this.toggleEditItem(item);
        },
        deleteItem(checklist, itemIdx) {
            checklist.items.splice(itemIdx, 1)
            this.updateTicket()
        },
        deleteChecklist(checklistIdx) {
            this.ticket.checklists.splice(checklistIdx, 1)
            this.updateTicket()
        }
    }
}

// emitAddItem(ev, checklistId) {
//     this.$emit('addItem', { itemTxt: this.itemTxt, checklistId });
//     if (ev && ev.key === 'enter') {
//         this.itemTxt = '';
//     } else {
//         this.toggleAddItem();
//     }
// },
</script>

<style>
</style>