<script>
    import { getAPI } from "../axios";
    export default {
    data() {
      return {
        comment: [],
        slg: this.$route.params.slug.toString(),
      };
    },
    created() {
      getAPI.get('/comment?post='+this.slg,)
      .then(response => {
        console.log('post API has received data')
        this.comment = response.data
        console.log(this.comment)
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      del(id){
        getAPI.delete('/comment/'+id)
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

<template>
    <div style="display: block; margin: 15px;" v-if="!comment || !comment.length">
        <center><b>Be the first to comment.</b></center>
    </div>
    <div class="comment" v-else>
        <b>{{ comment.length }} Comments</b>
        <div v-for="comments in comment"
        :key="comments.id">
            <hr>
            <br><br>
            <div class="comment__flex">
                <div class="container">
                    <div class="avatar col">
                        <div class="user user--refresh">
                            <div>{{ comments.name[0] }}</div>
                        </div>
                    </div>
                    <div class="col2">
                        <b>{{ comments.name }}</b>
                        <br>
                        <p><span class="tm"> {{ comments.created_on }} </span></p><br>
                        <div class="bx"> {{ comments.body }} </div>
                        <div class="comment__flex-btn">
                            <form method="delete" @submit.prevent="del(comments.id)">
                                <button class="del">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .container{
        display: flex;
        justify-content: space-between;
    }
    .col1{
        width: 5%;
    }
    .col2{
        color: #ffffff99;
        width: 92%;
    }
    .avatar .user--refresh {
        color: #000;
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 1.2;
        display: flex;
        align-items: center;
        width: 52px;
        height: 52px;
        border-radius: 16px;
        justify-content: center;
    }
    .avatar .user {
        position: relative;
        z-index: 100;
        background: #dbdfe4;
        padding: 0;
    }

    .bx{
        display: block;
        line-height: 21px;
        overflow-wrap: break-word;
        font-weight: 400;
        font-style: normal;
        font-size: 100%;
        color: #fff;
    }
    .tm{
        color: #dbdfe4;
        font-size: 80%;
    }
    .comment__flex{
        font-size: 0.9em;
    }

    .comment__flex-btn{
        font-size: 80%;
        margin-left: 5px;
        color: #0086e3;
    }
</style>
