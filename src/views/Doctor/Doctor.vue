<template>
  <div>
    <el-table
      :data="tableData"
      :border="parentBorder"
      style="width: 100%"
      row-key="id"
      @expand-change="expand"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <el-table :data="props.row.family">
              <el-table-column label="id" prop="id" />
              <el-table-column label="科室" prop="department" />
              <el-table-column label="上班时间" prop="onlineTime" />
              <el-table-column label="职位" prop="position" />
              <el-table-column label="医院" prop="unit" />
              <el-table-column prop="photo" label="图片">
                <template v-slot="scope">
                  <el-image
                    v-if="scope.row.photo"
                    :src="scope.row.photo"
                    :preview-src-list="imgList"
                    fit="cover"
                    style="width: 180px"
                    :preview-teleported="true"
                    :hide-on-click-modal="true"
                  />
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template #default="scope">
                  <router-link :to="'/doct/' + scope.row.groupId">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)"
                      >新增</el-button
                    >
                  </router-link>

                  <router-link :to="'/doctors/' + scope.row.id"
                    ><el-button
                      size="small"
                      @click="handleModify(scope.$index, scope.row)"
                      >修改</el-button
                    ></router-link
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id" />
      <el-table-column label="医生团队" prop="name" />
    </el-table>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive, toRef, toRaw } from "vue";
import { groups, doctor, doctors, delecydoctor } from "../../api/Experts.js";

import { useRouter } from "vue-router";
const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = reactive([]);
const router = useRouter();
const imgList = ref([]);
let expands = ref([]);
async function expand(i) {
  let a = await doctors(toRaw(i.id));
  let todo = tableData.filter((item, index) => {
    return item.id == a.data[0].groupId;
  });
  expands.value = i.id;
  todo[0].family = a.data;
  // console.log(todo);a
  //console.log(tableData);
  a.data.forEach((item) => {
    imgList.value.push(item.photo);
  });
}
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleModify = async (index, row) => {
  console.log(row);
  console.log(row.id);
};
async function group() {
  const value = await groups();
  value.records.forEach((item, index) => {
    console.log(item);
    const refvalue = reactive({});
    refvalue.name = item.groupName;
    refvalue.id = item.id;
    tableData.push(refvalue);
  });
}
onMounted(() => {
  group();
});
//点击删除
const handleDelete = async (index, row) => {
  await delecydoctor(String(row.id));
  // await group();
  location.reload();
};
// 递归将扁平化数组转成树形数组
// function nest(groupId, arr) {
//   return arr
//     .filter((item) => item.groupId == groupId)
//     .map((item) => ({ ...item, children: nest(item.id, arr) }));
// }
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
