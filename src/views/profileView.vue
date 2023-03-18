<script>
  import BlogCardList from "../components/BlogCardList.vue";
  import { getAPI } from "../axios";
  import SavedModal from '../components/Modal.vue'
  import AddPost from '../components/AddPost.vue'

  export default {
    data() {
      return {
        username: '',
        slug: this.$route.params.slug.toString(),
        res: [],
        blogPosts: [],
        showModal: false,
        showBlog: false,
        showAddPost: false,
      };
    },
    methods: {
      showblog(){
          getAPI.get('/posts?user='+this.slug)
          .then(response => {
            this.blogPosts = response.data
          })
          .catch(err => {
            console.log(err)
          })
          this.showBlog = true;
          this.showAddPost = false;
       },
       showPost(){
          this.showBlog = false;
          this.showAddPost = true;
       }
    },
    created(){
      getAPI.get('/users/'+this.slug)
      .then(response => {
        this.res = response.data
      })
      .catch(err => {
        console.log(err)
      })
      this.showblog()
    },
    components: {
      BlogCardList, SavedModal, AddPost
    },
  }
</script>

<template>
    <main class="bas pb-6 mb-20 font-baseFamily mx-auto">
        <section class="py-4 max-w-4xl mx-auto w-full mb-12">
            <div><br><br>
                <div class="row">
                    <div class="col-md-12">
                        <p class="d-inline-block vv"><strong>EDITOR</strong><br></p>
                    </div>
                </div><br><br><br>
                <div class="container">
                    <div class="col1">
                        <img
                        :src='res.image'
                         class="lead bg-secondary d-inline-block">
                    </div>
                    <div class="col2">
                        <h1 style="font-size: 55px;">{{res.name}}</h1>
                        <span>{{blogPosts.length}} &nbsp;Articles Written</span><br><br>
                        <p v-if='res.bio'>{{res.bio}}<br></p>
                        <p v-else>No Bio</p>
                        <br><br>
                        <div class="save-btn">
                            <button class="savebtn" @click="showModal = true">Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <SavedModal v-show="showModal"  @close-modal="showModal = false"/>
            <br><br><br>
            <nav
              class="flex gap-4 py-2 mx-5 mb-8 border-b border-black dark:border-white overflow-y-auto scrollbar-hide"
            >
              <button
                @click="showblog()"
                :class="{
                  'text-blue-700 underline-offset-[10px] decoration-4 underline':
                    count == 1,
                }"
                class="font-bold"
              >
                Home
              </button>
              <button
                @click="showPost()"
                :class="{
                  'text-blue-700 underline-offset-[10px] decoration-4 underline':
                    count == 2,
                }"
                class="font-bold"
              >
                Create Post
              </button>
            </nav>
            <div class="px-5">
              <BlogCardList
                v-if="blogPosts"
                :posts="blogPosts"
                v-show="showBlog"
              />
            </div>
        </section>
        <AddPost v-show="showAddPost" />
    </main>
</template>

<!-- <script src="../assets/bootstrap.min.js"></script> -->
<style>
    .container{
        display: flex;
        justify-content: space-between;
    }
    .col1{
        width: 25%;
    }
    html.dark .col2{
        color: rgb(255, 255, 255);
        width: 72%;
    }
    .d-inline-block{
        display: inline-block;
    }
    html .col2{
        color: rgb(0, 0, 0);
        width: 72%;
    }

    html.dark .d-inline-block.vv{
        background: #fff;
        color: rgb(0,0,0);
        padding: 6px;
        padding-right: 23px;
        padding-left: 23px;
    }
    html .d-inline-block.vv{
        background: #000000;
        color: rgb(255,255,255);
        padding: 6px;
        padding-right: 23px;
        padding-left: 23px;
    }
    .bas{
        font-style: space-grotesk;
        font-weight: bold;
    }

    .savebtn{
        padding: 20px;
        padding-right: 86px;
        padding-left: 86px;
        border: 1px solid;
    }
</style>