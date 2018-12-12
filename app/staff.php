<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class staff extends Model
{
    use SearchableTrait;
    protected $fillable = ['agency_id', 'detail'];
    protected $searchable = [
        'columns' => [
            'staff.detail' => 1,
            'agencies.detail' =>2
        ],
        'joins' => [
            'agencies' => ['staff.agency_id', 'agencies.id']
        ]
    ];

    public function agency()
    {
        return $this->belongsTo(agency::class);
    }
    public function meetings()
    {
        return $this->belongsToMany(meeting::class);
    }
}
