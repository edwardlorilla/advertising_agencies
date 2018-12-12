<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class meetingtype extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'meetingtypes.description' => 1
        ],
    ];
}
