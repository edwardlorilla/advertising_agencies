<template>
    <div class="card" :class="dateTime.status === 'Starting' ? 'border-success' : dateTime.status === 'Pending' ? 'border-primary' : 'border-danger' ">
       <div class="card-header">
           <h5 class="card-title">{{`${meeting.purpose_of_meeting} by ${meeting.client.client_details}`}}</h5>
       </div>
        <div class="card-body">

            <p class="card-text">
            <div>
                Start at: {{`${$moment(meeting.start_date_time).format('YYYY-MM-DD hh:mm:ss a')}`}}
            </div>
            <div>
                End at: {{`${$moment(meeting.end_date_time).format('YYYY-MM-DD hh:mm:ss a')}`}}
            </div>
            </p>

        </div>
        <div class="card-footer">
            <span class="badge"
                  :class="dateTime.status === 'Starting' ? 'badge-success' : dateTime.status === 'Pending' ? 'badge-primary' : 'badge-danger' ">{{dateTime.status}}</span>
            <small class="text-muted">{{dateTime.date}}</small>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['meeting'],
        data(){
            return {
                countDownDate: new Date(this.meeting.end_date_time).getTime(),
                startDateNow: new Date(this.meeting.start_date_time).getTime(),
                date: '',
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                distance: 0,
            }
        },
        computed: {
            dateTime(){
                var vm = this
                if (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                    vm.distance = (vm.countDownDate) - vm.$root.now;
                    vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                    vm.hours = Math.floor((vm.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    vm.minutes = Math.floor((vm.distance % (1000 * 60 * 60)) / (1000 * 60));
                    vm.seconds = Math.floor((vm.distance % (1000 * 60)) / 1000);

                } else if (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                    vm.distance = vm.countDownDate - vm.$root.now;
                    vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                    vm.hours = Math.floor((vm.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    vm.minutes = Math.floor((vm.distance % (1000 * 60 * 60)) / (1000 * 60));
                    vm.seconds = Math.floor((vm.distance % (1000 * 60)) / 1000);
                }
                return (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) ? {
                        status: 'Starting',
                        date: `${vm.days}d ${vm.hours}h ${vm.minutes}m ${vm.seconds}s`
                    } : (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) ? {
                            status: 'Pending',
                            date: `${vm.days}d ${vm.hours}h ${vm.minutes}m ${vm.seconds}s`
                        } : {
                            status: 'Stopped',
                            date: ""
                        }

            }

        }
    }
</script>
