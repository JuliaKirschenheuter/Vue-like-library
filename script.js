import Vue from '/vendor/vue.esm.browser.js';
import meetups from '/data/meetups-data.js';

const app = new Vue({
    el: "#app",

    data: {
        meetups: meetups
    },

});
