<template>
  <header>
    <nav class="nbar">
      <ul>
        <li><a href="default.asp">Home</a></li>
        <li><a href="about.asp">About</a></li>
        <li style="float: right"><a href="/Register">Register</a></li>
        <li style="float: right"><a href="/Login">Login</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "Nav-bar"
  };
</script>

<style>

nav {
  position: absolute;
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
