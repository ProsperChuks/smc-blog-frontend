<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import { getAPI } from "../axios";
    export default {
        components: {
            ckeditor: CKEditor.component
        },
        data() {
            return {
                editor: ClassicEditor,
                categorySel: {
                    selected: [],
                    autocompleteItems: this.categoriesItem,
                },
                file: '',
                title: '',
                editorData: '',
                summary: '',
                editorpost: '',
            };
        },
        created() {
            getAPI.get('/categories')
            .then(response => {
                this.categorySel.autocompleteItems = response.data
            })
                .catch(err => {
                console.log(err)
            })
        },
        methods: {
            Changeimage(e) {
                let file = e.target.files[0];
                this.file = file;
            },
            postForm(){
                let data = new FormData();
                data.append('title', this.title);
                data.append('picked', this.editorpost);
                data.append('summary', this.summary);
                data.append('body', this.editorData);
                data.append('mainImage', this.file);
                data.append('slug', this.title.split(' ').join('').toLowerCase());
                console.log({title: this.title, picked: this.editorpost, summary: this.summary, body: this.editorData, mainImage: this.file, slug: this.title.split(' ').join('').toLowerCase()});

                getAPI.post('/posts',{title: this.title, picked: this.editorpost, summary: this.summary, body: this.editorData, mainImage: this.file, slug: this.title.split(' ').join('').toLowerCase()}, {headers: {
                                'Authorization': `token 6e8cf68a4fc854801686530dcd0ec256e39a9e43`
                            },} )
                .then(response => {
                    this.success = true
                    this.$router.go()
                })
                .catch(err => {
                     console.log(err)
                })
            }
        },
    }
</script>

<template>
    <main class="bas pb-6 mb-20 font-baseFamily mx-auto">
        <center class="py-4 max-w-4xl mx-auto w-full mb-12">
            <form method="post" @submit.prevent="postForm">
                <label class="file">
                    <input type="file" @change="Changeimage" required class="filecustom" accept="image/*">
                    <span class="file-custom"></span>
                </label>
                <br><br>
                <div class="container">
                    <div class="col1">
                        <label class="category">Title<br><br>
                            <input class="an" type="text" required v-model="title" />
                        </label>
                    </div>
                </div>
                <br><br>
                <label class="editor">
                    Article
                    <ckeditor required :editor="editor" v-model="editorData"/>
                </label>
                <br><br>
                <label class="editor">
                    <textarea
                    class="an"
                    required
                    v-model="summary"
                    placeholder="Summary..."
                    cols="66"
                    />
                </label>
                <br><br>
                <div class="container">
                    <div class="col1">
                        <label class="category">Assign Article to a Category<br><br>
                            <select class="classic"
                            v-model="categorySel.selected"
                            required id="dropDown">
                                <option>Select here</option>
                                <option v-for="choice in categorySel.autocompleteItems"
                                :key="choice.slug"
                                :value="choice.slug"
                                :label="choice.cat_title">
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="col2">
                        <label for="editorpost">Mark as an Editor Post</label><br><br>
                        <label class="toggler-wrapper style-3">
                            <input type="checkbox" name='editor' v-model="editorpost">
                            <div class="toggler-slider">
                              <div class="toggler-knob"></div>
                            </div>
                          </label>
                        <br><br>
                    </div>
                </div>
                <button class="sb">Post</button>
            </form>
        </center>
    </main>
</template>

<style>
    @charset "UTF-8";
    .toggler-wrapper {
    display: block;
    width: 45px;
    height: 25px;
    cursor: pointer;
    position: relative;
    }

    .toggler-wrapper input[type="checkbox"] {
    display: none;
    }

    .toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
    background-color: #44cc66;
    }

    .toggler-wrapper .toggler-slider {
    background-color: #ccc;
    position: absolute;
    border-radius: 100px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
    }

    .toggler-wrapper .toggler-knob {
    position: absolute;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
    }
    .toggler-wrapper.style-3 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
    left: calc(100% - 19px - 3px);
    }

    .toggler-wrapper.style-3 .toggler-knob {
    width: calc(25px + 6px);
    height: calc(25px + 6px);
    border-radius: 50%;
    left: -3px;
    top: -3px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
    box-shadow: 0 2px 6px rgba(153, 153, 153, 0.75);
    }
    select {

    /* styling */
    background-color: white;
    border: thin solid #63636964;
    border-radius: 4px;
    display: inline-block;
    font: inherit;
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;

    /* reset */

    margin: 0;      
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    }


    /* arrows */

    select.classic {
    background-image:
    linear-gradient(45deg, transparent 50%, #63636964 50%),
    linear-gradient(135deg, #63636964 50%, transparent 50%),
    linear-gradient(to right, #63636964, skyblue);
    background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
    background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
    background-repeat: no-repeat;
    }

    select.classic:focus {
    background-image:
    linear-gradient(45deg, white 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, white 50%),
    linear-gradient(to right, gray, gray);
    background-position:
    calc(100% - 15px) 1em,
    calc(100% - 20px) 1em,
    100% 0;
    background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
    background-repeat: no-repeat;
    border-color: grey;
    outline: 0;
    }
    .container{
        display: flex;
        justify-content: space-between;
    }
    .col1{
        width: 50%;
    }
    html.dark .col2{
        color: rgb(255, 255, 255);
        width: 50%;
    }
    .d-inline-block{
        display: inline-block;
    }
    html .col2{
        color: rgb(0, 0, 0);
        width: 50%;
    }
    .an{
        padding: 3%;
        border-radius: 0px;
        border: 1px solid;
    }
    html .sb {
        padding: 20px;
        padding-right: 100px;
        padding-left: 100px;
        border: 1px solid;
        background-color: #000;
        color: #fff;
    }
    .filecustom{
        background-color:#ededed;
        padding: 10%;
        padding-right: 15%;
        padding-left: 15%;
        border: 3px dashed;
    }

    .filecustom::-webkit-file-upload-button {
       visibility: hidden;
    }
    .filecustom::before {
        content: 'Upload Article Primary Image';
        display: inline-block;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        font-size: 10pt;
    }
    
</style>