Component({
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: '',
      observer(newVal) {
        this.setData({
          valuelength: newVal.length,
          value: newVal,
          tmpvalue: newVal,
        });
      }
    },
    maxlength: {
      type: Number,
      value: 140
    },
  },
  data: {
    value: '',
    tmpvalue: '',
    valuelength: 0,
    showTextarea: false
  },
  methods: {
    showTextareaView() {
      this.setData({
        showTextarea: true
      });
    },
    hideTextarea(e) {
      this.setData({
        value: this.data.tmpvalue,
        showTextarea: false
      });
      this.triggerEvent('blur', e);
    },
    handleInput(e) {
      let value = e.detail.value;
      this.setData({
        tmpvalue: value,
        valuelength: value.length
      });
      this.triggerEvent('input', e.detail);
    }
  }
});