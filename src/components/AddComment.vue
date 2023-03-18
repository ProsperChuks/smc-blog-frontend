<template>
  <div class="form">
    <form method="post" @submit.prevent="commentForm">
      <div class="form__group">
        <label>Leave a comment</label>
        <textarea
          v-model="newComment"
          required
          placeholder="Type in your comment..."
        />
        <center>
          <input type="text" v-model="newName" placeholder="Name*" required>
          <input type="email" v-model="newMail" placeholder="Email">
        </center>
        <br>
        <button>Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { getAPI } from "../axios";

  export default {
    data() {
      return {
        newComment: '',
        newName: '',
        newMail: '',
        success: null,
        slg: this.$route.params.slug.toString(),
      };
    },
    methods: {
      commentForm(){
        getAPI.post('/comment', {name: this.newName, email: this.email, body: this.newComment, post: this.slg})
        .then(response => {
          this.success = true
          this.$router.go()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  };
</script>

<style scoped>
  .form {
    font-size: 0.9em;
    margin-top: 1.5em;
  }
  
  label {
    display: block;
    margin-bottom: 1em;
    font-weight: 700;
  }

  input{
    width: 40%;
    margin: 15px;
    padding: 6px;
    color: #000;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid black;
  }
  
  textarea {
    width: 100%;
    color: #000;
    margin-top: 0.5em;
    padding: 15px;
    border: 1px solid black;
    border-radius: 15px;
  }
  
  button {
    border: unset;
    background: #0086e3;
    font-weight: 700;
    border-radius: 15px;
    padding: 0.5em 1.7em;
    margin-top: 1em;
  }
</style>