<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class invoicestatuscode extends Model
{
    use SearchableTrait;

    protected $fillable = ['invoice_status_description'];
    protected $searchable = [
        'columns' => [
            'invoicestatuscodes.invoice_status_description' => 1
        ],
    ];
}
