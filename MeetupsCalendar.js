const template = `
    <div>Календарь</div>
`;

export const MeetupsCalendar= {
    template,

    props: {
        meetups: {
            type: Array,
            required: true
        }
    }
}
