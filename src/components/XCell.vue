<template>
  <div
    class="weui-cell"
    :class="{
      'vux-tap-active': isLink || !!link,
      'weui-cell_access': isLink || !!link,
      'vux-cell-no-border-intent': !borderIntent,
      'vux-cell-disabled': disabled
    }"
    @click="onClick">
    <div class="weui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="vux-cell-bd" :class="{'vux-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p>
        <label class="vux-label" :style="labelStyles" :class="labelClass" v-if="title || hasTitleSlot">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <span class="vux-label-desc">
                {{ inlineDesc }}
            </span>
    </div>
    <div class="weui-cell__ft" :class="valueClass">
      <slot name="value"></slot>
      <slot>{{ value }}</slot>
      <i class="weui-loading" v-if="isLoading"></i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
  import cleanStyle from '$utils/clean-style';
  import getParentProp from '$utils/get-parent-prop';

  export default {
    props: {
      title: [String, Number],
      value: [String, Number, Array],
      isLink: Boolean,
      isLoading: Boolean,
      inlineDesc: [String, Number],
      primary: {
        type: String,
        default: 'title'
      },
      link: [String, Object],
      valueAlign: [String, Boolean, Number],
      borderIntent: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      arrowDirection: String, // down or up
      alignItems: String
    },
    beforeMount() {
      this.hasTitleSlot = !!this.$slots.title
    },
    computed: {
      labelStyles() {
        return {
          width: getParentProp(this, 'labelWidth'),
          textAlign: getParentProp(this, 'labelAlign'),
          marginRight: getParentProp(this, 'labelMarginRight')
        }
      },
      valueClass() {
        return {
          'vux-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
          'vux-cell-align-left': this.valueAlign === 'left',
          'vux-cell-arrow-transition': !!this.arrowDirection,
          'vux-cell-arrow-up': this.arrowDirection === 'up',
          'vux-cell-arrow-down': this.arrowDirection === 'down'
        }
      },
      labelClass() {
        return {
          'vux-cell-justify': this.$parent && (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
        }
      },
      style() {
        if (this.alignItems) {
          return {
            alignItems: this.alignItems
          }
        }
        return {}
      }
    },
    methods: {
      onClick() {
        /* istanbul ignore next */
        !this.disabled && this.link != undefined && (window.location.href = this.link)
      }
    },
    data() {
      return {
        hasTitleSlot: true,
        hasMounted: false
      }
    }
  }
</script>

<style lang="less">
  .vux-label-desc {
    font-size: 14px;
    color: #666;
  }

  .vux-cell-primary {
    flex: 1;
  }

  .vux-label {
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 14px;
    font-weight: bold;
  }
  .weui-cell__ft{
    font-size: 14px;
  }
  .weui-cell__ft .weui-loading {
    display: inline-block;
  }

  .weui-cell__ft.vux-cell-align-left {
    text-align: left;
  }

  .weui-cell.vux-cell-no-border-intent:before {
    left: 0;
  }

  .weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after {
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
  }

  .weui-cell_access .weui-cell__ft.vux-cell-arrow-up:after {
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
  }

  .vux-cell-arrow-transition:after {
    transition: transform 300ms;
  }

  .vux-cell-disabled {
    .vux-label {
      color: #b2b2b2;
    }

    &.weui-cell_access .weui-cell__ft:after {
      border-color: #e2e2e2;
    }
  }
</style>
