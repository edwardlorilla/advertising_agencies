<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class meetingoutcome extends Model
{
    use SearchableTrait;
    protected $fillable = ['description'];
    protected $searchable = [
        'columns' => [
                'meetingoutcomes.description' => 1
        ],
    ];

}
