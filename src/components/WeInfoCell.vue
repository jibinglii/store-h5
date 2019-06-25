<template>
    <div class="weui-cell underline">
        <div class="weui-cell__bd">
            <p>{{title}}</p>
        </div>
        <div class="weui-cell__ft">{{desc}}</div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        desc: String
    }
}
</script>

<style lang="scss" scoped>
.underline{
    border-bottom:solid 1px #f2f2f2;
}
.weui-cell__bd{
  p{
    font-size: 15px;
  }
}
</style>
