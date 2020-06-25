import {MeetupsListItem} from "./MeetupsListItem.js";

const template = `
    <div class="meetups-list transition-list" >
        <transition-group name="transition-list">
            <meetups-list-item v-for="meetup in meetups" 
            :meetup="meetup"
            :href="\`/meetups/\${meetup.id}\`" 
            :key="meetup.id">
            </meetups-list-item>
        </transition-group>

    </div>
`;

export const MeetupsList = {
    template,

    components: {
        MeetupsListItem
    },

    props: {
        meetups: {
            type: Array,
            required: true
        }
    }
}
