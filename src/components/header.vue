<template>

    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Aminus apartments</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/" active-class="nav-item" exact-active-class="active">
                        <a>List</a>
                    </router-link>

                    <router-link tag="li" to="/create" active-class="nav-item" exact-active-class="active">
                        <a>Add new</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
    export default {
    }
</script>

<style></style>