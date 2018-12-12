<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Staff</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item label="Agency Details">
                            <el-select
                                    style="width: 100%;"
                                    size="small"
                                    v-model="form.agency_id"
                                    :disabled="disabled"
                                    filterable
                                    remote
                                    required
                                    placeholder="Enter Agency Detail"
                                    :remote-method="search_agency"
                                    :loading="loading">
                                <el-option
                                        v-for="(item, index) in agencies"
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
                    agency_id: '',
                    detail: '',
                },
                disabled: false,
                agencies: [],
                loading: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/invoice-status/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/invoice-status/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_agency(query){
                var vm = this
                if (query !== '') {

                    vm.onSearchAgency(query, vm)
                } else {
                    vm.loading = false
                    vm.agencies = []
                }
            },
            onSearchAgency: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/agencies/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.agencies = q.data.map(item => {
                        return {value: item.id, label: item.detail};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-staff'})
            },
            onSubmit() {
                var vm = this
                vm.disabled = true
                let id = vm.$route.params.id;
                axios[id ? 'put' : 'post'](`/api/staffs${id ? `/${id}` : ''}`, vm.form).then(function () {
                    vm.disabled = false
                    vm.$message({
                        type: 'success',
                        message: `Staff has been ${id? 'edited' : 'created'}`
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