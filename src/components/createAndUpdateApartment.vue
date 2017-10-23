<template>
    <div id="add-apartment">
        <div class="row">
            <div id="apartment-form" class="col-md-6">

                <h2 v-if="this.apartmentId == undefined">Create a new Apartment</h2>
                <h2 v-else="this.apartmentId != undefined">Edit an Apartment</h2>

                <p class="text-danger" v-if="hasCommonError">{{ formErrors.common }}</p>

                <form v-if="!submitted" name="apartment">
                    <div class="form-group" :class="{'has-error': hasDateError }">
                        <label class="control-label required">Move-in date</label>
                        <div class="form-inline">
                            <input type="number" v-model.lazy="apartment.moveInDate.month" required class="form-control" placeholder="Month" min="1" max="12"/>
                            <input type="number" v-model.lazy="apartment.moveInDate.day" required class="form-control" placeholder="Day" min="1" max="31"/>
                            <input type="number" v-model.lazy="apartment.moveInDate.year" required class="form-control" placeholder="Year" min="1900" max="2038"/>
                        </div>
                        <p class="text-danger" v-if="hasDateError">{{ formErrors.move_in_date }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasStreetError }">
                        <label class="control-label required">Street</label>
                        <input type="text" v-model.lazy="apartment.street" required class="form-control" placeholder="Street" />
                        <p class="text-danger" v-if="hasStreetError">{{ formErrors.street }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasTownError }">
                        <label class="control-label required">Town:</label>
                        <input type="text" v-model.lazy="apartment.town" required class="form-control" placeholder="Town" />
                        <p class="text-danger" v-if="hasTownError">{{ formErrors.town }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasCountryError }">
                        <label class="control-label required">Country:</label>
                        <input type="text" v-model.lazy="apartment.country" required class="form-control" placeholder="Country" />
                        <p class="text-danger" v-if="hasCountryError">{{ formErrors.country }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasPostCodeError }">
                        <label class="control-label required">Postal code:</label>
                        <input type="number" v-model.lazy="apartment.postCode" required class="form-control" placeholder="Postal code" />
                        <p class="text-danger" v-if="hasPostCodeError">{{ formErrors.postCode }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasEmailError }">
                        <label class="control-label required">Email:</label>
                        <input type="email" v-model.lazy="apartment.email" required class="form-control" placeholder="email" />
                        <p class="text-danger" v-if="hasEmailError">{{ formErrors.email }}</p>
                    </div>

                    <button v-if="this.apartmentId == undefined" v-on:click.prevent="createApartment" class="btn">Add Apartment</button>
                    <button v-else="this.apartmentId != undefined" v-on:click.prevent="modifyApartment" class="btn">Save Apartment</button>
                </form>
                <div v-if="submitted">
                    <h3>Thanks for adding your Apartment</h3>
                </div>
            </div>
            <div id="apartment-preview" class="col-md-6">
                <h3>Preview Apartment</h3>
                <dl class="dl-horizontal">
                    <dt>Move-in Date</dt>
                    <dd>{{ apartment.moveInDate.month }}/{{ apartment.moveInDate.day }}/{{ apartment.moveInDate.year }}</dd>

                    <dt>Street</dt>
                    <dd>{{ apartment.street }}</dd>

                    <dt>Town</dt>
                    <dd>{{ apartment.town }}</dd>

                    <dt>Country</dt>
                    <dd>{{ apartment.country }}</dd>

                    <dt>Postal Code</dt>
                    <dd>{{ apartment.postCode }}</dd>

                    <dt>Email</dt>
                    <dd>{{ apartment.email }}</dd>
                </dl>
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
      apartment: {
        street: '',
        town: '',
        country: '',
        postCode: '',
        moveInDate: {
          month: null,
          day: null,
          year: null
        },
        email: ''
      },
      submitted: false,
      formErrors: {
        move_in_date: '',
        street: '',
        town: '',
        country: '',
        postCode: '',
        email: '',
        common: ''
      }
    }
  },
  mounted () {
    if (this.apartmentId) {
      this.loadApartment()
    }
  },
  methods: {
    loadApartment: function () {
      this.$http.get(API_LOCATION + '/' + this.apartmentId.toString())
        .then(function (data) {
          const date = new Date(data.body.move_in_date)
          this.apartment.moveInDate = {
            month: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear()
          }
          this.apartment.street = data.body.street
          this.apartment.town = data.body.town
          this.apartment.country = data.body.country
          this.apartment.postCode = data.body.post_code
          this.apartment.email = data.body.email
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createApartment: function () {
      this.$http.post(API_LOCATION, {
        street: this.apartment.street,
        town: this.apartment.town,
        country: this.apartment.country,
        post_code: this.apartment.postCode,
        move_in_date: this.getDate(),
        email: this.apartment.email
      }).then(function (data) {
        console.log(data)
        this.submitted = true
      }).catch(function (error) {
        const errors = error.body.errors
        this.showErrors(errors)
      })
    },
    modifyApartment: function () {
      let url = API_LOCATION + '/' + this.apartmentId.toString()

      this.$http.put(url, {
        street: this.apartment.street,
        town: this.apartment.town,
        country: this.apartment.country,
        post_code: this.apartment.postCode,
        move_in_date: this.getDate(),
        email: this.apartment.email
      }, {
        headers: {
          'X-AUTHORIZE-KEY': this.$route.query.secret
        }
      }).then(function (data) {
        console.log(data)
        this.submitted = true
      }).catch(function (error) {
        const errors = error.body.errors
        this.showErrors(errors)
      })
    },
    getDate () {
      let date = new Date()
      date.setMonth(this.apartment.moveInDate.month - 1)
      date.setDate(this.apartment.moveInDate.day)
      date.setFullYear(this.apartment.moveInDate.year)
      return date.toISOString().split('T')[0]
    },
    showErrors (errors) {
      this.formErrors = {
        move_in_date: '',
        street: '',
        town: '',
        country: '',
        postCode: '',
        email: '',
        common: ''
      }
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].property_path) {
          this.formErrors[errors[i].property_path] = errors[i].message
          if (errors[i].property_path === 'move_in_date') {
            this.formErrors[errors[i].property_path] = 'Incorrect date'
          }
        } else {
          this.formErrors.common = errors[i]
        }
      }
    }
  },
  computed: {
    hasDateError: function () {
      return this.formErrors.move_in_date
    },
    hasStreetError: function () {
      return this.formErrors.street
    },
    hasTownError: function () {
      return this.formErrors.town
    },
    hasCountryError: function () {
      return this.formErrors.country
    },
    hasPostCodeError: function () {
      return this.formErrors.postCode
    },
    hasEmailError: function () {
      return this.formErrors.email
    },
    hasCommonError: function () {
      return this.formErrors.common
    }
  }
}
</script>

<style></style>