<template>
    <div id="add-apartment">
        <div class="row">
            <div id="apartment-form" class="col-md-6">
                <h2>Create a new Apartment</h2>
                <form v-if="!submitted" name="apartment">
                    <div class="form-group">
                        <label class="control-label required">Move-in date</label>
                        <input type="date" v-model.lazy="apartment.moveInDate" required class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label required">Street</label>
                        <input type="text" v-model.lazy="apartment.street" required class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label required">Town:</label>
                        <input type="text" v-model.lazy="apartment.town" required class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label required">Country:</label>
                        <input type="text" v-model.lazy="apartment.country" required class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label required">Postal code:</label>
                        <input type="number" v-model.lazy="apartment.postCode" required class="form-control" />
                    </div>

                    <div class="form-group">
                        <label class="control-label required">Email:</label>
                        <input type="email" v-model.lazy="apartment.email" required class="form-control" />
                    </div>

                    <button v-on:click.prevent="createApartment" class="btn">Add Apartment</button>
                </form>
                <div v-if="submitted">
                    <h3>Thanks for adding your Apartment</h3>
                </div>
            </div>
            <div id="apartment-preview" class="col-md-6">
                <h3>Preview Apartment</h3>
                <p>Move-in Date: {{ apartment.moveInDate | dateFormat }}</p>
                <p>Street: {{ apartment.street }}</p>
                <p>Town: {{ apartment.town }}</p>
                <p>Country: {{ apartment.country }}</p>
                <p>Postal Code: {{ apartment.postCode }}</p>
                <p>Email: {{ apartment.email }}</p>
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
      submitted: false
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
      })
    }
  },
  filters: {
    dateFormat (value) {
      const date = new Date(value)
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    }
  }
}
</script>

<style></style>