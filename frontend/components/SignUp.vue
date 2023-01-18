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
          {{ success }}
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
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: '1'
      },
      options: [
        {
          value: 1,
          label: 'Siswa'
        },
        {
          value: 3,
          label: 'Petugas'
        }
      ],
      activeIndex: '',
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
        confirmPassword: [{ validator: validatePassword, trigger: 'blur' }]
      },
      error: '',
      success: ''
    }
  },
  computed: {
    ...mapState('users', ['loading']),
    ...mapState('logout', ['loading']),
    ...mapGetters({
      loading: ['users/getLoading'],
      usersData: ['users/getUsers']
    })
  },

  async created () {
    if (process.browser) {
      try {
        await this.fetchUsers()
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
    handleEdit (payload) {
      this.formEdit = { ...payload }
    },
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.error = ''
            await this.createUser(this.form)
            this.$message({
              title: 'success',
              message: 'You did it',
              type: 'success'
            })
            this.$router.replace('/')
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