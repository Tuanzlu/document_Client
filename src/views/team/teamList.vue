<template>
  <a-table :pagination="false" :columns="columns" :data-source="data">
    <span slot="action">
      <router-link to="/manage/folder">打开团队</router-link>
      <a-divider type="vertical" />
      <a>解散团队</a>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '团队名',
  },
  /*{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },*/
  {
    title: '团队介绍',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    id: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    id: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    id: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>


<style>

</style>