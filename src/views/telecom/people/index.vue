<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="企业名称" prop="enterpriseId">
        <el-select v-model="queryParams.enterpriseId" placeholder="请选择企业名称" style="width: 100%" clearable>
          <el-option v-for="item in enterpriseOptions"
                     :key="item.value"
                     :label="item.text"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请输入性别">
          <el-option
            v-for="item in Constant.SexType"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="queryParams.nation" placeholder="请输入民族"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['telecom:people:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['telecom:people:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['telecom:people:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-bottom"
          size="mini"
          @click="importData"
          v-hasPermi="['telecom:people:importData']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-top"
          size="mini"
          @click="exportData"
          v-hasPermi="['telecom:people:exportData']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="企业名称" align="center" show-overflow-tooltip prop="enterpriseName"/>
      <el-table-column label="人员名称" align="center" show-overflow-tooltip prop="name"/>
      <el-table-column label="性别" align="center" show-overflow-tooltip prop="sex">
        <template slot-scope="scope">
          <span>{{Constant.format(Constant.SexType, scope.row.sex)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="民族" align="center" show-overflow-tooltip prop="nation"/>
      <el-table-column label="籍贯（省）" align="center" show-overflow-tooltip prop="province"/>
      <el-table-column label="籍贯（地市）" align="center" show-overflow-tooltip prop="city"/>
      <el-table-column label="身份证号码" align="center" show-overflow-tooltip prop="idCard"/>
      <el-table-column label="毕业院校" align="center" show-overflow-tooltip prop="gradutionSchool"/>
      <el-table-column label="毕业时间" align="center" show-overflow-tooltip prop="gradutionTime"/>
      <el-table-column label="学历" align="center" show-overflow-tooltip prop="education"/>
      <el-table-column label="学位" align="center" show-overflow-tooltip prop="academicDegree"/>
      <el-table-column label="所学专业" align="center" show-overflow-tooltip prop="major"/>
      <el-table-column label="职务" align="center" show-overflow-tooltip prop="post"/>
      <el-table-column label="专业技术职称" align="center" show-overflow-tooltip prop="professionalTechnicalTitles"/>
      <el-table-column label="政治面貌" align="center" show-overflow-tooltip prop="politicalOutlook"/>
      <el-table-column label="获得的荣誉" align="center" show-overflow-tooltip prop="honer"/>
      <el-table-column label="退伍军人" align="center" show-overflow-tooltip prop="veteran"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['telecom:people:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['telecom:people:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-card shadow="hover">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder=""/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" clearable placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in Constant.SexType"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="民族" prop="nation">
                <el-input v-model="form.nation" placeholder="请输入民族"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省份" prop="province">
                <el-input v-model="form.province" placeholder="请输入省份"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="城市" prop="city">
                <el-input v-model="form.city" placeholder="请输入城市"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码" prop="idCard">
                <el-input v-model="form.idCard" placeholder="请输入身份证号码"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="毕业院校" prop="gradutionSchool">
                <el-input v-model="form.gradutionSchool" placeholder="请输入毕业院校"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业时间" prop="gradutionTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.gradutionTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历" prop="education">
                <el-input v-model="form.education" placeholder="请输入学历"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学位" prop="academicDegree">
                <el-input v-model="form.academicDegree" placeholder="请输入学位"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所学专业" prop="major">
                <el-input v-model="form.major" placeholder="请输入所学专业"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="技术职称" prop="professionalTechnicalTitles">
                <el-input v-model="form.professionalTechnicalTitles" placeholder="请输入专业技术职称"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="政治面貌" prop="politicalOutlook">
                <el-input v-model="form.politicalOutlook" placeholder="请输入政治面貌"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="获得的荣誉" prop="honer">
                <el-input v-model="form.honer" placeholder="请输入获得的荣誉"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="退伍军人" prop="veteran">
                <el-input v-model="form.veteran" placeholder="请输入是否退伍军人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职务" prop="post">
                <el-input v-model="form.post" placeholder="请输入职务"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="importTitle" :visible.sync="importOpen" width="400px" append-to-body>
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="" prop="enterprise">
              <el-select v-model="upload.data.enterpriseId" placeholder="请选择导入企业" style="width: 100%">
                <el-option v-for="item in enterpriseOptions"
                           :key="item.value"
                           :label="item.text"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :headers="upload.headers"
        :action="upload.url"
        :data="upload.data"
        accept=".xlsx, .xls"
        :on-success="handleSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传excel文件 支持.xls .xlsx</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { pageList, detail, add, edit, del, exportData, getOption } from "@/api/telecom/people/list";
import {Constant} from "../../../base";
import {getToken} from "@/utils/auth";


export default {
  name: "People",
  dicts: ['sys_normal_disable'],
  data() {
    return {
      enterpriseOptions:[],
      upload: {
        data:{enterpriseId: undefined},
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/telecom/people/importData"
      },
      Constant,
      options: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 字典表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      importTitle: "",
      // 是否显示弹出层
      open: false,
      importOpen: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sex: undefined,
        name: undefined,
        nation: undefined,
      },
      // 表单参数
      form: {
        url: ''
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "blur" }
        ],
        nation: [
          { required: true, message: "民族不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getEnterpriseOption();
  },

  methods: {
    getEnterpriseOption(){
      getOption().then(response => {
          this.enterpriseOptions = response.data;
        }
      );
    },
    /** 查询列表 */
    getList() {
      this.loading = true;
      pageList(this.queryParams).then(response => {
          this.typeList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        pic: "",
        url: ''
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加人员";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      detail(id).then(response => {
        this.form = response.data;
        this.form.url = ''
        this.open = true;
        this.title = "修改人员";
      });
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            edit(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            add(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id || this.ids;
      this.$modal.confirm('是否确认删除此人员？').then(function() {
        return del(id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/dict/type/export', {
        ...this.queryParams
      }, `type_${new Date().getTime()}.xlsx`)
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess("刷新成功");
      });
    },

    /** 导入按钮操作 */
    importData() {
      //this.reset();
      this.upload.data.enterpriseId = undefined
      this.importOpen = true;
      this.importTitle = "导入人员信息";
    },
    exportData() {
      exportData(this.queryParams).then(response => {
        window.location.href = process.env.VUE_APP_BASE_API + "/common/download?fileName="+response.msg;
      })
    },

    handleSuccess(response, file, fileList) {
      console.info("HandleSuccess=== " + JSON.stringify(response));
      this.loading = false;
      this.dialog = false;
      this.$refs.upload.clearFiles();
      this.$emit("update");
      console.log('update');
      this.importOpen = false;
      this.$modal.msgSuccess("导入成功");
      this.getList();
    },
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ccc;
}
::-webkit-scrollbar-track{
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
</style>

