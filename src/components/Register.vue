<template>
  <section class="register-box">
    <form @submit.prevent="handleSubmit">
      <div class="register-form">
        <div class="center">
          <h3>Register</h3>

          <div class="form-group">
            <label></label>
            <input
              type="first_name"
              class="form-control"
              v-model="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div class="form-group">
            <label></label>
            <input
              type="last_name"
              class="form-control"
              v-model="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          <div class="form-group">
            <label></label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>

          <div class="form-group">
            <label></label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>

          <!-- <div class="form-group">
                    <label></label>
                    <input type="password_confirm" class="form-control" v-model="password_confirm" placeholder="Confirm password" required />
                </div> -->

          <input type="submit" value="Register" />

          <div class="register_link">
            Already a member? <router-link to="/Login">Login</router-link>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "register-form",

  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // password_confirm: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post("/api/user/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          // password_confirm: this.password_confirm
        });
      } catch (err) {
        // console.log(err.response.data.error)
        if (err.response.status == 401) {
          alert("User already exist");
        }
      }
      this.$router.push("login");
    },
  },
};
</script>

<style>
.register-box {
  /* border: 1px solid black; */
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  margin-top: 250px;
}

.register-form {
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 500px;
  background-color: #333;
  color: white;
  padding: 60px;
  box-shadow: 0px 2px 8px rgb(0, 0, 0, 1);
}

.center h3 {
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid;
}

.form-group {
  padding: 15px;
  box-sizing: border-box;
  text-align: center;
}

input[type="submit"] {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  border: 2px solid white;
  background: green;
  color: white;
  border-radius: 10px;
}

input[type="submit"]:hover {
  border-color: aqua;
  transition: 0.8s;
}

.register_link {
  margin-top: 30px;
  text-align: center;
}

.register_link a {
  color: aqua;
  text-decoration: none;
}

.register_link a:hover {
  text-decoration: underline;
}
</style>
