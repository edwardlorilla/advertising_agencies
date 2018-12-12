<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Invoice</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item label="Client Description">
                            <el-select
                                style="width: 100%;"
                                size="small"
                                v-model="form.client_id"
                                :disabled="disabled"
                                filterable
                                remote
                                required
                                placeholder="Enter Client Description"
                                :remote-method="search_client"
                                :loading="loading">
                                <el-option
                                    v-for="(item, index) in clients"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Invoice Status Code">
                            <el-select
                                style="width: 100%;"
                                size="small"
                                v-model="form.invoicestatuscode_id"
                                :disabled="disabled"
                                filterable
                                remote
                                required
                                placeholder="Enter Invoice Status Code"
                                :remote-method="search_invoicestatuscode"
                                :loading="loading">
                                <el-option
                                    v-for="(item, index) in invoicestatuscodes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Detail">
                            <el-input v-model="form.invoice_details"></el-input>
                            </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit">{{$route.params.id ? 'Edit' : 'Create'}}</el-button>
                            <el-button @click="onCancel">Cancel</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>

                </el-col>
            </el-row>
        </div>
    </template>
<script>
    export default {
        data() {
            return {
                form: {
                    client_id: '',
                    invoicestatuscode_id: '',
                    invoice_details: ''
                },
                disabled: false,
                loading: false,
                clients: [],
                invoicestatuscodes: [],
                loading: false,
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/invoices/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/invoices/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_client(query){
                var vm = this
                if (query !== '') {

                    vm.onSearchClient(query, vm)
                } else {
                    vm.loading = false
                    vm.clients = []
                }
            },
            onSearchClient: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/clients/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.clients = q.data.map(item => {
                        return {value: item.id, label: item.client_details};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            search_invoicestatuscode(query){
                var vm = this
                if (query !== '') {
                    vm.onSearchInvoiceStatus(query, vm)
                } else {
                    vm.loading = false
                    vm.invoices = []
                }
            },
            onSearchInvoiceStatus: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/invoice-status/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.invoicestatuscodes = q.data.map(item => {
                        return {value: item.id, label: item.invoice_status_description};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                var vm = this
                vm.clients = [{value: response.client.id, label: response.client.client_details}];
                vm.invoicestatuscodes = [{value: response.invoicestatuscode.id, label: response.invoicestatuscode.invoice_status_description}];
                vm.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-invoice'})
            },
            onSubmit() {
                var vm = this
                vm.disabled = true
                let id = vm.$route.params.id;
                axios[id ? 'put' : 'post'](`/api/invoices${id ? `/${id}` : ''}`, vm.form).then(function () {
                    vm.disabled = false
                    vm.$message({
                        type: 'success',
                        message: `Invoices has been ${id ? 'edited' : 'created'}`
                    })
                }).catch(function (error) {
                    vm.disabled = false
                    if (error.response.statusText) {
                        vm.$message({
                            type: 'error',
                            message: error.response.statusText
                        })
                    }
                })
            }
        }
    }
    </script>