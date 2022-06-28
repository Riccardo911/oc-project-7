<template>
  <article>
     <section v-if="user" class="sticky">
        <div class="create-post-form">
          <div class="profile-img">
            <img src="../images/default_user_icon.jpg">
          </div>
          <div class="nav-user">
            <button @click="newPost">Create post</button>
            <button @click="getPosts()">All posts</button>
            <button>Unread</button>
            <button @click="myPosts()">My posts</button>
          </div>
        </div>
    </section>
    <section v-for="(post, index) in allPosts" :key="index">
      <div class="post">
        <div class="post_user">
          <div class="profile-img-post">
            <img src="../images/default_user_icon.jpg">
          </div>
          <div>
            <div class="profile-name">by {{ post.User.firstName}} {{post.User.lastName}}</div>
            <div class="profile-name">at {{ post.date }}</div>
          </div>
        </div>
        <div class="post_content">{{post.postText}}</div>
        <div class="post_buttons">
          <div></div>
          <button>Comment</button>
          <button @click="like(post.post_id)">Like</button>
          <button>Dislike</button>
          <button
          v-if="post.userId == user">
          Update</button>
          <button 
          v-if="post.userId == user" 
          id="delete-button" 
          @click="deletePost(post.post_id)">
          Delete</button>
        </div>
        <!-- <div v:bind="user">{{user}}</div> -->
      </div>
    </section> 
  </article>
</template>


<script>
  import axios from 'axios';

  export default {
    name: "Home-bar",
    data() {
      return {
        user: null,
        allPosts: [],
        allLike: [],
        allComment: [],
        dataLike: {
          // totalLikes:'',
          userId: "",
          postId: "",
          // liked: false
        },
        dataLikeString: ""
      };
    },
    methods: {
        /////////////////////////////////////////////////////////////////////
        async like(postId) {
            this.dataLike.postId = postId;
            this.dataLike.userId = this.user;
            // this.dataLikeString = JSON.stringify(this.dataLike)
            const url = `/post/all/${postId}/like`;
            await axios.post(url, {
                userId: parseInt(this.dataLike.userId),
                postId: this.dataLike.postId
            }, { headers: {
                    // 'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        },
        /////////////////////////////////////////////////////////////////////
        async getPosts() {
            const url = `/post/all/`;
            await axios.get(url, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }).then(response => {
                let posts = response.data;
                this.allPosts = posts;
            }).catch(error => { console.log(error) });
        },
        /////////////////////////////////////////////////////////////////////
        async myPosts() {
            const user = localStorage.userId
            const url = `/post/all/${user}`;
            await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                let posts = response.data;
                this.allPosts = posts;
            }).catch(error => { console.log(error)});
        },
        /////////////////////////////////////////////////////////////////////
        newPost() {
            this.$router.push("home/create");
        },
        /////////////////////////////////////////////////////////////////////
        async deletePost(postId) {
            const url = `/post/all/${postId}`;
            //  TODO  : alert 'You want to delete the post?'
            //        if true -->   DELETE REQUEST
            await axios.delete(url, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }).then((response) => {
                let res = JSON.parse(response.data);
                console.log(res);
                window.location.assign("/home");
            }).catch((error) => console.log(error.message));
        },
        /////////////////////////////////////////////////////////////////////
    },
    async mounted() {
        //get all post from the DB --> if authorized show posts in user home page
        await axios.get("/post/all", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            let posts = response.data;
            this.allPosts = posts;
        }).catch(error => (console.log(error)));
        // user logged
        this.user = localStorage.getItem("userId");
        /////////////////////////////////////////////////////////////////////
        
    },
};
</script>

<style>

.sticky {
  position: sticky;
  top: 65px;
}

.create-post-form {
  /* display: block; */
  min-height: 80px;
  width: 80%;
  margin:auto;
  display:flex;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #333;
  padding:10px;
  max-width: 1200px;
}

.profile-img {
  
  height: 60px;
  width: 60px;
  margin:auto
}

.profile-img img {
  height: 60px;
  object-fit: contain
}

.profile-img-post img {
  height: 40px;
  object-fit: contain
}

.nav-user{
  min-height: 40px;
  width: 85%;
  margin: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  margin-left: 10px;
  margin-right: 10px;
  width: 200px;
  height: 40px;
  border: 2px solid white;
  background: green;
  color: white;
  border-radius: 10px;
  font-size:large;
  font-weight: lighter;
}

button:hover{
  border-color: aqua;
  transition: 0.9s;
}
button:active {
  background:rgb(1, 49, 1);
  opacity: 0.95;
}

.post {
  border-radius: 10px;
  margin:auto;
  min-height: 220px;
  width: 75%;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.post_user {
  border-radius: 10px;
  margin:auto;
  /* border: 1px solid black; */
  min-height: 60px;
  display:flex;
  justify-content: space-between;
  overflow: hidden;
}

.post_user .profile-img-post {
  height: 40px;
  min-width: 40px;
  margin-left: 10px;
  margin-top:10px

}

.profile-name {
  /* border: 1px solid black; */
  height: 28px;
  min-width: 170px;
  margin:auto;
  margin-left:10px;
  margin-right:10px;
  font-size:large;
  font-weight: lighter;
}

.post_content {
  border-radius: 10px;
  margin:auto;
  /* border: 1px solid black; */
  min-height: 150px;
  padding:10px;
  overflow-wrap: break-word;
  font-size:large;
  font-weight: lighter;
  text-align: justify;
}

.post_buttons{
  display:flex;
  justify-content: center;
  border-radius: 10px;
  margin:auto;
  /* border: 1px solid black; */
  min-height: 30px;
  padding:10px
}

.post_buttons button {
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: 2px solid white;
  background: #333;
  color: white;
  border-radius: 10px;
  font-size:large;
  font-weight: lighter;
}

.post_buttons button:hover {
  border-color: #333;
  transition: 0.8s;
  background-color: green;
}

#delete-button{
  background: #333;
}

#delete-button:hover{
  background: rgb(232, 3, 3);
  /* color:black; */
  border-color: #333;
  transition: 0.4s;
  font-weight:bold;
}

@media only screen and (max-width: 1252px) {
  button {
    margin-top:10px
  }
}

@media only screen and (max-width: 768px) {
  .post_buttons {
    display:block;
  }
  
}

@media only screen and (max-width: 660px) {
  .create-post-form {
    text-align: center
  }
  .nav-user{
    display: block;
  }
}

@media only screen and (max-width: 487px) {
  .post_buttons {
    text-align: inherit;
  }
}

@media only screen and (max-width: 370px) {
  .post_buttons {
    text-align: inherit;
  }

  button {
    width:120px;
  }
}

@media only screen and (max-width: 339px) {
  .post_buttons {
    text-align: center;
  }
}
   
</style>
