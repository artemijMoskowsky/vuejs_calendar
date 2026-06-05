import DayComponent from "./components/DayComponent.js"
import EventComponent from "./components/EventComponent.js"

function generateDays(monthIndex, year) {
    let date = new Date(year, monthIndex, 1)
    let bias = date.getDay()
    if (bias === 0) {
        bias = 6
    } else {
        bias -= 1
    }
    let pastDaysCount = new Date(year, monthIndex, 0).getDate()
    let daysCount = new Date(year, monthIndex+1, 0).getDate()

    let days = []

    if (bias !== 0) {
        for (let day = pastDaysCount-(bias-1); day <= pastDaysCount; day++) {
            days.push({day: day, month: monthIndex !== 0 ? monthIndex : 12, year: new Date(year, monthIndex, 0).getFullYear()})
        }
    }
    for (let day = 1; day <= daysCount; day++) {
        days.push({day: day, month: monthIndex + 1, year: new Date(year, monthIndex+1, 0).getFullYear()})
    }
    if ((daysCount+bias)%7 !== 0) {
        for (let day = 1; day <= 7 - (daysCount+bias)%7; day++) {
            days.push({day: day, month: (monthIndex+2)%12 !== 0 ? (monthIndex+2)%12 : 12, year: new Date(year, monthIndex+2, 0).getFullYear()})
        }
    }
    return days
}

const App = {
    data() {
        return {
            months: {
                1: {
                    name: "Січень",
                },
                2: {
                    name: "Лютий",
                },
                3: {
                    name: "Березень",
                },
                4: {
                    name: "Квітень",
                },
                5: {
                    name: "Травень",
                },
                6: {
                    name: "Червень",
                },
                7: {
                    name: "Липень",
                },
                8: {
                    name: "Серпень",
                },
                9: {
                    name: "Вересень",
                },
                10: {
                    name: "Жовтень",
                },
                11: {
                    name: "Листопад",
                },
                12: {
                    name: "Грудень",
                }
            },
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            selectedDay: new Date().getDate(),
            selectedMonth: new Date().getMonth()+1,
            selectedYear: new Date().getFullYear(),
            addingEventState: false,
            newEvent: {
                name: '',
                note: ''
            },
            events: {}
        }
    },
    computed: {
        days() {
            return generateDays(this.month-1, this.year)
        },
        addingEventClass() {
            if (this.addingEventState) {
                return ''
            } else {
                return 'hidden'
            }
        },
        dayEvents() {
            let date = `${this.selectedDay}.${this.selectedMonth}.${this.selectedYear}`
            if (date in this.events) {
                return this.events[date]
            } else {
                return []
            }
        }
    },
    provide() {
        return {
            AppMonth: Vue.computed(() => Number(this.month)),
            AppSelectedDay: Vue.computed(() => Number(this.selectedDay)),
            AppSelectedMonth: Vue.computed(() => Number(this.selectedMonth)),
            AppSelectedYear: Vue.computed(() => Number(this.selectedYear)),
        }
    },
    methods: {
        newMonth(event) {
            this.month = event.target.value
        },
        newYear(event) {
            this.year = event.target.value
        },
        selectDay(day, month, year) {
            this.selectedYear = year
            this.selectedMonth = month
            this.selectedDay = day

            if (this.month !== month) {
                this.month = month
            }
            if (this.year !== year) {
                this.year = year
            }
        },
        toggleAddingEventState() {
            this.addingEventState = !this.addingEventState
        },
        getEvents() {
            const localStorageObject = {}
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                let value = localStorage.getItem(key)
                try {
                    value = JSON.parse(value)
                } catch (e) {

                }
                localStorageObject[key] = value
            }
            this.events = localStorageObject
        },
        addEvent() {
            let date = `${this.selectedDay}.${this.selectedMonth}.${this.selectedYear}`
            let events = localStorage.getItem(date)
            if (events) {
                events = JSON.parse(events)
            } else {
                events = []
            }
            events.push({
                name: this.newEvent.name,
                note: this.newEvent.note
            })
            localStorage.setItem(date, JSON.stringify(events))

            this.getEvents()

            this.newEvent.name = ''
            this.newEvent.note = ''
        },
        deleteEvent(index) {
            const key = `${this.selectedDay}.${this.selectedMonth}.${this.selectedYear}`
            let events = localStorage.getItem(key)
            if (events) {
                events = JSON.parse(events)
                if (events.length > index) {
                    events.splice(index, 1)
                    localStorage.setItem(key, JSON.stringify(events))
                }
            }
            this.getEvents()
        }
    },
    mounted() {
        this.getEvents()
    }
}

const app = Vue.createApp(App)

app.component('day-component', DayComponent)
app.component('event-component', EventComponent)

app.mount("#app")