export default {
    props: {
        index: '',
        name: '',
        note: ''
    },
    data() {
        return {
            noteHidden: true  
        }
    },
    emits: ['delete-event'],
    methods: {
        toggleNote() {
            this.noteHidden = !this.noteHidden
        },
        deleteEvent() {
            this.$emit('delete-event', this.index)
        }
    },
    template: `
        <div class="event-card">
            <div class="event-filling">
                <h3>{{ name }}</h3>
                <hr />
                <p :class="{ hidden: noteHidden }">{{ note }}</p>
                <hr :class="{ hidden: noteHidden }" />
                <button class="event-note-button" v-on:click="toggleNote">
                    <img :class="{ hidden: !noteHidden }" src="images/arrow-down.svg" alt="\\/" />
                    <img :class="{ hidden: noteHidden }" src="images/arrow-up.svg" alt="\\/" />
                </button>
            </div>
            <button class="delete-event" v-on:click="deleteEvent">x</button>
        </div>
    `
}