<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add Invoices"
                   on-delete="/api/invoices"
                   on-edit-name="edit-invoice"
                   on-create-name="create-invoice"
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
                        label: 'Client Detail',
                        prop: 'client.client_details'
                    },{
                        label: 'Invoice Status Code',
                        prop: 'invoicestatuscode.invoice_status_description'
                    },{
                        label: 'Details',
                        prop: 'invoice_details'
                    },
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/invoices`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/invoices`, {params: to.query}).then(function (response) {
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
