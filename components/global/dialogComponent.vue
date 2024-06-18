<template>
<v-row justify="center">
  <v-dialog
  v-model="show"
  persistent
  max-width="600"
  >
    <v-card>
      <v-card-title>
        <div class="dialog-header">
          <span>افزودن کاربر جدید</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="user.name"
          :rules="user.rules.name"
          class="form-control"
        label="نام"
        outlined
        ></v-text-field>
        <v-text-field
          v-model="user.last_name"
          :rules="user.rules.last_name"
          label="نام خانوادگی"
          class="form-control"
          outlined
        ></v-text-field>
        <v-autocomplete
          v-model="user.city"
          :rules="user.rules.city"
          :loading="loading"
          :items="cities"
          :search-input.sync="search"
          cache-items
          outlined
          hide-no-data
          class="mb-8"
          label="شهر"
          hide-details
          solo-inverted
        ></v-autocomplete>
        <v-text-field
          v-model="user.phone"
          :rules="user.rules.phone"
          label="شماره تماس"
          type="number"
          class="form-control"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="user.age"
          :rules="user.rules.age"
          label="سن"
          type="number"
          class="form-control"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary add-btn" :disabled="disableBtn" @click="addUser">
          افزودن
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>

<script>
export default {
  name: "DialogComponent",
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      user: {
        name: '',
        last_name: '',
        age: '',
        phone: '',
        city: '',
        rules: {
          name: [val=>(val || '').length > 0 || 'نام خود را وارد نمایید' ],
          last_name: [val=>(val || '').length > 0 || 'نام خانوادگی را وارد نمایید' ],
          age: [val=>(val || '').length > 0 || 'سن خود را وارد نمایید' ],
          phone: [val=>(val || '').length > 0 || 'شماره خود را وارد نمایید' ],
          city: [val=>(val || '').length > 0 || 'شهر خود را وارد نمایید' ],
        }
      },
      search: null,
      items: [],
      cities: [
        'همدان',
        'تهران',
        'اهواز',
        'مشهد',
        'مازندران',
        'خوزستان',
        'اردبیل',
        'سمنان',
        'تبریز',
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('close')
      }
    },
    disableBtn() {
      return this.user.name === '' &&
        this.user.last_name === '' &&
        this.user.age === '' &&
        this.user.city === '' &&
        this.user.phone === ''
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
  },
  methods: {
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.cities.filter(e => {
          return (e || '').toLowerCase().includes(v) > -1
        })
        this.loading = false
      }, 500)
    },
    closeDialog() {
      this.$emit('close')
    },
    addUser() {
      this.$emit('newUser', this.user)
    }
  },
}
</script>

<style scoped>

</style>
