<?php

namespace App\Http\Controllers;

use App\staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(staff::with('agency')->search(request('search'))->get());
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
        return response()->json(request()->has('search') ? staff::search(request('search'))->get() : '');
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
            'agency_id' => 'required',
            'detail' => 'required'
        ]);
        $staff = new staff;
        $staff->detail = $input['detail'];
        $staff->agency_id = $input['agency_id'];
        $staff->save();

        return response()->json($staff);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, staff $staff)
    {
        $input = $this->validate($request, [
            'agency_id' => 'required',
            'detail' => 'required'
        ]);
        $staff->detail = $input['detail'];
        $staff->agency_id = $input['agency_id'];
        $staff->save();
        return response()->json($staff);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(staff $staff)
    {
        return response()->json($staff->delete());
    }
}
