<template>
    <div>
        <div class="page-header">
            <h1>List of apartments</h1>
        </div>
        <div class="apartments-list">
            <div v-for="apartment in apartments" class="apartment-card">
                <h3>{{ apartment.street }}, {{ apartment.town}}</h3>
                <div class="apartment-details">
                    <dl class="dl-horizontal">
                        <dt>Move-in date</dt>
                        <dd>{{ apartment.move_in_date | dateFormat }}</dd>

                        <dt>Address</dt>
                        <dd>{{ apartment.street }}, {{ apartment.town}}, {{ apartment.country }}, {{ apartment.post_code }}</dd>

                        <dt>Contact email</dt>
                        <dd><a :href="'mailto:' + apartment.email" >{{ apartment.email }}</a></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="pagination">
            <v-paginator :options="options" :resource_url="resource_url" @update="updateResource"></v-paginator>
        </div>
    </div>
</template>

<script>
import VuePaginator from 'vuejs-paginator'

export default {
  data () {
    return {
      apartments: [],
      meta: {},
      limit: 10,
      resource_url: 'http://127.0.0.1:8000/api/apartment',
      options: {
        remote_data: 'apartments',
        remote_current_page: 'meta.current_page',
        remote_last_page: 'meta.last_page',
        remote_next_page_url: 'meta.next_page_url',
        remote_prev_page_url: 'meta.prev_page_url',
        next_button_text: 'Forward',
        previous_button_text: 'Backward'
      }
    }
  },
  methods: {
    updateResource (data) {
      this.apartments = data
    }
  },
  filters: {
    dateFormat (value) {
      const date = new Date(value)
      return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    }
  },
  components: {
    VPaginator: VuePaginator
  }
}
</script>

<style></style>