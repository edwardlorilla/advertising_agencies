<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class meeting extends Model
{
    use SearchableTrait;
    protected $fillable = ['client_id', 'meetingoutcome_id', 'meetingtypecode_id', 'billable_yn', 'start_date_time', 'end_date_time', 'purpose_of_meeting', 'other_details'];
    protected $searchable = [
        'columns' => [
            'clients.client_details'=> 6,
            'meetingoutcomes.description'=> 7,
            'meetingtypes.description'=> 8,
            'meetings.billable_yn' => 2,
            'meetings.start_date_time' => 3,
            'meetings.end_date_time' => 4,
            'meetings.purpose_of_meeting' => 1,
            'meetings.other_details' => 5,
        ],
        'joins' => [
            'clients' => ['meetings.client_id', 'clients.id'],
            'meetingoutcomes' => ['meetings.meetingoutcome_id', 'meetingoutcomes.id'],
            'meetingtypes' => ['meetings.meetingtypecode_id', 'meetingtypes.id']
        ]
    ];
    public function client()
    {
        return $this->belongsTo(client::class);
    }

    public function meetingoutcome()
    {
        return $this->belongsTo(meetingoutcome::class);
    }

    public function meetingtypecode()
    {
        return $this->belongsTo(meetingtype::class);
    }

    public function staffs()
    {
        return $this->belongsToMany(staff::class);
    }
}
