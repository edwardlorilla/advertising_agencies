<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add Meeting"
                   on-delete="/api/meetings"
                   on-edit-name="edit-meeting"
                   on-create-name="create-meeting"
                   @delete="data.splice($event, 1)"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.staffs"
                        style="width: 100%">
                        <el-table-column
                            prop="agency.detail"
                            label="Agency Detail">
                            </el-table-column>
                        <el-table-column
                            prop="detail"
                            label="Detail">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
        </grid-view>
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
                        label: 'Client Details',
                        prop: 'client.client_details'
                    }, {
                        label: 'Meeting Outcome',
                        prop: 'meetingoutcome.description'
                    }, {
                        label: 'Meeting Type Code',
                        prop: 'meetingtypecode.description'
                    }, {
                        label: 'Billable',
                        prop: 'billable_yn'
                    }, {
                        label: 'Start Date',
                        prop: 'start_date_time'
                    }, {
                        label: 'End Date',
                        prop: 'end_date_time'
                    }, {
                        label: 'Purpose of meeting',
                        prop: 'purpose_of_meeting'
                    }, {
                        label: 'Other Detail',
                        prop: 'other_details'
                    },

                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/meetings`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/meetings`, {params: to.query}).then(function (response) {
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
