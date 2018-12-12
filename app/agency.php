<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class agency extends Model
{
    use SearchableTrait;

    protected $fillable = ['detail'];
    protected $searchable = [
        'columns' => [
            'agencies.detail' => 1,
        ]
    ];
}
