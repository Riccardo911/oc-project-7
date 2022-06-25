<template>
  <section>
    <div class="post">
      <div class="post_content">
        <form @submit.prevent="createPost">
          <textarea type="text" name="text" col="5" placeholder="Write some text..." required v-model="post.postText"></textarea>
          <input  type="file" name="img" id="imgInput" accept="image/png, image/jpeg">
        </form>
      </div>
      <div class="post_buttons">
        <button @click="createPost()">Post</button>
        <button @click="resetPost()">Reset</button>
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
        post:{
          postText:'',
          userId: localStorage.userId
        },
        postSting:''
      }
    },
    methods: {

      ////////////////////////////////////////////////////////////
      async createPost() {
        if (this.post.postText == '') {
          alert('Please write some text or add image!')
        } else {
          this.postSting = JSON.stringify(this.post);
          await axios.post('post/create', this.postSting, {
            headers : {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response => {
            let post = JSON.parse(response.data)
            console.log(post)
          }).catch(error => {
            console.log(error)
          })  
        }
      },

      ////////////////////////////////////////////////////////////
      resetPost() {
          this.post.postText = ''
        },

      ////////////////////////////////////////////////////////////
      



    }
  }
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

  #imgInput {
    position: relative;
    top:10px;
    left:0px;
  }
</style>

<style scoped>
  .post_content{
    min-height: 150px;
  }

  .post_buttons {
    margin-top: 50px
  }
</style>
