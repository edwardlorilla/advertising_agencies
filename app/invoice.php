<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class invoice extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'invoices.invoice_details' => 1,
            'invoicestatuscodes.invoice_status_description' => 2,
            'clients.client_details' => 3
        ],
        'joins' => [
            'invoicestatuscodes' => ['invoices.invoicestatuscode_id', 'invoicestatuscodes.id' ],
            'clients' => ['invoices.client_id', 'clients.id']
        ]
    ];
    protected $fillable = ['client_id', 'invoicestatuscode_id', 'invoice_details'];

    public function client()
    {
        return $this->belongsTo(client::class);
    }

    public function invoicestatuscode()
    {
        return $this->belongsTo(invoicestatuscode::class);
    }
}
