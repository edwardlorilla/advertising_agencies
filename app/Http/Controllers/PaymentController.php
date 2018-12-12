<?php

namespace App\Http\Controllers;

use App\payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(payment::with('invoice')->search(request('search'))->get());
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
            'invoice_id' => 'required',
            'detail' => 'required'
        ]);
        $payment = new payment;
        $payment->invoice_id = $input['invoice_id'];
        $payment->detail =$input['detail'];
        $payment->save();
        return response()->json($payment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function show(payment $payment)
    {
        return response()->json($payment);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function edit(payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, payment $payment)
    {
        $input = $this->validate($request, [
            'invoice_id' => 'required',
            'detail' => 'required'
        ]);
        $payment->invoice_id = $input['invoice_id'];
        $payment->detail =$input['detail'];
        $payment->save();
        return response()->json($payment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\payment  $payment
     * @return \Illuminate\Http\Response
     */
    public function destroy(payment $payment)
    {
        return responbse()->json($payment);
    }
}
