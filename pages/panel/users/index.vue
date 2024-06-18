<template>
  <div>
    <div class="header-top">
      <v-btn class="primary" @click="toggleDialog">
        <v-icon>mdi-plus</v-icon>
        <span>کاربر جدید</span>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
        <tr class="header-table">
          <th v-for="(header, n) in headers" :key="n">{{ header.text }}</th>
        </tr>
        </thead>
        <div v-if="loading" class="loading-table">
          <v-progress-circular
            indeterminate
          >
          </v-progress-circular>
        </div>
        <tbody v-else>
        <tr
          v-for="(item, n) in getUsers"
          :key="item.name"
        >
          <td>{{ n + 1 }}</td>
          <td>{{ item[1].name }}</td>
          <td>{{ item[1].last_name }}</td>
          <td>{{ item[1].phone }}</td>
          <td>{{ item[1].age }}</td>
          <td>{{ item[1].city }}</td>
          <td>
            <v-btn width="24" min-width="24" height="24" class="error" @click="deleteUser(item[0])">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>

    </v-simple-table>
    <dialog-component
      :dialog="showDialog"
      @close="closeDialog"
      @newUser="newUser"
    />
  </div>
</template>

<script>
import DialogComponent from "~/components/global/dialogComponent.vue";

export default {
  components: {DialogComponent},
  layout: 'panel',
  data() {
    return {
      showDialog: false,
      loading: false,
      headers: [
        {text: ''},
        {text: 'نام'},
        {text: 'نام خانوادگی'},
        {text: 'شماره تماس'},
        {text: 'سن'},
        {text: 'استان'},
        {text: ''},
      ],
    }
  },
  computed: {
    getUsers() {
      return this.$store.getters['user/getUsers']
    }
  },
  mounted() {
    this.getAllUsers()
  },
  methods: {
    deleteUser(user) {
      this.$store.dispatch('user/deleteUser',user)
        .then(()=>{
          this.getAllUsers()
          this.$toast.error('کاربر مورد نظر حذف شد')
        })
    },
    toggleDialog() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    newUser(user) {
      this.loading = true
      this.$store.dispatch('user/addUser', user)
        .then(res => {
          this.$toast.success('کاربر جدید با موفقیت اضافه شد')
          this.getAllUsers()
          this.showDialog = false
        }).finally(() => {
        this.loading = false
      })
    },
    getAllUsers() {
      this.loading = true
      this.$store.dispatch('user/getUsers')
        .finally(() => {
          this.loading = false
        })
    }
  },
}
</script>
<style scoped>

</style>
