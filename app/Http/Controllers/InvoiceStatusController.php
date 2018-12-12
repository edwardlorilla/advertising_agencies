<?php

namespace App\Http\Controllers;

use App\invoicestatuscode;
use Illuminate\Http\Request;

class InvoiceStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(invoicestatuscode::search(request('search'))->get());
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

    public function search()
    {
        return response()->json(request()->has('search') ? invoicestatuscode::search(request('search'))->get() : '');
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
            'invoice_status_description' => 'required'
        ]);
        $invoicestatus =new invoicestatuscode;
        $invoicestatus->invoice_status_description = $input['invoice_status_description'];
        $invoicestatus->save();
        return response()->json($invoicestatus);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\invoicestatuscode  $invoicestatuscode
     * @return \Illuminate\Http\Response
     */
    public function show(invoicestatuscode $invoicestatuscode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\invoicestatuscode  $invoicestatuscode
     * @return \Illuminate\Http\Response
     */
    public function edit(invoicestatuscode $invoicestatuscode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\invoicestatuscode  $invoicestatuscode
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, invoicestatuscode $invoicestatuscode)
    {
        $input = $this->validate($request, [
            'invoice_status_description' => 'required'
        ]);
        $invoicestatuscode->invoice_status_description = $input['invoice_status_description'];
        $invoicestatuscode->save();
        return response()->json($invoicestatuscode);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\invoicestatuscode  $invoicestatuscode
     * @return \Illuminate\Http\Response
     */
    public function destroy(invoicestatuscode $invoicestatuscode)
    {
        return response()->json($invoicestatuscode->delete());
    }
}
