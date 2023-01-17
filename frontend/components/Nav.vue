<!-- eslint-disable vue/valid-template-root -->
<template>
  <el-menu :default-active="activeIndex" @select="handleSelect">
    <div class="flex z-50 left-0 top-0 justify-between w-full fixed bg-slate-900">
      <!-- mobile -->
      <div class="flex justify-center items-center ml-2 sm:hidden" x-data="{ open: false }">
        <div class="space-y-2" x-on:click="open = ! open">
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
        </div>
        <div x-show="open" class="absolute">
          <div class="w-60 h-full shadow-md bg-white px-1 absolute">
            <ul class="relative mt-[30px] -ml-[27px] rounded-md bg-slate-900">
              <li class="relative">
                <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/dashboard" data-mdb-ripple="true" data-mdb-ripple-color="dark">Dashboard</a>
              </li>
              <li class="relative">
                <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-users" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Users</a>
              </li>
              <li class="relative">
                <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-books" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Books</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- desktop -->
      <div class="hidden sm:flex">
        <el-menu-item index="dashboard">
          <div class="mx-2">
            <nuxt-link to="/dashboard">
              Dashboard
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item index="management-users">
          <div class="mx-2">
            <nuxt-link to="/management-users">
              Management Users
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item index="management-books">
          <div class="mx-2">
            <nuxt-link to="/management-books">
              Management Books
            </nuxt-link>
          </div>
        </el-menu-item>
      </div>
      <div class="flex">
        <el-menu-item index="notification">
          <div class="flex justify-center items-center mx-4">
            <a href="">
              <i class="el-icon-message-solid text-3xl"></i>
            </a>
          </div>
        </el-menu-item>
        <el-dropdown>
          <img
            :src="`uploads/${$auth.user.image}`"
            class="rounded-full w-12 h-12 mr-2 mt-1"
            alt="Avatar"
          />
          <el-dropdown-menu slot="dropdown" class="bg-slate-900">
            <el-menu-item index="profile">
              <el-dropdown-item>
                <div class="flex">
                  <i class="el-icon-user-solid justify-center items-center" />
                  <div>My Profile</div>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="settings">
              <el-dropdown-item index="settings">
                <div class="flex">
                  <i class="el-icon-s-tools justify-center items-center" />
                  <div>Settings</div>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="change-password">
              <el-dropdown-item index="change-password">
                <div class="flex">
                  <i class="el-icon-s-open justify-center items-center" />
                  <div>Change Password</div>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="logout">
              <el-dropdown-item index="logout">
                <div> Logout</div>
              </el-dropdown-item>
            </el-menu-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      open: false
    }
  },

  methods: {
    async handleSelect (key, keyPath) {
      if (key === 'logout') {
        await this.$auth.logout()
      } else { this.$router.push(key, keyPath) }
    }
  }
}
</script>