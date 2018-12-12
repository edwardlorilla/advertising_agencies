<?php

namespace App\Http\Controllers;

use App\meetingoutcome;
use Illuminate\Http\Request;

class MeetingOutcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(meetingoutcome::search(request('search'))->get());
    }
    public function search()
    {
        return response()->json(request()->has('search') ? meetingoutcome::search(request('search'))->get() : '');
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
        $meetingoutcome = new meetingoutcome;
        $meetingoutcome->description = $input['description'];
        $meetingoutcome->save();
        return response()->json($meetingoutcome);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\meetingoutcome  $meetingoutcome
     * @return \Illuminate\Http\Response
     */
    public function show(meetingoutcome $meetingoutcome)
    {
        return response()->json($meetingoutcome);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\meetingoutcome  $meetingoutcome
     * @return \Illuminate\Http\Response
     */
    public function edit(meetingoutcome $meetingoutcome)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\meetingoutcome  $meetingoutcome
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meetingoutcome $meetingoutcome)
    {
        $input = $this->validate($request, [
            'description' => 'required'
        ]);
        $meetingoutcome->description = $input['description'];
        $meetingoutcome->save();
        return response()->json($meetingoutcome);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\meetingoutcome  $meetingoutcome
     * @return \Illuminate\Http\Response
     */
    public function destroy(meetingoutcome $meetingoutcome)
    {
        return response()->json($meetingoutcome->delete());
    }
}
