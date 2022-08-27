<template>
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
					<el-image v-if="scope.row.photo" :src="scope.row.photo" :preview-src-list="imgList" fit="cover"
						style="width: 180px" :preview-teleported="true" :hide-on-click-modal="true" />
				</template>
			</el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="id" prop="id" />
    <el-table-column label="医生团队" prop="name" />
  </el-table>
</template>
<script setup>
import { onMounted, ref, reactive, toRef, toRaw } from "vue";
import { groups, doctor, doctors } from "../../api/Experts.js";
const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = reactive([]);
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
onMounted(() => {
  async function group(a) {
    const value = await groups();
    value.records.forEach((item, index) => {
      // console.log(item);
      const refvalue = reactive({});
      refvalue.name = item.groupName;
      refvalue.id = item.id;

      tableData.push(refvalue);
    });
  }
  group();
});
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
