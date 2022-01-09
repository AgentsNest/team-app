<template>
    <div>

        <v-row>
            <v-col md="8" cols="12">
                <v-card class="rounded-xl pa-md-5  shadow content-card" height="88vh" elevation="0">
                    <v-toolbar flat class="mt-2">
                        <v-btn @click="$router.go(-1)" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
                        <div>Back</div>
                    </v-toolbar>

                    <v-card-text>
                        <v-autocomplete
                            v-model="form.states"
                            :items="stateData"
                            clearable
                            deletable-chips
                            multiple
                            small-chips
                            solo class="rounded-lg"
                            label="Select State"
                        ></v-autocomplete>

                        <v-select :items="audience" v-model="form.audience" label="All Economy Profile" solo class="rounded-lg"></v-select>
                        <v-row>
                            <v-col>
                                <label>Min Age</label>
                                <v-select :items="minAge" v-model="form.minAge" label="Min age" solo class="rounded-lg"></v-select>
                            </v-col>
                            <v-col>
                                <label>Max Age</label>
                                <v-select :items="maxAge" v-model="form.maxAge" label="Max age" solo class="rounded-lg"></v-select>
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <v-col>
                                <label>Start Date</label>
                                <v-text-field solo class="rounded-lg" type="date" v-model="form.startdate"></v-text-field>
                            </v-col>
                            <v-col>
                                <label>Start Time</label>
                                <v-text-field label="Start Time" solo class="rounded-lg" type="time" v-model="form.starttime"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <v-col>
                                <label>Select Gender</label>
                                <v-select :items="gender" v-model="form.gender" label="Select Gender" solo class="rounded-lg"></v-select>
                            </v-col>
                            <v-col>
                                <label>Ad Duration</label>
                                <v-text-field label="Duration" v-model="form.duration" suffix="Days" solo class="rounded-lg"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <v-col>
                                <label>Select Platform</label>
                                <v-select :items="platform" v-model="form.platform" label="Select Platform" solo class="rounded-lg"></v-select>
                            </v-col>
                            <v-col>
                                <label>Select Objectives</label>
                                <v-select :items="objectives" v-model="form.objectives" label="Objectives" solo class="rounded-lg"></v-select>
                            </v-col>
                        </v-row>

                        <v-row class="my-0">
                            <v-col>
                                <label>Budget</label>
                                <v-select :items="budget" v-model="amount" label="Select Budget" solo class="rounded-lg"></v-select>
                            </v-col>
                            <v-col>
                                <label>GST(18%)</label>
                                <v-text-field solo 
                                    class="rounded-lg" type="text" 
                                    v-model="gstAmount"
                                    hint="gst, hbshbsh bsbh "
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <div v-if="total">
                            <label>Total Budget</label>
                            <v-text-field solo class="rounded-lg" type="text" v-model="total"></v-text-field>
                        </div>

                        

                        <label>Ad Heading</label>
                        <v-text-field label="Ad heading" v-model="form.heading" placeholder="Ad heading" solo class="rounded-lg"></v-text-field>
                        <label>Ad Description</label>
                        <v-textarea label="Ad description" v-model="form.description" solo class="rounded-lg"></v-textarea>

                        <div class="mb-4">    
                            <v-btn-toggle
                                v-model="toggle_exclusive"
                                rounded-lg
                                block
                            >
                                <v-btn>
                                    <label for="singleImage">
                                        Single Image
                                        <input type="radio" v-model="x" value="one" id="singleImage" hidden>
                                    </label>
                                </v-btn>
                                <v-btn>
                                    <label for="multipleImage">
                                        Slideshow
                                        <input type="radio" v-model="x" value="two" id="multipleImage" hidden>
                                    </label>
                                </v-btn>
                                <v-btn>
                                    <label for="video">
                                        Video
                                        <input type="radio" v-model="x" value="three" id="video" hidden>
                                    </label>
                                </v-btn>
                            </v-btn-toggle>
                        </div>
                        
                        <div class="mt-4">
                            <div v-show="x === 'one'">
                                <label class="imageUploaderDiv singleImage">
                                    <v-icon left>mdi-tray-arrow-up</v-icon>
                                    Upload Single Image
                                    <input type="file" accept="image/*" @change="onSingleImageUpload" name="singleImage" hidden>
                                </label>
                            </div>
                            <div v-show="x === 'two'">
                                <!-- <label class="imageUploaderDiv slideShow">
                                    <v-icon left>mdi-tray-arrow-up</v-icon>
                                    Upload Multiple Image
                                    <input type="file" accept="image/*" multiple @change="onMultipleImageUpload" name="slideShow" hidden>
                                </label> -->
                                <input type="file" accept="image/*" multiple @change="onMultipleImageUpload" name="slideShow">
                            </div>
                            <div v-show="x === 'three'">
                                <label class="imageUploaderDiv video">
                                    <v-icon left>mdi-tray-arrow-up</v-icon>
                                    Upload Video
                                    <input type="file" accept="video/*" @change="onVideoUpload" name="video" hidden>
                                </label>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-text>
                        <v-btn class="text-capitalize mb-2" @click="preview = !preview" outlined block large>Preview</v-btn>
                        <v-btn class="text-capitalize grey darken-4" dark block large @click="placeAd">Save Ad</v-btn>
                    </v-card-text>

                </v-card>

                <v-dialog
                    v-model="preview"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                >
                    <v-card>
                        <v-toolbar flat>
                            <v-toolbar-title>Preview</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="preview = false"><v-icon>mdi-close</v-icon></v-btn>
                        </v-toolbar>
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <img src="https://randomuser.me/api/portraits/women/81.jpg">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>Jane Smith</v-list-item-title>
                                <v-list-item-subtitle>Sponsored</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-title>{{form.heading}}</v-card-title>
                        <v-card-subtitle>{{form.description}}</v-card-subtitle>
                        <v-card-text>
                            <v-img
                                :src="singleImagePreview"
                                height="250px"
                                v-if="singleImagePreview"
                            ></v-img>
                            <v-carousel
                                cycle
                                height="400"
                                hide-delimiter-background
                                show-arrows-on-hover
                                v-if="multipleImagePreview.length"
                            >
                                <v-carousel-item
                                    v-for="(item,i) in multipleImagePreview"
                                    :key="i"
                                    :src="item.url"
                                ></v-carousel-item>
                            </v-carousel>
                            <video 
                                v-show="videoPreview"
                                id="video-preview" controls
                                width="100%"
                            ></video>
                        </v-card-text>
                    </v-card>
                </v-dialog>

            </v-col>
            
            <!-- <v-col md="4" class="d-none d-md-none">
                <v-card height="88vh" elevation="0" class="rounded-xl pa-4">
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>Sponsored</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-card-title>{{form.heading}}</v-card-title>
                    <v-card-subtitle>{{form.description}}</v-card-subtitle>
                    <v-card-text>
                        <v-img
                            :src="singleImagePreview"
                            height="250px"
                            v-if="singleImagePreview"
                        ></v-img>
                        <v-carousel
                            cycle
                            height="400"
                            hide-delimiter-background
                            show-arrows-on-hover
                            v-if="multipleImagePreview.length"
                        >
                            <v-carousel-item
                                v-for="(item,i) in multipleImagePreview"
                                :key="i"
                                :src="item.src"
                            ></v-carousel-item>
                        </v-carousel>
                        <video 
                            v-show="videoPreview"
                            id="video-preview" controls
                            width="100%"
                        ></video>
                    </v-card-text>
                </v-card>
            </v-col> -->
        </v-row>
        
    </div>
</template>

<script>
import StateJson from '../../assets/states.json'
import Ads from '../../Apis/Ads'

export default {
    data () {
        this.publishableKey = 'pk_test_51JliZ4SHLn14bCLXnQ9gAKtthnEgaPdgJc1fjnRhG3Nih5h0rzGkNlzmLZFy2W9DsLMwMMDn06PaK0mDrWmoOOTj008QCo6LFa';
        return {
            toggle_exclusive: undefined,
            e6: 1,
            stateData: StateJson,
            states: [],
            gender:[
                'Both',
                'Male',
                'Female'
            ],
            budget:[
                { text: '15000', amount: '15000' },
                { text: '25000', amount: '25000' },
                { text: '30000', amount: '30000' }
            ],
            minAge:[
                10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80
            ],
            maxAge:[
                10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80
            ],
            audience:[
                'All',
                'Economy',
                'Premium',
                'Luxury',
                'Ultra Luxury'
            ],
            platform:[
                'All',
                'Facebook',
                'Instagram',
                'Facebook & Instagram',
                'Google Search',
                'Youtube',
                'Gmail',
                'Google Display'
            ],
            objectives:[
                'All',
                'Promotion',
                'Website Traffic',
                'Video Promotion',
                'Generate Leads',
                'Engagement',
                'Page Like',
                'Post Boost'
            ],
            media:[
                'Single Image',
                'Slideshow',
                'video'
            ],
            description:'',
            heading: '',
            startdate: '',
            starttime: '',
            video: '',
            image: '',
            loading: false,
            lineItems: [
                {
                    price: 'price_1JrKVqSHLn14bCLXhEhYcUoa', // The id of the one-time price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: 'https://agnt-vue.s3.ap-south-1.amazonaws.com/index.html',
            cancelURL: 'https://agnt-vue.s3.ap-south-1.amazonaws.com/index.html',
            x: 'one',
            form:{
                states: [],
                gender: '',
                minAge: '',
                duration: '',
                budget: '',
                maxAge: '',
                audience: '',
                platform: '',
                objectives: '',
                description: '',
                heading: '',
                startdate: '',
                image: null,
                video: null,
                images: []
            },
            amount: '',
            singleImagePreview: null,
            multipleImagePreview: [],
            videoPreview: false,
            preview: false
        }
    },
    computed:{
        gstAmount(){
            return 18 / 100 * this.amount
        },
        total(){
            return parseInt(this.amount) + parseInt(this.gstAmount);
        }
    },
    methods:{
        placeAd(){
            let data = new FormData();

            data.append('states', this.form.states)
            data.append('gender', this.form.gender)
            data.append('duration', this.form.duration)
            data.append('minAge', this.form.minAge)
            data.append('maxAge', this.form.maxAge)
            data.append('audience', this.form.audience)
            data.append('platform', this.form.platform)
            data.append('objectives', this.form.objectives)
            data.append('description', this.form.description)
            data.append('heading', this.form.heading)
            data.append('startdate', this.form.startdate)
            data.append('starttime', this.form.starttime)
            data.append('image', this.form.image)
            data.append('video', this.form.video)
            data.append('budget', this.total)

            for (let i = 0; i < this.form.images.length; i++) {
                let file = this.form.images[i];
                data.append('images[' + i + ']', file);
            }

            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Ads.new(data)
            .then((response) => {
                console.log(response)
                // this.$router.push('/social-ads/checkout');
            })

        },
        // Single Image Preview and upload
        onSingleImageUpload(e){
            const file = e.target.files[0];
            this.form.image = file;

            this.video = '';
            this.multipleImagePreview = '';

            this.singleImagePreview = URL.createObjectURL(file);
        },
        // Slideshow Preview
        onMultipleImageUpload(e){
            const files = e.target.files;
            this.form.images = files;
            this.singleImagePreview = ''
            this.video = '';

            // console.log(files);

            var selectedFiles = files;
            for (let i = 0; i < selectedFiles.length; i++) {
                this.multipleImagePreview.push({
                    "name" : selectedFiles[i].name,
                    "url" : URL.createObjectURL(selectedFiles[i]),
                    "file" : selectedFiles[i]
                })
            }
        },

        // Video Upload or Preview
        onVideoUpload(event){
            this.singleImagePreview = '';
            this.multipleImagePreview = '';

            this.file = event.target.files[0];
            this.form.video = event.target.files[0];
            this.videoPreview = true
            this.previewVideo();
        },
        previewVideo(){
            let video = document.getElementById('video-preview');
            let reader = new FileReader();

            reader.readAsDataURL( this.file );
            reader.addEventListener('load', function(){
                video.src = reader.result;
            });
        },
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.card-style{
    box-shadow: 0px 0px 4px #ececec;
    padding: 1em;
    margin-bottom: 2em;
    border: 1px solid #efefef;
    border-radius: 10px;
    width: 100%;
    text-align: center;
}
.imageUploaderDiv{
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 4px #ececec;
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 2em;
    cursor: pointer;
}
.imageUploaderDiv:hover{
    background: #efefef;
}
</style>