<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class client extends Model
{
    use SearchableTrait;
    protected $fillable = ['client_details', 'agency_id', 'siccode_id'];
    protected $searchable = [
        'columns' => [
            'clients.client_details' => 1,
            'agencies.detail' => 2,
            'siccodes.description' => 3
        ],
        'joins' => [
            'agencies' => ['clients.agency_id', 'agencies.id'],
            'siccodes' => ['clients.siccode_id', 'siccodes.id']
        ]
    ];

    public function agency()
    {
        return $this->belongsTo(agency::class);
    }

    public function siccode()
    {
        return $this->belongsTo(siccode::class);
    }
}
