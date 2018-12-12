<template>
    <div class="card-deck">
        <meeting-grid v-for="meeting in meetings" :key="meeting.id" :meeting="meeting"></meeting-grid>
    </div>
</template>
<script>
    import MeetingGrid from './../Table/MeetingGrid.vue'
    export default{
        components: {
            MeetingGrid
        },
        data(){
            return {
                meetings: []
            }
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
                this.meetings = response
            },
        }
    }
</script>
