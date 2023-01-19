<template>
  <div>
    <div class="mt-20  ml-4">
      <div class="text-center text-2xl font-sans font-medium">
        Data User
      </div>
    </div>
    <div class="ml-4">
      <el-button icon="el-icon-delete" @click="handleDelete">
        Delete
      </el-button>
    </div>
    <div class="mt-4">
      <el-table
        ref="multipleTable"
        :data="pageTableData"
        layout="prev, pager, next "
        :total="1000"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" label="No" />
        <el-table-column prop="image" label="Image">
          <template slot-scope="scope">
            <div class="photos">
              <img v-if="scope.row.image" :src="`uploads/${scope.row.image}`" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="nisn" label="NISN" />
        <el-table-column label="Role" class="table-col">
          <template slot-scope="scope">
            {{ scope.row.role.name }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row), (dialogVisible = true)"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpload(scope.row)"
            >
              Upload Image
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Pagination -->
      <div class="flex justify-end">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="page"
          :total="usersData.length"
          :page-size="pageSize"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- edit user dialog -->
    <div class="mt-4">
      <el-dialog title="Edit Users" :visible.sync="dialogVisible">
        <div class="">
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            :hide-required-asterisk="true"
            label-width="150px"
            @submit.native.prevent="editForm()"
          >
            <div>
              <div>
                <el-form-item prop="username" label="Username" :label-width="formLabelWidth">
                  <input
                    v-model="formEdit.username"
                    type="text"
                    class="block px-4 font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item prop="email" label="Email" :label-width="formLabelWidth">
                  <input
                    v-model="formEdit.email"
                    type="text"
                    class="block px-4 font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item prop="nisn" label="NISN" :label-width="formLabelWidth">
                  <input
                    v-model="formEdit.nisn"
                    type="number"
                    class="block px-4 font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item v-if="$auth.user.roleId===2" prop="roleId" label="Role" :label-width="formLabelWidth">
                  <el-select
                    v-model="formEdit.roleId"
                    placeholder="Role"
                  >
                    <el-option
                      v-for="item in selectDataRole"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="flex justify-end">
              <el-button native-type="submit" :loading="loading">
                Save
              </el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>

      <el-dialog title="Upload Image" :visible.sync="dialogVisibleUpload">
        <el-upload
          ref="upload"
          name="avatar"
          accept="image/png, image/jpeg"
          :data="row"
          class="upload-demo"
          action="http://localhost:5001/api/user/upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">
            select file
          </el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
            upload to server
          </el-button>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      formLabelWidth: '100px',
      row: {},
      imageUrl: '',
      dialogVisible: false,
      dialogVisibleUpload: false,
      page: 1,
      pageSize: 5,
      pagerCount: 5,
      pageSizes: [5, 10, 20, 50],
      search: '',
      filtered: [],
      multipleSelection: [],
      rules: {
        username: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur'
          }
        ]
      },
      error: '',
      success: '',
      loadingImage: false,
      imageFile: null,
      formEdit: {
        username: '',
        email: '',
        roleId: '',
        nisn: ''
      }
    }
  },
  computed: {
    ...mapState('users', ['loading']),
    ...mapState('roles', ['loading']),
    ...mapState('logout', ['loading']),
    ...mapGetters({
      loading: ['users/getLoading'],
      usersData: ['users/getUsers'],
      selectDataRole: ['roles/getRoles']
    }),
    pageTableData () {
      return this.usersData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      )
    }
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchUsers()
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
    ...mapActions('users', [
      'fetchUsers',
      'createUser',
      'fetchDel',
      'fetchEdit'
    ]),
    ...mapActions('roles', ['fetchRoles']),
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.page = val
    },
    handleEdit (payload) {
      this.formEdit = { ...payload }
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
            message:
              'Changes saved. Proceeding to a new route, Please refresh browser for New Data.'
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Changes discarded. Proceeding to a new route.'
                : 'Stay in the current route'
          })
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleUpload (row) {
      this.row = row
      this.dialogVisibleUpload = true
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.dialogVisibleUpload = false
    },
    handleAvatarSuccess (res, file) {
      this.formEdit.image = URL.createObjectURL(file.raw)
      this.loadingImage = false
    },
    beforeAvatarUpload (file) {
      this.formEdit.image = file
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('This image is bigger than 2MB!')
      }

      this.loadingImage = true
      return isLt2M
    },
    async editForm () {
      try {
        this.dialogVisible = true
        await this.fetchEdit({
          id: this.formEdit.id,
          username: this.formEdit.username,
          email: this.formEdit.email,
          nisn: this.formEdit.nisn,
          roleId: this.formEdit.roleId
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
    }
  }
}
</script>

<style scoped>
  .photos img{
    width: 100%;
    object-fit: contain;
  }
</style>