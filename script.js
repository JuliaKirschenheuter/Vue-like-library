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
    computed: {
        filteredMeetups() {
            return this.meetups.filter(meetup => meetup.title.toLowerCase().indexOf(this.filter.search) !== -1);
        }
    }

});

