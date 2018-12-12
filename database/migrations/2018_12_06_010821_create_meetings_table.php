<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('client_id');
            $table->unsignedInteger('meetingoutcome_id');
            $table->unsignedInteger('meetingtypecode_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('meetingoutcome_id')->references('id')->on('meetingoutcomes');
            $table->foreign('meetingtypecode_id')->references('id')->on('meetingtypes');
            $table->string('billable_yn');
            $table->string('start_date_time');
            $table->string('end_date_time');
            $table->string('purpose_of_meeting');
            $table->string('other_details');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meetings');
    }
}
