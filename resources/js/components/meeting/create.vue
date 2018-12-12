<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Client</span>
                        </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item label="Client Details">
                            <el-select
                                style="width: 100%;"
                                size="small"
                                v-model="form.client_id"
                                :disabled="disabled"
                                filterable
                                remote
                                required
                                placeholder="Enter Client Detail"
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
                        <el-form-item label="Meeting Outcome">
                            <el-select
                                style="width: 100%;"
                                size="small"
                                v-model="form.meetingoutcome_id"
                                :disabled="disabled"
                                filterable
                                remote
                                required
                                placeholder="Enter Meeting Outcome"
                                :remote-method="search_meetingoutcome"
                                :loading="loading">
                                <el-option
                                    v-for="(item, index) in meetingoutcomes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Meeting Type Code">
                            <el-select
                                style="width: 100%;"
                                size="small"
                                v-model="form.meetingtypecode_id"
                                :disabled="disabled"
                                filterable
                                remote
                                required
                                placeholder="Enter Meeting Type"
                                :remote-method="search_meetingtype"
                                :loading="loading">
                                <el-option
                                    v-for="(item, index) in meetingtypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Staffs">
                            <el-select
                                v-model="form.staff"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                placeholder="Please enter a keyword"
                                :remote-method="search_staff"
                                :loading="loading">
                                <el-option
                                    v-for="item in staffs"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Billable">
                            <el-select v-model="form.billable_yn">
                                <el-option label="No" value="no"></el-option>
                                <el-option label="Yes" value="yes"></el-option>
                                </el-select>
                            </el-form-item>
                        <el-form-item label="Start Date Time">
                            <el-date-picker
                                v-model="form.start_date_time"
                                type="datetime">
                                </el-date-picker>
                            </el-form-item>
                        <el-form-item label="End Date Time">
                            <el-date-picker
                                v-model="form.end_date_time"
                                type="datetime">
                                </el-date-picker>
                            </el-form-item>
                        <el-form-item label="Purpose of Meeting">
                            <el-input v-model="form.purpose_of_meeting"></el-input>
                            </el-form-item>
                        <el-form-item label="Other Detail">
                            <el-input v-model="form.other_details"></el-input>
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
                    client_id: '',
                    meetingoutcome_id: '',
                    meetingtypecode_id: '',
                    billable_yn: '',
                    start_date_time: '',
                    end_date_time: '',
                    purpose_of_meeting: '',
                    other_details: '',
                    staff: []
                },
                disabled: false,
                loading: false,
                clients: [],
                staffs: [],
                meetingoutcomes: [],
                meetingtypes: [],
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/meetings/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/meetings/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_staff(query){
                var vm = this
                if (query !== '') {

                    vm.onSearchStaff(query, vm)
                } else {
                    vm.loading = false
                    vm.staffs = []
                }
            },
            onSearchStaff: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/staffs/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.staffs = q.data.map(item => {
                        return {value: item.id, label: item.detail};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
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
            search_meetingoutcome(query){
                var vm = this
                if (query !== '') {
                    vm.onSearchMeetingOutcome(query, vm)
                } else {
                    vm.loading = false
                    vm.meetingoutcomes = []
                }
            },
            onSearchMeetingOutcome: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/meetingoutcomes/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.meetingoutcomes = q.data.map(item => {
                        return {value: item.id, label: item.description};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            search_meetingtype(query){
                var vm = this
                if (query !== '') {
                    vm.onSearchMeetingType(query, vm)
                } else {
                    vm.loading = false
                    vm.meetingtypes = []
                }
            },
            onSearchMeetingType: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/meetingtypes/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.meetingtypes = q.data.map(item => {
                        return {value: item.id, label: item.description};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                var vm = this
                vm.clients = [{value: response.client.id, label: response.client_details}];
                vm.meetingoutcomes = [{value: response.meetingoutcome.id, label: response.meetingoutcome.description}];
                vm.meetingtypes = [{value: response.meetingtypecode.id, label: response.meetingtypecode.description}];
                vm.staffs = response.staffs.map(item => {
                        return {value: item.id, label: item.detail};
                })


                vm.form = response
                vm.form.staff = _.map(response.staffs, 'id')
            },
            onCancel(){
                this.$router.push({name: 'view-meeting'})
            },
            onSubmit() {
                var vm = this
                vm.disabled = true
                let id = vm.$route.params.id;
                axios[id ? 'put' : 'post'](`/api/meetings${id ? `/${id}` : ''}`, vm.form).then(function () {
                    vm.disabled = false
                    vm.$message({
                        type: 'success',
                        message: `Meeting has been ${id ? 'edited' : 'created'}`
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