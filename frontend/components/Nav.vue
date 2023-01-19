<!-- eslint-disable vue/valid-template-root -->
<template>
  <el-menu :default-active="activeIndex" @select="handleSelect">
    <div class="flex z-50 left-0 top-0 justify-between w-full fixed bg-slate-900 py-2">
      <!-- mobile -->
      <div class="flex justify-center items-center ml-2 sm:hidden" x-data="{ open: false }">
        <div class="space-y-2" x-on:click="open = ! open">
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
        </div>
        <div x-show="open" class="absolute ">
          <div class="font-sans  mt-[19px] -ml-[30px]  shadow-md  px-1 absolute h-screen bg-slate-900 w-64">
            <div>
              <div class=" border-b-2 border-gray-700">
                <div class="text-center text-gray-700 font-sans font-medium p-5">
                  PERPUSTAKAAN ONLINE
                </div>
              </div>
              <div class="flex mb-4">
                <div class="flex items-center w-full mt-2 ml-2">
                  <el-avatar :src="`uploads/${$auth.user.image}`"></el-avatar>
                  <div class="text-gray-700 ml-2 text-center w-full">
                    {{ $auth.user.username }}
                  </div>
                </div>
              </div>
              <div>
                <ul class="border-y border-gray-700">
                  <li class="flex ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                    <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/dashboard" data-mdb-ripple="true" data-mdb-ripple-color="dark">Dashboard</a>
                  </li>
                  <li class="ml-4">
                    <div v-if="$auth.user.roleId===2" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-users" data-mdb-ripple="true" data-mdb-ripple-color="dark">Users Management</a>
                    </div>
                    <div v-else-if="$auth.user.roleId===3" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-users" data-mdb-ripple="true" data-mdb-ripple-color="dark">Users Management</a>
                    </div>
                  </li>
                  <li class="ml-4">
                    <div v-if="$auth.user.roleId===3" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-books" data-mdb-ripple="true" data-mdb-ripple-color="dark">Books Management</a>
                    </div>
                    <div v-if="$auth.user.roleId===2" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-books" data-mdb-ripple="true" data-mdb-ripple-color="dark">Books Management</a>
                    </div>
                  </li>
                  <li v-if="$auth.user.roleId===2" class="flex ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48s21.5 48 48.1 48s48.1-21.5 48.1-48z" /></svg>
                    <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-roles" data-mdb-ripple="true" data-mdb-ripple-color="dark">Roles Management</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="border-y border-gray-700">
                  <li>
                    <div>Settings</div>
                  </li>
                  <li>
                    <div>Change Password</div>
                  </li>
                </ul>
              </div>
              <div>
                <div>
                  <el-menu-item index="logout">
                    Logout
                  </el-menu-item>
                </div>
              </div>
              <div class="text-gray-700  absolute bottom-[60px] w-full text-center">
                <div>
                  <footer>&copy; Developed by <a href="https://wildy13.github.io/wildy">Wildy Johanes Simanjuntak</a></footer>
                </div>
              </div>
            </div>
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
          <div v-if="$auth.user.roleId===2" class="mx-2">
            <nuxt-link to="/management-users">
              Management Users
            </nuxt-link>
          </div>
          <div v-else-if="$auth.user.roleId===3" class="mx-2">
            <nuxt-link to="/management-users">
              Management Users
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item v-if="$auth.user.roleId===2" index="management-roles">
          <div class="mx-2">
            <nuxt-link to="/management-roles">
              Management Roles
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item index="management-books">
          <div v-if="$auth.user.roleId===2" class="mx-2">
            <nuxt-link to="/management-books">
              Management Books
            </nuxt-link>
          </div>
          <div v-else-if="$auth.user.roleId===3" class="mx-2">
            <nuxt-link to="/management-books">
              Management Books
            </nuxt-link>
          </div>
        </el-menu-item>
      </div>
      <div class="hidden sm:flex">
        <el-menu-item index="notification">
          <div class="flex justify-center items-center mx-4">
            <a href="">
              <i class="el-icon-message-solid text-3xl"></i>
            </a>
          </div>
        </el-menu-item>
        <el-dropdown>
          <el-avatar :src="`uploads/${$auth.user.image}`" style="width: 52px; height: 52px;"></el-avatar>
          <el-dropdown-menu slot="dropdown" class="bg-slate-900">
            <el-menu-item index="profile">
              <el-dropdown-item>
                <div class="flex">
                  <i class="el-icon-user-solid justify-center items-center" />
                  <nuxt-link to="/profile">
                    My Profile
                  </nuxt-link>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="settings">
              <el-dropdown-item index="settings">
                <div class="flex">
                  <i class="el-icon-s-tools justify-center items-center" />
                  <nuxt-link to="/settings">
                    Settings
                  </nuxt-link>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="change-password">
              <el-dropdown-item index="change-password">
                <div class="flex">
                  <i class="el-icon-s-open justify-center items-center" />
                  <nuxt-link to="/change-password">
                    Change Password
                  </nuxt-link>
                </div>
              </el-dropdown-item>
            </el-menu-item>
            <el-menu-item index="logout">
              <el-dropdown-item>
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