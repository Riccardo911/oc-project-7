<template>
  <section>
    <div class="post">
      <!-- <div class="post_user">
        <div class="profile-img"></div>
        <div class="profile-name"></div>
      </div> -->
      <div class="post_content">
        <form @submit.prevent="handleSubmit">
          <textarea type="text" name="text" col="5" placeholder="Write some text..." required v-model="postText"></textarea>
          <input id="reset" type="reset" value="Reset">
          <input type="submit" value="Create">
        </form>
      </div>
      <div class="post_buttons">
        <button>Post</button>
        <!-- <button id="delete-button">Delete</button> -->
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "create-post",
    data() {
      return {
        postText: '',
        //userId
      }
    },
    methods: {
      async handleSubmit() {
        const response = await axios.post('/post/create', {
          postText: this.postText,
          //userId from LocalStorage
        })
        console.log(response)
      }
    }
  };
</script>

<style>

  textarea {
    height: 130px;
    width: 97%;
    resize:none;
    font-size:14px;
    padding: 10px;
  }
  
  #reset {
    position: relative;
    top:14px;
    left:105px;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    border: 2px solid white;
    background: green;
    color: white;
    border-radius: 10px;
    font-size:14px
  }

  #reset:hover{
    border-color: aqua;
    transition: 0.8s;
  }
</style>

<style scoped>
  .post_content{
    min-height: 150px;
  }
</style>
