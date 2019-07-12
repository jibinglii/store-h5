<template>
  <div class="x-spec-input">
    <span class="x-spec-input-title">{{ title }}</span>
    <label v-for="(item, index) in items" :key="index" class="x-spec-input-item"
           :class="{active:item.checked}"
    >
      <input :name="title"
             v-model="content"
             :type="type"
             :value="item.value"
             @change="change(item)"/>
      {{ item.label }}
    </label>
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object,
      title: String,
      type: {
        type: String,
        default: 'radio'
      }
    },
    data() {
      return {
        content: [],
        items: []
      }
    },
    methods: {
      change(item) {
        if (this.type == 'checkbox') {
          this.$set(item, 'checked', !item.checked);
          this.$emit('input', this.content.join(','))
        }
        if (this.type == 'radio') {
          this.items.forEach((item) => {
            this.$set(item, 'checked', false)
          });
          this.$set(item, 'checked', true);
          this.$emit('input', this.content)
        }

      },
      initItems() {
        Object.keys(this.data).forEach((item) => {
          this.items.push({
            label: this.data[item],
            value: item,
            checked: false
          })
        });
      }
    },
    created() {
      this.initItems()
    },
    watch: {
      data() {
        this.initItems()
      }
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
    }

    .x-spec-input-item {
      width: 27%;
      height: 40px;
      list-style-type: none;
      line-height: 40px;
      margin: 5px 8px;
      margin-right: 0;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
      color: #000;
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

    .clear {
      clear: both;
    }
  }
</style>
