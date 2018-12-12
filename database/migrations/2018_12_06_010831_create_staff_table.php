<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('agency_id');
            $table->foreign('agency_id')->references('id')->on('agencies');
            $table->string('detail');
            $table->timestamps();
        });
        Schema::create('meeting_staff', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('meeting_id')->index();
            $table->foreign('meeting_id')->references('id')->on('meetings')->onDelete('cascade');
            $table->unsignedInteger('staff_id')->index();
            $table->foreign('staff_id')->references('id')->on('staff')->onDelete('cascade');
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
        Schema::dropIfExists('staff');
    }
}
