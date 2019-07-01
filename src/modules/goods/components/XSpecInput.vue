<template>
  <div class="x-spec-input">
    <span class="x-spec-input-title">{{ data.title }}</span>
    <label v-for="(item, index) in items" :key="index" class="x-spec-input-item"
           :class="{active:item.checked}"
    >
      <input :name="data.title"
             v-model="content"
             :type="data.type"
             :value="item.id"
             @change="change(item)"/>
      {{ item.label }}
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object,
      value: [Array, String, Number],
      checked: [Array, Number]
    },
    data() {
      return {
        content: [],
        items: []
      }
    },
    methods: {
      change(item) {
        if (this.data.type == 'checkbox') {
          this.$set(item, 'checked', !item.checked);
          this.$emit('input', this.content)
        }
        if (this.data.type == 'radio') {
          this.items.forEach((item) => {
            this.$set(item, 'checked', false)
          });
          this.$set(item, 'checked', true);
          this.$emit('input', this.content)
        }
      },
      initItems() {
        Object.keys(this.data.options).forEach((item, index) => {
          this.items.push({
            label: this.data.options[item],
            id: item,
            checked: item.checked || false
          })
        });
      }
    },
    created() {
      this.initItems()
    }
  }
</script>

<style lang="scss">
  .x-spec-input {
    padding: .75rem;

    .x-spec-input-title {
      display: block;
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }

    .x-spec-input-item {
      display: inline-block;
      height: 20px;
      list-style-type: none;
      line-height: 20px;
      margin: 5px 8px;
      border-radius: 5px;
      text-align: center;
      font-size: 15px;
      color: #000;
      padding: 2px 5px;
      background-color: #fff;
      border: solid 1px #000;

      input {
        display: none;
      }

      input:checked {
        color: rebeccapurple;
      }
    }

    .active {
      color: #fff;
      background-color: #000;
      border: solid 1px #000;
    }
  }
</style>
