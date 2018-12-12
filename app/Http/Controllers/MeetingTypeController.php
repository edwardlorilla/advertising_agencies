<?php

namespace App\Http\Controllers;

use App\meetingtype;
use Illuminate\Http\Request;

class MeetingTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(meetingtype::search(request('search'))->get());
    }

    public function search()
    {
        return response()->json(request()->has('search') ? meetingtype::search(request('search'))->get() : '');
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
        $meetingtype = new meetingtype;
        $meetingtype->description = $input['description'];
        $meetingtype->save();
        return response()->json($meetingtype);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\meetingtype  $meetingtype
     * @return \Illuminate\Http\Response
     */
    public function show(meetingtype $meetingtype)
    {
        return response()->json($meetingtype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\meetingtype  $meetingtype
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meetingtype $meetingtype)
    {
        $input = $this->validate($request, [
            'description' => 'required'
        ]);
        $meetingtype->description = $input['description'];
        $meetingtype->save();
        return response()->json($meetingtype);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\meetingtype  $meetingtype
     * @return \Illuminate\Http\Response
     */
    public function destroy(meetingtype $meetingtype)
    {
        return response()->json($meetingtype->delete());
    }
}
