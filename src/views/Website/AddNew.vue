<template>
    <div>

        <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <v-btn icon class="mr-4" @click="$router.go(-1)">
                    <v-icon size="28" color="grey darken-3">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="text-uppercase font-weight-bold">Add New Website</div>
                <v-spacer></v-spacer>
                <v-btn rounded-md dark class="grey darken-4 text-capitalize" @click="createWebsite">Save</v-btn>
            </v-toolbar>

            <v-row>
                <v-col>
                    <v-card class="pa-3 rounded-lg">
                        <v-card-title>Website Details</v-card-title>
                        <v-card class="pa-4" flat>
                            <label class="grey--text text--darken-1">Project Name</label>
                            <v-text-field solo v-model="website.title"></v-text-field>

                            <label class="grey--text text--darken-1">Select Builder</label>
                            <select class="select-field" v-model="website.promoter_id">
                                <option selected disabled>Select Builder</option>
                                <option class="grey--text" v-for="promotor in promotors" :key="promotor.id" :value="promotor.id">
                                    {{promotor.name}}
                                </option>
                            </select>
                            
                            <label class="grey--text text--darken-1">About Project</label>
                            <v-textarea v-model="website.about" solo></v-textarea>

                            <label class="grey--text text--darken-1">Walkthrough</label>
                            <v-text-field solo v-model="website.walkthrough"></v-text-field>

                            <label class="grey--text text--darken-1">Map Location</label>
                            <v-text-field solo v-model="website.map" clearable></v-text-field>
                            <!-- <iframe :src="`${ytUrl}IzDbhbwrd_0`" frameborder="0" width="100%" height="400"></iframe> -->
                            
                        </v-card>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="pa-3 rounded-lg" min-height="400">
                        <v-toolbar dense class="" flat>
                            <v-toolbar-title>Image Gallery</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <label for="gallery" class="cursor-pointer flex items-center gap-2">
                                    <v-icon size="38">mdi-plus-circle</v-icon>
                                    <input type="file" multiple hidden ref="files" id="gallery" @change="updateImageList">
                                </label>
                            </v-btn>
                        </v-toolbar>

                        <v-card-text>
                            <v-row>
                                <v-col 
                                    v-for="(preview, index) in previewImage" :key="index" 
                                    class="d-flex child-flex" cols="3"
                                >
                                    <v-img
                                        :src="preview.src"
                                        id="image-preview"
                                        aspect-ratio="1"
                                        class="rounded-lg align-end"
                                    >
                                        <v-btn icon @click="setFeatured(preview)"><v-icon>mdi-star</v-icon></v-btn>
                                        <v-btn icon @click="clearImage(index)"><v-icon>mdi-delete</v-icon></v-btn>
                                    </v-img>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-card>

    </div>
</template>

<script>
import Website from '../../Apis/Website'
import User from '../../Apis/User'

export default {
    data () {
      return {
        website: {
            title: '',
            map: '',
            walkthrough: '',
            about: '',
            promoter_id : null,
            agent_id: null,
            type: 'agent',
            images: [],
        },
        imageType:{ "featured" : "Featured", "gallery" : "Gallery", "floor" : "Floor Plans", "construction" : "Construction Updates"},
        promotors: [],
        previewImage: [],
        ytUrl: 'https://www.youtube.com/embed/'
      }
    },
    methods: {
        updateImageList(){
            var selectedFiles = this.$refs.files.files;
            // for preview
            for (let i = 0; i < selectedFiles.length; i++) {
                let img = {
                    src: URL.createObjectURL(selectedFiles[i]),
                    file: selectedFiles[i]
                }
                this.previewImage.push(img);
            }
            // for post data to server
            for (let index = 0; index < selectedFiles.length; index++) {
                this.website.images.push(selectedFiles[index]);
            }
        },
        createWebsite(e){
            e.preventDefault();
            let formData = new FormData();

            formData.append('title', this.website.title);
            formData.append('map', this.website.map)
            formData.append('walkthrough', this.website.walkthrough)
            formData.append('about', this.website.about)
            formData.append('promoter_id', this.website.promoter_id)
            formData.append('agent_id', this.website.agent_id)
            formData.append('type', this.website.type)

            for (let i = 0; i < this.website.images.length; i++) {
                let file = this.form.images[i];
                formData.append('files[' + i + ']', file);
            }
            // for (let i = 0; i < this.caption.length; i++) {
            //     let caption = this.caption[i];
            //     var imgType = JSON.stringify(caption);
            //     formData.append('imageType[' + i + ']', imgType);
            // }

            const config = {
                headers:{"content-type" : "multipart/form-data"}
            }

            // for (var pair of formData.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Website.new(formData,config)
            .then((response) => {
                this.form.images = [];
                console.log('success saved:', response);
            })
            .catch(error => {
                console.log(error);
            });  

        },
        setFeatured(preview){
            var previews = this.previewImage;
            previews.unshift(preview);
            previews.pop(preview);
        },
        onGalleryChange(event){
            var imageData = event.target.files[0];
            this.image = imageData;

            var selectedFiles = document.getElementById('gallery').files;
            for (let i = 0; i < selectedFiles.length; i++) {
                this.images.push({
                    "name" : selectedFiles[i].name,
                    "url" : URL.createObjectURL(selectedFiles[i]),
                    "file" : selectedFiles[i],
                })
            }
            document.getElementById('image-preview').src = this.image_preview();
        },
        image_preview(){
            var picture = "";
            this.images.forEach((i) => {
                picture += i.url
            })
            return picture;
        },
        clearImage(index){
            this.previewImage.splice(index);
        },
        saveImages(){
            let imageData = new FormData();
            let file = this.gallery;

            imageData.append('website_id', this.website_id)
            imageData.append('type', this.imageType)
            imageData.append('file', file)

            Website.gallery(imageData)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            }); 
        },
    },
    created(){
        Website.builders().then(response => {
            this.promotors = response.data;
        });
        User.auth().then(response => {
            this.website.agent_id = response.data.id;
        });
    },
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.input-field{
  border-radius: 6px;
  padding: 0.7em 1em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  background: #f5f5f5;
  outline: none;
  margin-bottom: 1.5em;
}
.select-field{
    border-radius: 6px;
    padding: 0.8em 1em;
    font-size: 15px;
    width: 100%;
    /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
    background: #ffffff;
    outline: none;
    margin-bottom: 2em;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>