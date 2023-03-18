<template>
    <div class="modal-overlay">
        <div class="modal">
        <!-- <img class="check" src="../assets/check-icon.png" alt="" /> -->
        <form @submit.prevent="UpdateForm">
            <div class="container">
                <div class="col1">
                    <input type="file" @change="changeimage" name="img" accept="image/*">
                </div>
                <div class="col2">
                    <input class="an" type="email" v-model="email" placeholder="Email">
                    <br><br>
                    <input class="an" type="text" v-model="name" placeholder="Author Name">
                    <br><br>
                    <textarea
                        class="an"
                        v-model="newBio"
                        placeholder="Bio..."
                        cols="23"
                    />
                    <button class="sb">Update</button>
                    <br><br>
                    {{mssg}}
                </div>
            </div>
        </form>
        </div>
        <div class="close" @click="$emit('close-modal')">
            X
        </div>
    </div>
</template>

<script>
    import { getAPI } from "../axios";
    export default {
        data() {
            return {
                slug: this.$route.params.slug.toString(),
                file: '',
                email: '',
                name: '',
                newBio: '',
                mssg: '',
            };
        },
        methods: {
            changeimage(e) {
                let file = e.target.files[0];
                this.file = file;
            },
            UpdateForm(){
                let data = new FormData();
                data.append('image', this.file);
                data.append('email', this.email);
                data.append('name', this.name);
                data.append('bio', this.newBio);
                getAPI.patch('/users/'+this.slug, data)
                .then(response => {
                    this.success = true
                    this.mssg = 'Updated'
                    this.$router.go()
                })
                    .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .an{
        padding: 5%;
        border-radius: 0px;
        border: 1px solid;
    }
    .container{
        display: flex;
        justify-content: space-between;
    }
    .col1{
        width: 25%;
    }
    html.dark .col2{
        color: rgb(255, 255, 255);
        width: 70%;
    }
    .d-inline-block{
        display: inline-block;
    }
    html .col2{
        color: rgb(0, 0, 0);
        width: 70%;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      background-color: #000000da;
    }
    
    .modal {
      text-align: center;
      background-color: white;
      height: 60%;
      width: 50%;
      margin-top: 10%;
      padding: 5%;
      border-radius: 20px;
    }
    .close {
      margin: 10% 0 0 16px;
      cursor: pointer;
    }
    html .close {
      color: #fff;
    }
    
    .check {
      width: 150px;
    }
    
    h6 {
      font-weight: 500;
      font-size: 28px;
      margin: 20px 0;
    }
    
    p {
      font-size: 16px;
      margin: 20px 0;
    }
    
    html .sb {
        padding: 20px;
        padding-right: 86px;
        padding-left: 86px;
        border: 1px solid;
        background-color: #000;
        color: #fff;
    }
    html.dark .modal {
        background-color: black;
    }
</style>