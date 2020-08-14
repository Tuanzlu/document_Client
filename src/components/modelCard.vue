<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i">
      <a-card class="card">
        <img slot="cover" :src="item.src" alt="example" style="width:180px;height:150px;margin:10px auto -20px auto" />
        <span
          ><h3>{{ item.title }}</h3></span
        >
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.singleCard {
  display: block;
  float: left;
  margin: 25px;
}
.cardList {
  max-height: 500px;
  overflow: scroll;
  width: 800px;
  margin: 30px 60px 30px 60px;
}
.card {
  text-align: center;
  height: 200px;
  width: 200px;
}
</style>
