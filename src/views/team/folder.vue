<template>
  <div style="float:right;width:70%">
      <h3>团队名</h3>
          <router-link to="/manage/userList">
          <a-icon type="team" /> 协作！（协作者列表）
          </router-link>
          <a-card title="文件夹" style="width:100%">
          <!--<a slot="extra" href="#">新建文档</a>-->
          <a-table :columns="columns" :data-source="data">
           <span slot="action">
             <router-link to="/document">打开</router-link>
             <a-divider type="vertical" />
             <a>删除</a>
             </span>
          </a-table>
        </a-card>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '文档名',
  },
  /*{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'tags',
    key: 'tags',
    dataIndex: 'tags',
  },*/
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