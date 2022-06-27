<template>
  <section>
    <div class="profile">
      <div class="userInfo">Name: {{ user.firstName }}</div>
      <div class="userInfo">Surname: {{ user.lastName }}</div>
      <div class="userInfo">Email: {{ user.email }}</div>
      <div class="profile-btn">
        <button>Update</button>
        <button id="delete-button" @click="deleteUser()">Delete</button>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';

export default {
  name: "My-profile",

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },

  methods:{
    //////////////////////////////////////////////////////////////////////////////////////////
    //update user - axios put
    //TODO

    //////////////////////////////////////////////////////////////////////////////////////////
    //delete user - axios delete
    async deleteUser(){
      const user = localStorage.userId
      const url = `api/user/profile/${user}`
      axios.delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      this.$router.push('/')
    }
  },

  
  mounted() {
    //////////////////////////////////////////////////////////////////////////////////////////
    //get user data - axios get
    const user = localStorage.userId
    const url = `api/user/profile/${user}`
    axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      let user = response.data
      this.user.firstName = user.firstName
      this.user.lastName = user.lastName
      this.user.email = user.email
    }).catch(error => {
      console.log(error)
    })
  }

};
</script>

<style>
.profile {
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 250px;
  min-height: 400px;
  width: 40%;
  border-radius: 15px;
  padding: 40px;
  background: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.userInfo {
  border: 1px solid black;
  background: white;
  min-height: 30px;
  width: 75%;
  margin: auto;
  margin-top: 50px;
  border-radius: 5px;
}

.profile-btn {
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
</style>
