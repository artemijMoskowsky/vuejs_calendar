export default {
    props: {
        day: 1,
        month: 1,
        year: 2026
    },
    inject: ['AppMonth', 'AppSelectedDay', 'AppSelectedMonth', 'AppSelectedYear'],
    computed: {
        classState() {
            if (this.month !== this.AppMonth) {
                return 'unrelated'
            }
            return 'related'
            
        },
        isSelected() {
            if (this.AppSelectedDay === this.day && this.AppSelectedMonth === this.month && this.AppSelectedYear === this.year) {
                return 'selected'
            }
            return ''
        }
    },
    template: `
        <button v-bind:class="[classState, isSelected]" class="day">{{ day }}</button>
    `
}