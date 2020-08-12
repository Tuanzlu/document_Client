<template>
  <div>
    <beforNav></beforNav>
    <p>这是点击之后的首页（待修改）</p>
  </div>
</template>

<script>

import beforNav from '@/components/beforLoginNav';
export default {
    components: {
        beforNav
    },
    data() {
        return {};
    },
    methods: {
        //this.$router.push('/personIndex');
    },
}
</script>
<style lang="scss" scoped></style>
