<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class payment extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'payments.detail' => 1,
            'invoices.invoice_details' => 2
        ],
        'joins' => [
            'invoices' => ['payments.invoice_id', 'invoices.id']
        ]
    ];
    protected $fillable = ['invoice_id', 'detail'];

    public function invoice()
    {
        return $this->belongsTo(invoice::class);
    }
}
