<template>
  <el-container>
    <div class="w-full mt-20">
      <div class="flex justify-between mt-2 w-full">
        <div class="flex ml-4">
          <!-- Add Button -->
          <el-button icon="el-icon-plus" @click="dialogVisible = true">
            Add Role
          </el-button>

          <!-- Delete Button -->
          <el-button icon="el-icon-delete" @click="handleDelete">
            Delete
          </el-button>
        </div>
      </div>
      <div>
        <el-table
          :data="pageTableData"
          class="tableRole"
          layout="prev, pager, next "
          :total="1000"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <el-table-column type="index" label="No" class="table-col" />
          <el-table-column prop="name" label="Name" class="table-col" />
          <el-table-column prop="createdAt" label="Created At" class="table-col" />
          <el-table-column prop="updatedAt" label="Updated At" class="table-col" />
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row), dialogVisible1 = true"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- Pagination -->
        <div class="flex justify-end">
          <el-pagination
            layout="total, sizes, prev, pager, next"
            :current-page="page"
            :total="roleData.length"
            :page-size="pageSize"
            :pager-count="pagerCount"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- Add Dialog -->
      <el-dialog
        title="Input Role-based"
        :visible.sync="dialogVisible"
      >
        <span>
          <el-form ref="form" :model="form" label-width="10px" :rules="rules">
            <el-form-item label="Role name" :label-width="formLabelWidth">
              <el-input
                v-model="form.name"
                placeholder="Ex; Admin, Users, Maneger"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSave">Save</el-button>
        </span>
      </el-dialog>
      <!-- End of add dialog -->
      <!-- Edit Dialog -->
      <el-dialog
        title="Input Role-based"
        :visible.sync="dialogVisible1"
      >
        <span>
          <el-form ref="formEdit" :model="formEdit" :rules="rules">
            <el-form-item label="Role name" :label-width="formLabelWidth">
              <el-input
                v-model="formEdit.name"
                placeholder="Ex; Admin, Users, Maneger"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="editForm">Save</el-button>
        </span>
      </el-dialog>
      <!-- end of edit dialog -->
    </div>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('This field is required'))
      } else if (value !== this.form.password) {
        callback(new Error('Password not match!'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '100px',
      activeIndex: 'RoleUser',
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        name: ''
      },
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      filtered: [],
      multipleSelection: [],
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        confirmPassword: [{ validator: validatePassword, trigger: 'blur' }]
      },
      error: '',
      success: '',
      formEdit: {
        id: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapState('roles', ['loading']),
    ...mapGetters({
      loading: ['roles/getLoading'],
      roleData: ['roles/getRoles']
    }),
    pageTableData () {
      return this.roleData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchRoles()
      } catch (error) {
        this.$message({
          title: 'error',
          message: error,
          type: 'error'
        })
      }
    }
  },
  methods: {
    ...mapActions('roles', ['inputRole', 'fetchRoles', 'fetchDel', 'fetchEdit']),
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.page = val
    },
    handleSelect (key, keyPath) {
      this.$router.push(key, keyPath)
    },
    handleEdit (payload) {
      this.formEdit = { ...payload }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDelete () {
      this.$confirm('Are you sure for delete this data?', 'Confirm', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
        .then(() => {
          this.fetchDel(this.multipleSelection)
          this.$message({
            type: 'info',
            message: 'Changes saved. Proceeding to a new route.'
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? 'Changes discarded. Proceeding to a new route.'
              : 'Stay in the current route'
          })
        })
    },
    onSave () {
      try {
        this.inputRole({
          name: this.form.name
        })
        this.$message({
          title: 'success',
          message: 'You did it',
          type: 'success'
        })
        this.dialogVisible = false
      } catch (error) {
        if (error.response) {
          this.$message({
            title: 'error',
            message: error.response.data.msg,
            type: 'error'
          })
        }
      }
    },
    async editForm () {
      try {
        this.dialogVisible1 = true
        await this.fetchEdit({
          id: this.formEdit.id,
          name: this.formEdit.name
        })
        this.dialogVisible1 = false
      } catch (error) {
        if (error.response) {
          this.$message({
            title: 'error',
            message: error.response.data.msg,
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
