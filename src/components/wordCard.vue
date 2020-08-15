<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i" >
        <a-card hoverable class="card">
            <img slot="cover" src="../assets/word1.jpg" alt="example" style="width:90px;height:90px;margin:10px auto -20px auto" />
            <a-dropdown class="set">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a href="#" ><a-icon type="setting" /></a>
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a href="#">协作</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="#">分享</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="#">删除</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
            <span>
                <h3>{{ item.title}}</h3>
            </span>
        </a-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
};
</script>
<style lang="scss" scoped>
.singleCard {
  display: block;
  float: left;
  margin: 25px;
}
.cardList {
  height: 500px;
  width: 800px;
  margin: 30px 60px 30px 60px;
}
.card {
  text-align: center;
  height: 150px;
  width: 120px;
}
h3 {
    font-size: 15px;
}
.set {
    position:absolute;
    top:3px;
    right:3px;
    z-index:100;
}
</style>