<template>
  <article>
     <section >
        <div class="create-post-form">
          <div class="profile-img"></div>
          <div class="nav-user">
            <button @click="newPost">Create post</button>
            <button>Unread</button>
            <button>My posts</button>
          </div>
        </div>
    </section>
    <section v-for="(post, index) in allPosts" v-bind:key="index">
      <div class="post">
        <div class="post_user">
          <div class="profile-img"></div>
          <div class="profile-name">posted by {{ post.userId }}</div>
          <div class="profile-name">written at {{ post.createdAt }}</div>
        </div>
        <div class="post_content">{{post.postText}}</div>
        <div class="post_buttons">
          <button>Comment</button>
          <button>Like</button>
          <button>Dislike</button>
          <button 
          v-if="post.userId == userLogged.id" 
          id="delete-button" 
          @click="deletePost(post.post_id)">
          Delete</button>
        </div>
      </div>
    </section> 
  </article>
</template>


<script>
  import axios from 'axios';

  export default {
    name: "Home-bar",

    data(){
      return {
        allPosts:[],
        userLogged: {
          id:'',
          firstName:'',
          lastName:''
        },
      }
    },

    methods: {
      newPost() {
        this.$router.push('home/create') 
      },

      async deletePost(postId){
        const url = `/post/all/${postId}`
        
        await axios.delete( url, { 
          headers : 
            { Authorization: 'Bearer ' + localStorage.getItem('token')}
          }).then((response) => {
            let res = JSON.parse(response.data)
            console.log(res)
            window.location.assign('/home');
          }).catch((error) => console.log(error.message))
      },

    },

    mounted() {
      //get all post from the DB --> if authorized show posts in user home page
      axios.get('/post/all', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        let posts = response.data;
        this.allPosts = posts
      }).catch(error => { console.log(error)});
      
      // user logged
      this.userLogged.id = localStorage.getItem('userId');
    }
  };
</script>

<style>

/* section {
  margin-top:30px;
} */

.create-post-form {
  display: block;
  border: 1px solid black;
  min-height: 80px;
  width: 80%;
  margin:auto;
  display:flex;
  border-radius: 10px;
}

.profile-img {
  border: 1px solid red;
  height: 60px;
  width: 60px;
  margin-left: 10px;
  margin-top:10px
}

.nav-user{
  /* border: 1px solid black; */
  min-height: 40px;
  width: 85%;
  margin-top:20px;
  margin-left: 20px;
}

button {
  margin-right: 10px;
  width: 200px;
  height: 40px;
  border: 2px solid white;
  background: green;
  color: white;
  border-radius: 10px;
  font-size:18px
}

button:hover{
  border-color: aqua;
  transition: 0.8s;
}

.post {
  border-radius: 10px;
  margin:auto;
  border: 1px solid black;
  min-height: 220px;
  width: 75%;
  padding: 15px
}

.post_user {
  border-radius: 10px;
  margin:auto;
  border: 1px solid black;
  height: 60px;
  display:flex
}

.post_user .profile-img {
  border: 1px solid black;
  height: 40px;
  width: 40px;
}

.profile-name {
  border: 1px solid black;
  height: 20px;
  width: 300px; /* max-width?? */
  margin:auto;
  margin-left:10px;
  margin-right:10px
}

.post_content {
  border-radius: 10px;
  margin:auto;
  border: 1px solid black;
  height: 150px;
  padding:10px
}

.post_buttons{
  display:flex;
  justify-content: center;
  border-radius: 10px;
  margin:auto;
  border: 1px solid black;
  min-height: 30px;
  padding:10px
}

.post_buttons button {
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: 2px solid white;
  background: green;
  color: white;
  border-radius: 10px;
  font-size:14px
}

.post_buttons button:hover {
  border-color: aqua;
  transition: 0.8s;
}

#delete-button{
  background: red;
}
   
</style>
