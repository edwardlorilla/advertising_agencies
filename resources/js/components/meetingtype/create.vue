<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Meeting Type</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item label="Description">
                            <el-input v-model="form.description"></el-input>
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
                    description: '',
                },
                disabled: false,
                loading: false,
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/meetingtypes/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/meetingtypes/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            setData(response){
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-meetingtype'})
            },
            onSubmit() {
                var vm = this
                vm.disabled = true
                let id = vm.$route.params.id;
                axios[id ? 'put' : 'post'](`/api/meetingtypes${id ? `/${id}` : ''}`, vm.form).then(function () {
                    vm.disabled = false
                    vm.$message({
                        type: 'success',
                        message: `Meeting type has been ${id ? 'edited' : 'created'}`
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