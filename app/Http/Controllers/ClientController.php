<?php

namespace App\Http\Controllers;

use App\client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(client::with('agency', 'siccode')->search(request('search'))->get());
    }

    public function search()
    {
        return response()->json(request()->has('search') ? client::search(request('search'))->get(): '');
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $this->validate($request, [
            'client_details' => 'required',
            'agency_id' => 'required',
            'siccode_id' => 'required'
        ]);
        $client = new client;
        $client->client_details = $input['client_details'];
        $client->agency_id = $input['agency_id'];
        $client->siccode_id = $input['siccode_id'];
        $client->save();
        return response()->json($client);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\client $client
     * @return \Illuminate\Http\Response
     */
    public function show(client $client)
    {
        return response()->json(client::whereId($client->id)->with('siccode', 'agency')->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\client $client
     * @return \Illuminate\Http\Response
     */
    public function edit(client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\client $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, client $client)
    {
        $input = $this->validate($request, [
            'client_details' => 'required',
            'agency_id' => 'required',
            'siccode_id' => 'required'
        ]);
        $client->client_details = $input['client_details'];
        $client->agency_id = $input['agency_id'];
        $client->siccode_id = $input['siccode_id'];
        $client->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\client $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(client $client)
    {
        return response()->json($client->delete(), 204);
    }
}
