<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div class="content-placer" id="app">
            <section class="calendar-div">
                <article class="calendar-window">
                    <div class="calendar-settings">
                        <select name="month" id="month-select" v-bind:value="month" v-on:change="newMonth">
                            <option v-for="(value, key) in months" v-bind:value="key">{{ value.name }}</option>
                        </select>
                        <input type="number" v-bind:value="year" v-on:change="newYear">
                    </div>
                    <div class="calendar">
                        <p class="day-name">M</p>
                        <p class="day-name">T</p>
                        <p class="day-name">W</p>
                        <p class="day-name">T</p>
                        <p class="day-name">F</p>
                        <p class="day-name">S</p>
                        <p class="day-name">S</p>
                        <day-component v-for="c_day in days" v-bind:day="c_day.day" v-bind:month="c_day.month" v-bind:year="c_day.year"  v-on:click="selectDay(c_day.day, c_day.month, c_day.year)"></day-component>
                    </div>
                </article>
            </section>
            <section class="events-div">
                <div class="events-window">
                    <button class="add-event" v-on:click="toggleAddingEventState">Додати подію</button>
                    <event-component v-for="(event, e_index) in dayEvents" v-on:delete-event="deleteEvent" v-bind:index="e_index" v-bind:name="event.name" v-bind:note="event.note"></event-component>
                </div>
            </section>
            <section class="create-event-bg" v-bind:class="addingEventClass" v-on:click.self="toggleAddingEventState">
                <form class="create-event-form" v-on:submit.prevent="addEvent">
                    <h2>Додати подію</h2>
                    <label for="event-name">Назва події</label>
                    <input type="text" id="event-name" required v-model="newEvent.name">
                    <label for="event-note">Опис події</label>
                    <textarea type="text" id="event-note" v-model="newEvent.note"></textarea>
                    <button type="submit" class="add-button" v-on:click.self="toggleAddingEventState">Додати</button>
                </form>
            </section>
        </div>
        <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
        <script type="module" src="app.js"></script>
    </body>
</html>