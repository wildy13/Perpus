<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone image"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <div class="text-center text-red-500">{{ error }}</div>
          <div class="text-3xl text-center mb-4 font-sans">
            Perpustakaan Online
          </div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :hide-required-asterisk="true"
            label-position="top"
            @submit.native.prevent="submitForm('form')"
          >
            <div class="mb-6">
              <el-form-item>
                <el-input
                  v-model="form.username"
                  type="text"
                  placeholder="Username"
                ></el-input>
              </el-form-item>
            </div>

            <div class="mb-6">
              <el-form-item>
                <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  show-password
                ></el-input>
              </el-form-item>
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group flex text-sm">
                <div class="mx-4">
                  <div class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                    <nuxt-link to="/sign-up">
                      doesn't have account?
                    </nuxt-link>
                  </div>
                </div>
                <div class="mx-4">
                  <a
                    href="#!"
                    class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >Forgot password?</a>
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button
              native-type="submit"
              type="submit"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>

            <div
              class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ]
      },
      error: ''
    }
  },

  methods: {
    submitForm (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            await this.$auth.loginWith('local', { data: this.form })
          } catch (err) {
            this.error = err.response.data
          }
        }
      })
    }
  }
}
</script>