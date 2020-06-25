const template = `
    <div class="form-check">
        <div class="form-check__group">
            <input
                    class="form-check__input"
                    type="radio"
                    name="date"
                    :checked="selected === '' "
                    @input="change('')"
                    value="all"
            />
            <label class="form-check__label">Все</label>
        </div>
        <div class="form-check__group">
            <input
                    class="form-check__input"
                    type="radio"
                    name="date"
                    :checked="selected === 'past' "
                    @input="change('past')"
                    value="past"
            />
            <label class="form-check__label">Прошедшие</label>
        </div>
        <div class="form-check__group">
            <input
                    class="form-check__input"
                    type="radio"
                    name="date"
                    :checked="selected === 'future' "
                    @input="change('future')"
                    value="future"
            />
            <label class="form-check__label">Ожидаемые</label>
        </div>
    </div>
`;

export const FormCheck = {
    template,

    props: {
        selected: {
            type: String
        }
    },

    methods: {
        change(value) {
            this.$emit('change', value);
        }
    }
}
