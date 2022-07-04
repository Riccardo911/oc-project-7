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
            <div class="profile-name">by {{ post.User.firstName }} {{ post.User.lastName }}</div>
            <div class="profile-name">at {{ post.date }}</div>
          </div>
        </div>
        <!-- post content -->
          <!-- text -->
        <div class="post_content">{{ post.postText }}</div>
          <!-- image -->
        <div v-if="post.imageUrl != null" class="post_content"><img :src="post.imageUrl"></div>
        <!-- like -->
        <div v-for="(like, index) in allLikes" :key="index">
          <div class="like" v-if="post.post_id == like.postId">{{ like.n_like }} people like this post</div>
        </div>
        <!-- post buttons -->
        <div class="post_buttons">
          <button @click="toggleInput()">Comment</button>
          <button @click="likes(post.post_id)">Like</button>
          <button v-if="post.userId == user">
            Update</button>
          <button v-if="post.userId == user" id="delete-button" @click="deletePost(post.post_id)">
            Delete</button>
        </div> 
      </div>
      <!-- comment input -->
      <div class="commentInput" v-if="comment.showInput == true">
        <textarea placeholder="Write some text..." v-model="comment.comText"></textarea>
        <button @click="postComment(post.post_id)">Post</button>
        <button @click="resetComment()">Reset</button>
      </div>
      <!-- comments -->
      <div class="comments" v-for="(comment, index) in post.Comments" :key="index">
          <div class="post_user">
            <div class="profile-img-post">
              <img src="../images/default_user_icon.jpg">
            </div>
            <div>
              <div class="profile-name">by {{ comment.User.firstName }} {{ comment.User.lastName }}</div>
              <div class="profile-name">at {{ comment.comCreatedAt }}</div>
            </div>
          </div>
          
          <div class="comment-content" >{{ comment.comText }}</div>
          <div class="post_buttons">
            <button v-if="comment.userId == user">
              Update</button>
            <button v-if="comment.userId == user" id="delete-button" @click="deletePost(post.post_id)">
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
    data() {
      return {
        user: null,
        allPosts: [],
        allLikes: [],
        comment: {
          showInput: false,
          comText:'',
          postId:'',
          userId:'',
        },
        like:{
          postId:'',
          userId:'',
          liked: false
        },
      };
    },

    methods: {
        /////////////////////////////////////////////////////////////////////
        // user likes a post
        async likes(postId) {
          this.like.postId = postId;
          this.like.userId = this.user;
          if(this.like.liked == false ){
          const url = `api/post/like/all/${postId}`;
          await axios.post(url, {
            userId: this.like.userId,
          }, 
          { headers: {
            Authorization: "Bearer " + localStorage.getItem("token")}
          }).then(response => {
            console.log(response);
            this.like.liked = true;
            window.location.reload();
          }).catch(error => {
            console.log(error);
            this.like.liked = false;
          });
          }
        },
      /////////////////////////////////////////////////////////////////////
      // user comment - post
      async postComment(postId) {
        if (this.comment.comText == '') {
          alert('Please write some text!')
        } else {
          this.comment.postId = postId
          let comText = this.comment.comText
          let userId = localStorage.userId
          let data = {postId, comText, userId }

          axios.post('/api/post/comment/create', data,{
            headers : {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response);
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
        }
      },

      /////////////////////////////////////////////////////////////////////
      // toggle comment input
        toggleInput() {
        this.comment.showInput = !this.comment.showInput
        },
      /////////////////////////////////////////////////////////////////////
      // reset comment input
        resetComment() {
          this.comment.comText = ''
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
      /////////////////////////////////////////////////////////////////////
      //get all posts from the DB --> if authorized show posts in user home page
      await axios.get("/post/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
          }
      }).then(response => {
        let posts = response.data;
        this.allPosts = posts;
      }).catch(error => (console.log(error)));
      // user logged - store userId in LocalStorage
      this.user = localStorage.getItem("userId");

      /////////////////////////////////////////////////////////////////////
      // get all likes
      await axios.get("api/post/like/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        let likes = response.data;
        this.allLikes = likes;
      }).catch(error => (console.log(error)));
    },
};
</script>

<style>

.like {
  font-weight: lighter;
  font-size: large;
  font-style: italic;
  display:flex;
  justify-content: flex-end;
  padding-right: 15px;
}

.commentInput {
  width: 51%;
  min-height: 80px;
  margin:auto;
  margin-top:20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:10px;
  max-width: 1200px;
}

.comments {
  min-height: 80px;
  width: 50%;
  margin:auto;
  margin-top:20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:15px;
  max-width: 1200px;
}

.comment-content {
  min-height:50px;
  padding:10px;
  font-weight: lighter;
  font-size: large;
}

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

.create-post-form button {
  margin-left: 10px;
  margin-right: 10px;
  width: 200px;
  height: 40px;
  border: 2px solid white;
  color: white;
  border-radius: 10px;
  font-size:large;
  font-weight: lighter;
}

.create-post-form button:active {
  background:rgb(1, 49, 1);
  opacity: 0.95;
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

button:hover{
  border-color: aqua;
  transition: 0.9s;
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
  min-height: 60px;
  display:flex;
  justify-content: space-between;
  overflow: hidden;
  font-style: italic;
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
  min-height: 40px;
  padding:10px;
  overflow-wrap: break-word;
  font-size:large;
  font-weight: lighter;
  text-align: justify;
}

.post_content img{
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
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

button:hover {
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
