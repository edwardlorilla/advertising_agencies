<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add Staff"
                   on-delete="/api/staffs"
                   on-edit-name="edit-staff"
                   on-create-name="create-staff"
                   @delete="data.splice($event, 1)"
                   ></grid-view>
        </div>
    </template>
<style>
    </style>
<script>
    import GridView from './../Table/Grid.vue'
    export default{
        data(){
            return {
                columns: [
                    {
                        label: 'Agency Detail',
                        prop: 'agency.detail'
                    },{
                        label: 'Detail',
                        prop: 'detail'
                    }
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/staffs`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/staffs`, {params: to.query}).then(function (response) {
                vm.setData(response.data)
                next()
            })
        },
        methods: {
            setData(response){
                this.data = response
            },
        }
    }
    </script>
