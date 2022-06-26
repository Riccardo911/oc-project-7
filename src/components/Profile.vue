<template>
  <section>
    <div class="profile">
      <div class="userInfo">Name: {{ user.firstName }}</div>
      <div class="userInfo">Surname: {{ user.lastName }}</div>
      <div class="userInfo">Email: {{ user.email }}</div>
      <div class="profile-btn">
        <button>Update</button>
        <button id="delete-button">Delete</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "My-profile",

  data() {
    return {
      user: {
        firstName: "test",
        lastName: "test",
        email: "test@example.com",
      },
    };
  },


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
