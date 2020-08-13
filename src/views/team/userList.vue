<template>
  <div>
    <a-button type="primary">
      邀请协作者
    </a-button>
    <a-table :pagination="false" :columns="columns" :data-source="data">
    <span slot="action">
    <a-dropdown>
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      变更权限 <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="javascript:;">变为管理者</a>
      </a-menu-item>
      <a-menu-item>
        <a href="javascript:;">变为协作者</a>
      </a-menu-item>
    </a-menu>
    </a-dropdown>
    <a-divider type="vertical" />
      <a>删除</a>
    </span>
  </a-table>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '姓名',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '身份',
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