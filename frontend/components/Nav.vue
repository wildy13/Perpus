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
        <div x-show="open" class="absolute">
          <div class="mt-[20px] -ml-[30px]  shadow-md  px-1 absolute h-screen bg-slate-900 w-[95vw]">
            <div class="">
              <div class=" border-b-2 border-gray-700">
                <div class="text-center text-gray-700 font-sans font-medium p-5">
                  PERPUSTAKAAN ONLINE
                </div>
              </div>
              <div class="flex mb-4">
                <div class="w-auto mt-2 ml-2">
                  <el-avatar :src="`uploads/${$auth.user.image}`"></el-avatar>
                  <div class="text-center text-gray-700">
                    {{ $auth.user.username }}
                  </div>
                </div>
                <div class="container flex w-full text-gray-700 justify-center items-center">
                  <div class="mx-2">
                    <div class="text-center">
                      10K
                    </div>
                    <div>Books</div>
                  </div>
                  <div class="mx-2">
                    <div class="text-center">
                      10K
                    </div>
                    <div>Following</div>
                  </div>
                  <div class="mx-2">
                    <div class="text-center">
                      10K
                    </div>
                    <div>Followers</div>
                  </div>
                </div>
              </div>
              <div>
                <ul class="border-t border-gray-700">
                  <li class="flex ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                    <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/dashboard" data-mdb-ripple="true" data-mdb-ripple-color="dark">Dashboard</a>
                  </li>
                  <li class="ml-4">
                    <div v-if="$auth.user.roleId===2" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-users" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Users</a>
                    </div>
                    <div v-else-if="$auth.user.roleId===3" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-users" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Users</a>
                    </div>
                  </li>
                  <li class="ml-4">
                    <div v-if="$auth.user.roleId===3" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-books" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Books</a>
                    </div>
                    <div v-if="$auth.user.roleId===2" class="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                      <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-books" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Books</a>
                    </div>
                  </li>
                  <li v-if="$auth.user.roleId===2" class="flex ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px]"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z" /></svg>
                    <a class="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/management-roles" data-mdb-ripple="true" data-mdb-ripple-color="dark">Management Roles</a>
                  </li>
                </ul>
              </div>
              <div class="text-gray-700 w-[95vw] text-center absolute bottom-[60px]">
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