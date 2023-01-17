<template>
  <div class="flex h-screen items-center bg-[#f1f5f9]">
    <div class="m-auto w-full max-w-md space-y-8 rounded-3xl bg-white px-10 py-14 shadow-md">
      <div class="text-[#409EFF] text-2xl font-sans text-center font-medium">
        Perpustakaan Online
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl font-bold">
          Sign Up
        </h1>
        <p>
          Already have an account?
          <a href="" class="text-[#0A87FB]">
            <nuxt-link to="/">Sign In</nuxt-link>
          </a>
        </p>
      </div>
      <div>
        <el-form
          ref="form"
          action=""
          class="space-y-4"
          :model="form"
          :rules="rules"
          :hide-required-asterisk="true"
          @submit.native.prevent="submitForm('form')"
        >
          <div>
            <el-form-item prop="username" label="Username">
              <el-input
                v-model="form.username"
                label="Username"
                placeholder="Username"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="email" label="Email">
              <el-input v-model="form.email" placeholder="Email" />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="password" label="Password">
              <el-input
                v-model="form.password"
                show-password
                placeholder="Password"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="confirmPassword" label="Confirm Password">
              <el-input
                v-model="form.confirmPassword"
                show-password
                placeholder="Confirm Password"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="roleId" label="Role">
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
          <div>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              class="w-full"
            >
              Sign Up
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
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