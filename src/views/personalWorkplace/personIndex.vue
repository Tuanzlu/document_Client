<template>
  <div>
    <personNav></personNav>
    <siderNav></siderNav>
    <div class="used">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import personNav from "@/components/personNav";
import siderNav from "@/components/siderNav";
export default {
  components: {
    personNav,
    siderNav,
  },
  data() {},
  methods: {},
};
</script>

<style>
.used{
  width: 800px;
  margin-top: 30px;
  
  margin-left:250px;
}
</style>
