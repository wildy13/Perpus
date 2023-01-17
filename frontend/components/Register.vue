<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :hide-required-asterisk="true"
    label-width="150px"
    @submit.native.prevent="submitForm('form')"
  >
    <div class="flex">
      <div>
        <el-form-item prop="username" label="Username" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            label="Username"
            placeholder="Username"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item prop="email" label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" placeholder="Email" />
        </el-form-item>
      </div>
    </div>
    <div class="flex">
      <div>
        <el-form-item prop="password" label="Password" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            show-password
            placeholder="Password"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item prop="confirmPassword" label="Confirm Password" :label-width="formLabelWidth">
          <el-input
            v-model="form.confirmPassword"
            show-password
            placeholder="Confirm Password"
          />
        </el-form-item>
      </div>
    </div>
    <div>
      <el-form-item prop="roleId" label="Role" :label-width="formLabelWidth">
        <el-select
          v-model="form.roleId"
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
    <div class="mt-12">
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
        class="w-full"
      >
        Save
      </el-button>
    </div>
  </el-form>
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
      formLabelWidth: '150px',
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: ''
      },
      activeIndex: '',
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
        password: [
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
        ],
        confirmPassword: [{ validator: validatePassword, trigger: 'blur' }]
      },
      error: '',
      success: ''
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
      if (this.search) {
        return this.miniSearch
          .search(this.search, { prefix: true })
          .slice(0, this.pageSize)
      }
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
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.dialogVisible = true
            this.error = ''
            await this.createUser(this.form)
            this.$message({
              title: 'success',
              message: 'You did it',
              type: 'success'
            })
            this.dialogVisible = false
            return true
          } catch ({ response: { data } }) {
            this.error = data
            this.success = ''
            this.loading = false
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
