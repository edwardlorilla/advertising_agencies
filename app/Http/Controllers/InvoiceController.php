<?php

namespace App\Http\Controllers;

use App\invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(invoice::with('client', 'invoicestatuscode')->search(request('search'))->get(), 200);
    }


    public function search()
    {
        return response()->json(request()->has('search') ? invoice::search(request('search'))->get() : '');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $this->validate($request, [
            'client_id' => 'required',
            'invoicestatuscode_id' => 'required',
            'invoice_details' => 'required'
        ]);
        $invoice = new invoice;
        $invoice->client_id = $input['client_id'];
        $invoice->invoicestatuscode_id = $input['invoicestatuscode_id'];
        $invoice->invoice_details = $input['invoice_details'];
        $invoice->save();
        return response()->json($invoice, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(invoice $invoice)
    {
        return response()->json($invoice);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, invoice $invoice)
    {
        $input = $this->validate($request, [
            'client_id' => 'required',
            'invoicestatuscode_id' => 'required',
            'invoice_details' => 'required'
        ]);
        $invoice->client_id = $input['client_id'];
        $invoice->invoicestatuscode_id = $input['invoicestatuscode_id'];
        $invoice->invoice_details = $input['invoice_details'];
        $invoice->save();
        return response()->json($invoice, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(invoice $invoice)
    {
        return response()->json($invoice->delete());
    }
}
