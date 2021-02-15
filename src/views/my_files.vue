<template>
  <div id="files">
        <b-table :empty-html="EMTPY_TABLE" bordered show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0">
            <template #cell(image_size)="data">
                {{ data.item.image_size | prettyBytes }}
            </template>
            <template #cell(image_upload_time)="data">
                {{ moment(data.item.image_upload_time).local().format('YYYY-MM-DD HH:mm:ss A')}}
            </template>
            <template #cell(image_link)="data">
                <b-link v-bind:href="data.item.image_link" target="_blank">{{ data.item.image_link }}</b-link>
            </template>
            <template #cell(image_delete)="data">
                <b-button v-on:click="API_deleteImage(`${data.item.image_id}`, `${data.item.uploader_id}`, `${data.item.image_link}`)" variant="danger">Delete</b-button>
            </template>
        </b-table>
        <b-pagination size="md" :total-rows="totalItems" v-model="currentPage" :per-page="perPage"></b-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "my_files",
    components: {},
    data: function () {
        return {
            EMTPY_TABLE: '<p class="text-white">Loading data...</p>',
            fields: [
                {
                key: 'image_name',
                label: 'File Name'
                },
                {
                key: 'image_size',
                label: 'File Size'
                },
                {
                key: 'image_upload_time',
                label: 'Uploaded Time'
                },
                {
                key: 'image_link',
                label: 'Image Link'
                },
                {
                key: 'image_delete',
                label: 'Actions'
                },
            ],
            items: [],
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
        };
    },
    methods: {
        async getAuthToken() {
            this.$parent.JWT_TOKEN = await this.$auth.getTokenSilently();
        },
        API_deleteImage: async function (imageID, userID, imageLink) {
            const vm = this;
            vm.$parent.$swal.fire({
                title: `<span class="text-white">Are you sure you want to delete this file?</span>`,
                icon: 'warning',
                html: `<img src="${imageLink}" class="img-fluid"><label class="text-white" for="confirmDelete">Type <b class="text-danger">DELETE</b> to delete.</label>`,
                showCancelButton: true,
                confirmButtonColor: '#FF4500',
                cancelButtonColor: '#00B32C',
                confirmButtonText: 'Yes',
                background: '#141414',
                reverseButtons: true,
                input: 'text',
                inputAttributes: {
                    id: 'confirmDelete'
                },
                inputValidator: (value) => {
                    if (value != 'DELETE') {
                        return '<span>You must type in <b class="text-danger">DELETE</b> to delete.</span>'
                    }
                }
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${vm.$parent.API_BASE_URL}/delete/${userID}/${imageID}`, {
                    headers: {
                        Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
                    },
                })
                .then(function(data) {
                    let response = JSON.stringify(data);
                    response = JSON.parse(response);
                    if(response.data.error){
                        vm.$parent.$toast.error('There was an error deleting the file.', { position: 'top-right' });
                    }else{
                        vm.$parent.$toast.success('Successfully deleted the file.', { position: 'top-right' });
                        vm.API_images().catch(error => {
                            console.error(error)
                        })
                    }
                });  
            }
            })
        },
        API_images: async function () {
            const vm = this;
            const offset = vm.currentPage * vm.perPage - 10;
            let authToken = vm.$parent.JWT_TOKEN;
            if (await authToken == null){
                await this.getAuthToken();
                const { data } = await axios.get(`${vm.$parent.API_BASE_URL}/images`, {
                    params: { offset: offset, limit: vm.perPage },
                    headers: {
                     Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
                    },
                });
                if(data.count == 0){
                    vm.EMTPY_TABLE = '<h3 class="text-white">There are no files to show</h3>';
                }
                vm.totalItems = data.count;
                vm.items = data.data;
            }else{
                const { data } = await axios.get(`${vm.$parent.API_BASE_URL}/images`, {
                    params: { offset: offset, limit: vm.perPage },
                    headers: {
                        Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
                    },
                });
                if(data.count == 0){
                    vm.EMTPY_TABLE = '<h3 class="text-white">There are no files to show</h3>';
                }
                vm.totalItems = data.count;
                vm.items = data.data;
            }
        },
    },
    created() {
        this.getAuthToken();
    },
    mounted: function () {
        this.API_images().catch(error => {
            this.$parent.$toast.error(`Error Fetching Images: ${error}`, { position: 'top-right' });
            console.error(error)
        });
        this.$nextTick(function () {
            window.setInterval(() => {
                this.API_images().catch(error => {
                    this.$parent.$toast.error(`Error Fetching Images: ${error}`, { position: 'top-right' });
                    console.error(error)
                });
            },this.$parent.REFRESH_INTERVAL);
        })
    },
    watch: {
        currentPage: {
            handler: function() {
                this.API_images().catch(error => {
                    this.$parent.$toast.error(`Error Fetching Images: ${error}`, { position: 'top-right' });
                    console.error(error)
                });
            }
        }
    }
};
</script>
<style scoped>
.table{
    color: #ffffff !important;
}
.swal2-validation-message{
    background-color: #1f1e1e;
    color: #ffffff;
}
.swal2-input{
    color: #dc3545 !important;
}
</style>