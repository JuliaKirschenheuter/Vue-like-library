import meetups from "./data/meetups-data.js";
import {MeetupsList} from "./MeetupsList.js";

const template = `
    <div class="container">
        <div class="filters-panel">
            <div class="filters-panel__col">
                <div class="form-check">
                    <div class="form-check__group">
                        <input
                                class="form-check__input"
                                type="radio"
                                name="date"
                                v-model="filter.date"
                                value="all"
                        />
                        <label class="form-check__label">Все</label>
                    </div>
                    <div class="form-check__group">
                        <input
                                class="form-check__input"
                                type="radio"
                                name="date"
                                v-model="filter.date"
                                value="past"
                        />
                        <label class="form-check__label">Прошедшие</label>
                    </div>
                    <div class="form-check__group">
                        <input
                                class="form-check__input"
                                type="radio"
                                name="date"
                                v-model="filter.date"
                                value="future"
                        />
                        <label class="form-check__label">Ожидаемые</label>
                    </div>
                </div>
            </div>

            <div class="filters-panel__col">
                <div class="form-group form-group_inline">
                    <div class="input-group input-group_icon input-group_icon-left">
                        <img class="icon" alt="icon" src="/assets/icons/icon-search.svg"/>
                        <input
                                id="filters-panel__search"
                                class="form-control form-control_rounded form-control_sm"
                                type="text"
                                placeholder="Поиск"
                                v-model="filter.search"
                        />
                    </div>
                </div>
                <div class="form-group form-group_inline">
          <span>
            <div class="page-tabs">
              <button type="button"
                      class="page-tabs__tab"
                      :class="{ 'page-tabs__tab_active': filter.view === '' || filter.view === 'list'  }"
                      @click="filter.view = 'list' "
              >
                <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="m5 7c-.55228 0-1 .44772-1 1s.44772 1 1 1h.01c.55228 0 1-.44772 1-1s-.44772-1-1-1zm5 0c-.55228 0-1 .44772-1 1s.44772 1 1 1h13c.5523 0 1-.44772 1-1s-.4477-1-1-1zm0 6c-.55228 0-1 .4477-1 1s.44772 1 1 1h13c.5523 0 1-.4477 1-1s-.4477-1-1-1zm-1 7c0-.5523.44772-1 1-1h13c.5523 0 1 .4477 1 1s-.4477 1-1 1h-13c-.55228 0-1-.4477-1-1zm-5-6c0-.5523.44772-1 1-1h.01c.55228 0 1 .4477 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.4477-1-1zm1 5c-.55228 0-1 .4477-1 1s.44772 1 1 1h.01c.55228 0 1-.4477 1-1s-.44772-1-1-1z"
                        fill-rule="evenodd"></path>
                </svg>
              </button>
              <button type="button" class="page-tabs__tab"
                      @click="filter.view = 'calendar' "
                      :class="{ 'page-tabs__tab_active': filter.view === 'calendar'  }"
              >
                <svg height="22" viewBox="0 0 20 22" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="m15 1c0-.552285-.4477-1-1-1s-1 .447715-1 1v1h-6v-1c0-.552285-.44772-1-1-1s-1 .447715-1 1v1h-2c-1.65685 0-3 1.34315-3 3v14c0 1.6569 1.34315 3 3 3h14c1.6569 0 3-1.3431 3-3v-14c0-1.65685-1.3431-3-3-3h-2zm3 7v-3c0-.55228-.4477-1-1-1h-2v1c0 .55228-.4477 1-1 1s-1-.44772-1-1v-1h-6v1c0 .55228-.44772 1-1 1s-1-.44772-1-1v-1h-2c-.55228 0-1 .44772-1 1v3zm-16 2h16v9c0 .5523-.4477 1-1 1h-14c-.55228 0-1-.4477-1-1z"
                        fill-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </span>
                </div>
            </div>
        </div>

        <template v-if="filteredMeetups && filteredMeetups.length">
            <transition name="fade" mode="out-in">
                <meetups-list key="list" v-if="filter.view === '' || filter.view === 'list' "
                :meetups="filteredMeetups"></meetups-list>
                <div v-else-if="filter.view === 'calendar' " :key="calendar">Календарь</div>
            </transition>

        </template>

        <div v-else class="meetup__empty">Митапов по заданным условям не найдено...</div>
    </div>
`;

export const MeetupsPage = {
    template,
    components: {
        MeetupsList
    },

    data() {
        return {
            meetups: [],
            isLoadingMeetups: false,
            filter: {
                search: '',
                date: '',
                view: '',
                participation: ''
            }
        }
    },

    created() {

    },

    async mounted() {
        this.meetups = await this.fetchMeetups();
    },

    methods: {
        async fetchMeetups() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(meetups);
                }, 100);
            });
        },
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
            }))
        }
    }
}
