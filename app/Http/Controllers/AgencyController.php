<?php

namespace App\Http\Controllers;

use App\agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(agency::search(request('search'))->get());
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
            'detail' => 'required'
        ]);
        $agency = new agency;
        $agency->detail = $input['detail'];
        $agency->save();
        return response()->json($agency);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\agency $agency
     * @return \Illuminate\Http\Response
     */
    public function show(agency $agency)
    {
        return response()->json($agency);
    }

    public function search()
    {
        return response()->json(request()->has('search') ? agency::search(request('search'))->get() : '', 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\agency $agency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, agency $agency)
    {
        $agency->detail = $request->detail;
        $agency->save();
        return response()->json($agency);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\agency $agency
     * @return \Illuminate\Http\Response
     */
    public function destroy(agency $agency)
    {
        return response()->json($agency->delete(), 204);
    }
}
