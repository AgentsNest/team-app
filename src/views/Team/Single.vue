<template>
    <v-card class="shadow content-card" width="100%" flat>
        <v-card-text>
            <v-text-field
                v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined dense
            ></v-text-field>
        </v-card-text>

        <v-toolbar flat>
            <div class="font-weight-bold">Total Leads ({{total_leads}})</div>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-card height="70vh" class="overflow-y-auto pb-8" flat>
            <v-list three-line>
                <v-list-item v-for="lead in filterLead" :key="lead.id">
                    <v-list-item-content>
                        <v-list-item-title>{{ lead.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ lead.contact }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-if="lead.activities">
                            <div v-for="task in lead.activities.slice(0, 1)" :key="task.id">
                                {{task.action}}
                                {{task.notes}}
                                {{task.message}}
                                {{task.call}}
                                {{task.whatsapp}}
                            </div>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-card>
</template>

<script>
import Lead from '../../Apis/Lead'

export default {
    data () {
        return {
            search: '',
            leads:[],
            lead:{},
            total_leads: ''
        }
    },
    methods:{
        async fetchData(){
            let id = this.$route.params.id
            Lead.getTeamMemberLead(id).then(response => {
                this.leads = response.data.data;
                this.total_leads = response.data.total;
            });
        }
    },
    computed:{
        filterLead: function(){
            return this.leads.filter((lead) => {
                return lead.name.toLowerCase().match(this.search.toLowerCase());
            })
        },
    },
    mounted(){
        this.fetchData();
    }
}
</script>

<style>

</style>