<template>
  <div id="app">
    <Nav />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view /> 
      </div>
    </div>
    <!-- <Home /> -->
    <Footer/>
    
  </div>
</template>

<script>
// import Nav component
  import Nav from '@/components/Nav.vue';
  // import Home from '@/components/Home.vue';
  // import Login from '@/components/Login.vue';
  import Footer from '@/components/Footer.vue';


// declaration
  export default {
    name:'App',
    components: {
    Nav,
    // Home,
    // Login,
    Footer
},
  };
</script>

<style>
  *{
    padding:0;
    margin:0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 25px;
  }

  body{
    background: #FCFCFC;
    /* height: 100vh; */
    overflow: hidden;
  }
</style>
