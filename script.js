import Vue from '/vendor/vue.esm.browser.js';
import meetups from '/data/meetups-data.js';

const app = new Vue({
    el: "#app",

    data: {
        meetups: meetups,
        filter: {
            search: '',
            date: '',
            view: ''
        }
    },

    methods: {
        // imageURL(meetup) {
        //     return meetup.imageId ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}` : undefined;
        // },
        // localDate(meetup) {
        //     return new Date(meetup.date).toLocaleString(navigator.language, {
        //         year: 'numeric',
        //         month: 'long',
        //         day: 'numeric',
        //     })
        // }
    },

    computed: {
        filteredMeetups() {
            return this.processedMeetups.filter(meetup => meetup.title.toLowerCase().indexOf(this.filter.search) !== -1);
        },

        processedMeetups() {
            return this.meetups.map((meetup) => ({
                ...meetup,
                cover: meetup.imageId ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}` : undefined,
                localeDate: new Date(meetup.date).toLocaleString(navigator.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            }) )
        }
    }

});

