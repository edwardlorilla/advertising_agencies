<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Payment</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item label="Invoice Detail">
                            <el-select
                                    style="width: 100%;"
                                    size="small"
                                    v-model="form.invoice_id"
                                    :disabled="disabled"
                                    filterable
                                    remote
                                    required
                                    placeholder="Enter Invoice Detail"
                                    :remote-method="search_invoice"
                                    :loading="loading">
                                <el-option
                                        v-for="(item, index) in invoices"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Detail">
                            <el-input v-model="form.detail"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit">{{$route.params.id ? 'Edit'
                                : 'Create'}}
                            </el-button>
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
                    invoice_id: '',
                    detail: ''
                },
                invoices:[],
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/payments/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data)
                    )
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/payments/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_invoice(query){
                var vm = this
                if (query !== '') {

                    vm.onSearchInvoice(query, vm)
                } else {
                    vm.loading = false
                    vm.clients = []
                }
            },
            onSearchInvoice: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/invoices/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.invoices = q.data.map(item => {
                            return {value: item.id, label: item.invoice_details};
                })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-payment'})
            },
            onSubmit() {
                var vm = this
                vm.disabled = true
                let id = vm.$route.params.id;
                axios[id ? 'put' : 'post'](`/api/payments${id ? `/${id}` : ''}`, vm.form).then(function () {
                    vm.disabled = false
                    vm.$message({
                        type: 'success',
                        message: `Payment has been ${id ? 'edited' : 'created'}`
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