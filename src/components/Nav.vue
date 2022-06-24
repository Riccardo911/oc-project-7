<template>
    <nav class="nbar">
      <ul>
        <!-- if user is not logged -->
        <li style="float: right"><router-link to="/Register">Register</router-link></li>
        <li style="float: right"><router-link to="/Login">Login</router-link></li>
        <!-- if user is logged -->
        <li  ><router-link to="/home">Home</router-link></li>
        <li style="float: right" @click="logout()"><router-link to="/">Logout</router-link></li>
        <li style="float: right"><router-link to="/Profile">Profile</router-link></li>
      </ul>
    </nav>
</template>

<script>
  export default {
    name: "Nav-bar",

    methods: {

      logout() {
        localStorage.clear()
        this.$router.push('/')
      }
    }
  };
</script>

<style>

.nbar{
  height: 60px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

/* .active {
    background-color: #04AA6D;
  } */

ul {
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  border-right: 1px solid #bbb;
  border-left: 1px solid #bbb;
}

/* li:last-child {
    border-right: none;
  } */
</style>
