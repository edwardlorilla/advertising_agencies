<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add Meeting Outcome"
                   on-delete="/api/meetingoutcomes"
                   on-edit-name="edit-meetingoutcome"
                   on-create-name="create-meetingoutcome"
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
                        label: 'Description',
                        prop: 'description'
                    }
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/meetingoutcomes`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/meetingoutcomes`, {params: to.query}).then(function (response) {
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
