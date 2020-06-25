const template = `
    <div class="form-check">
      <div v-for="option in options" :key="option.value" class="form-check__group">
        <input
          class="form-check__input"
                        type="radio"
                        :name="radioGroupName"
                        :checked="selected === option.value "
                        @input="change(option.value)"
                        value=""
        />
          <label class="form-check__label">{{ option.text }}</label>
        </div>
    </div>
`;

export const FormCheck = {
    template,

    props: {
        selected: {
            type: String
        },
        options: {
            type: Array,
            required: true
        }
    },

    model: {
        prop:  'selected',
        event: 'change'
    },

    data() {
        return {
            radioGroupName: Math.random(),
        }
    },

    methods: {
        change(value) {
            this.$emit('change', value);
        }
    }
}
