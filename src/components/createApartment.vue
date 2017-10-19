<template>
    <div id="add-apartment">
        <div class="row">
            <div id="apartment-form" class="col-md-6">
                <h2>Create a new Apartment</h2>
                <form v-if="!submitted" name="apartment">
                    <div class="form-group" :class="{'has-error': hasDateError }">
                        <label class="control-label required">Move-in date</label>
                        <input type="date" v-model.lazy="apartment.moveInDate" required class="form-control" />
                        <p class="text-danger" v-if="hasDateError">{{ formErrorsMessages.move_in_date }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasStreetError }">
                        <label class="control-label required">Street</label>
                        <input type="text" v-model.lazy="apartment.street" required class="form-control" placeholder="Street" />
                        <p class="text-danger" v-if="hasStreetError">{{ formErrorsMessages.street }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasTownError }">
                        <label class="control-label required">Town:</label>
                        <input type="text" v-model.lazy="apartment.town" required class="form-control" placeholder="Town" />
                        <p class="text-danger" v-if="hasTownError">{{ formErrorsMessages.town }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasCountryError }">
                        <label class="control-label required">Country:</label>
                        <input type="text" v-model.lazy="apartment.country" required class="form-control" placeholder="Country" />
                        <p class="text-danger" v-if="hasCountryError">{{ formErrorsMessages.country }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasPostCodeError }">
                        <label class="control-label required">Postal code:</label>
                        <input type="number" v-model.lazy="apartment.postCode" required class="form-control" placeholder="Postal code" />
                        <p class="text-danger" v-if="hasPostCodeError">{{ formErrorsMessages.postCode }}</p>
                    </div>

                    <div class="form-group" :class="{'has-error': hasEmailError }">
                        <label class="control-label required">Email:</label>
                        <input type="email" v-model.lazy="apartment.email" required class="form-control" placeholder="email" />
                        <p class="text-danger" v-if="hasEmailError">{{ formErrorsMessages.email }}</p>
                    </div>

                    <button v-on:click.prevent="createApartment" class="btn">Add Apartment</button>
                </form>
                <div v-if="submitted">
                    <h3>Thanks for adding your Apartment</h3>
                </div>
            </div>
            <div id="apartment-preview" class="col-md-6">
                <h3>Preview Apartment</h3>
                <dl class="dl-horizontal">
                    <dt>Move-in Date</dt>
                    <dd>{{ apartment.moveInDate | dateFormat }}</dd>

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
export default {
  data () {
    return {
      apartment: {
        street: '',
        town: '',
        country: '',
        postCode: '',
        moveInDate: '',
        email: ''
      },
      submitted: false,
      formErrors: {
        move_in_date: false,
        street: false,
        town: false,
        country: false,
        postCode: false,
        email: false
      },
      formErrorsMessages: {}
    }
  },
  methods: {
    createApartment: function () {
      this.$http.post('http://127.0.0.1:8000/api/apartment', {
        street: this.apartment.street,
        town: this.apartment.town,
        country: this.apartment.country,
        post_code: this.apartment.postCode,
        move_in_date: this.apartment.moveInDate,
        email: this.apartment.email
      }).then(function (data) {
        console.log(data)
        this.submitted = true
      }).catch(function (error) {
        const errors = error.body.errors
        this.formErrors = {
          move_in_date: false,
          street: false,
          town: false,
          country: false,
          postCode: false,
          email: false
        }
        for (let i = 0; i < errors.length; i++) {
          this.formErrors[errors[i].property_path] = true
          this.formErrorsMessages[errors[i].property_path] = errors[i].message
        }
      })
    }
  },
  filters: {
    dateFormat (value) {
      if (!value.length) {
        return ''
      }
      const date = new Date(value)
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
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
    }
  }
}
</script>

<style></style>