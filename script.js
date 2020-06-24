import Vue from '/vendor/vue.esm.browser.js';
import meetups from '/data/meetups-data.js';

const app = new Vue({
    el: "#app",

    data: {
        meetups: meetups,
        filter: {
            search: '',
            date: '',
            view: '',
            participation: ''
        }
    },

    methods: {

    },

    computed: {
        filteredMeetups() {
            let filteredMeetups = this.processedMeetups;

            if (this.filter.date === 'past') {
                filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) <= new Date());
            } else if (this.filter.date === 'future') {
                filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) > new Date());
            }

            if (this.filter.participation === 'organizing') {
                filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
            } else if (this.filter.participation === 'attending') {
                filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
            }

            if (this.filter.search) {
                const concatMeetupText = (meetup) =>
                    [meetup.title, meetup.description, meetup.place, meetup.organizer].join(' ').toLowerCase();
                filteredMeetups = filteredMeetups.filter((meetup) =>
                    concatMeetupText(meetup).includes(this.filter.search.toLowerCase()),
                );
            }

            return filteredMeetups;
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

