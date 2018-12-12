<?php

namespace App\Http\Controllers;

use App\siccode;
use Illuminate\Http\Request;

class SiccodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(siccode::search(request('search'))->get());
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
            'description' => 'required'
            ]);
        $siccode = new siccode;
        $siccode->description = $input['description'];
        $siccode->save();
        return response()->json($siccode);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\siccode  $siccode
     * @return \Illuminate\Http\Response
     */
    public function show(siccode $siccode)
    {
        return response()->json($siccode);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\siccode  $siccode
     * @return \Illuminate\Http\Response
     */
    public function edit(siccode $siccode)
    {
        //
    }

    public function search()
    {
        return response()->json(request()->has('search') ? siccode::search(request('search'))->get() : '', 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\siccode  $siccode
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, siccode $siccode)
    {
        $input = $this->validate($request, [
            'description' => 'required'
        ]);
        $siccode->description = $input['description'];
        $siccode->save();
        return response()->json($siccode);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\siccode  $siccode
     * @return \Illuminate\Http\Response
     */
    public function destroy(siccode $siccode)
    {
        //
    }
}
