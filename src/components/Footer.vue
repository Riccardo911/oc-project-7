<template>
  <footer>
    <div class="logo">
      <img src="../assets/groupomania_logo.png" alt="groupomania_logo">
    </div>
    <div class="mission-text">
      Internal social network for Groupomania's employees
    </div>
  </footer>
</template>


<script>
  export default {
    name: "footer-end"
  };
</script>

<style>
   footer{
    border: 1px solid black;
    min-height: 220px;
    position:absolute;
    bottom:0;
    width:100vw;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
   }
   img{
    /* border: 1px solid white; */
    width: 30%;
    padding-bottom: 20px;
   }

   .mission-text {
    padding-top: 10px;
    color:white;
    border-top: 1px solid white;
   }
</style>
