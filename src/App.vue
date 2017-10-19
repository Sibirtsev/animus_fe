<template>
  <body>
  <div id="app" class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
  <footer class="footer">
    <div class="container">
      <p class="text-muted">&copy; Alexey Sibirtsev, 2017</p>
    </div>
  </footer>
  </body>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import header from './components/header'

export default {
  components: {
    'app-header': header
  }
}
</script>

<style>
  /* Sticky footer styles
-------------------------------------------------- */
  html {
    position: relative;
    min-height: 100%;
  }
  body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Set the fixed height of the footer here */
    height: 60px;
    background-color: #f5f5f5;
  }


  /* Custom page CSS
  -------------------------------------------------- */
  /* Not required for template or sticky footer method. */

  body > .container {
    padding: 60px 15px 0;
  }
  .container .text-muted {
    margin: 20px 0;
  }

  .footer > .container {
    padding-right: 15px;
    padding-left: 15px;
  }

  code {
    font-size: 80%;
  }
</style>