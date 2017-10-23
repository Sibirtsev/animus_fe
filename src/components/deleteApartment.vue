<template>
    <div id="delete-apartment">
        <div class="row">
            <div id="apartment-form" class="col-md-6">

                <ul class="text-danger" v-if="errors">
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
                <p class="text-success" v-if="errors.length == 0">Apartment has been deleted</p>

            </div>
        </div>
    </div>
</template>

<script>
import { API_LOCATION } from '../../config'

export default {
  props: ['apartmentId'],
  data () {
    return {
      url: '',
      errors: []
    }
  },
  mounted () {
    if (this.apartmentId) {
      this.url = API_LOCATION + '/' + this.apartmentId.toString()
      this.loadApartment()
      this.deleteApartment()
    }
  },
  methods: {
    loadApartment: function () {
      this.$http.get(this.url)
        .then(function (data) {
          this.apartment.moveInDate = data.body.move_in_date
          this.apartment.street = data.body.street
          this.apartment.town = data.body.town
          this.apartment.country = data.body.country
          this.apartment.postCode = data.body.post_code
          this.apartment.email = data.body.email
        })
        .catch(function (error) {
          this.errors = error.body.errors
          error.reject()
        })
    },

    deleteApartment: function () {
      this.$http.delete(this.url, {
        headers: {
          'X-AUTHORIZE-KEY': this.$route.query.secret
        }
      }).then(function (data) {
        console.log(data)
      }).catch(function (error) {
        this.errors = error.body.errors
        error.reject()
      })
    }
  }
}
</script>

<style></style>