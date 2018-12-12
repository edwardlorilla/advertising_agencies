<?php

namespace App\Http\Controllers;

use App\meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(meeting::with('staffs.agency', 'client', 'meetingoutcome', 'meetingtypecode')->search(request('search'))->get());
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
            'client_id' => 'required',
            'meetingoutcome_id' => 'required',
            'meetingtypecode_id' => 'required',
            'billable_yn' => 'required',
            'start_date_time' => 'required',
            'end_date_time' => 'required',
            'purpose_of_meeting' => '',
            'other_details' => '',
            'staff' => 'array'
        ]);
        $meeting = new meeting;
        $meeting->client_id = $input['client_id'];
        $meeting->meetingoutcome_id = $input['meetingoutcome_id'];
        $meeting->meetingtypecode_id = $input['meetingtypecode_id'];
        $meeting->billable_yn = $input['billable_yn'];
        $meeting->start_date_time = $input['start_date_time'];
        $meeting->end_date_time = $input['end_date_time'];
        $meeting->purpose_of_meeting = $input['purpose_of_meeting'];
        $meeting->other_details = $input['other_details'];
        $meeting->save();
        $meeting->staffs()->attach($input['staff']);
        return response()->json($meeting);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\meeting $meeting
     * @return \Illuminate\Http\Response
     */
    public function show(meeting $meeting)
    {
        return response()->json(meeting::whereId($meeting->id)->with('staffs', 'client', 'meetingoutcome', 'meetingtypecode')->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\meeting $meeting
     * @return \Illuminate\Http\Response
     */
    public function edit(meeting $meeting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\meeting $meeting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, meeting $meeting)
    {
        $input = $this->validate($request, [
            'client_id' => 'required',
            'meetingoutcome_id' => 'required',
            'meetingtypecode_id' => 'required',
            'billable_yn' => 'required',
            'start_date_time' => 'required',
            'end_date_time' => 'required',
            'purpose_of_meeting' => '',
            'other_details' => '',
            'staff' => 'array'
        ]);
        $meeting->client_id = $input['client_id'];
        $meeting->meetingoutcome_id = $input['meetingoutcome_id'];
        $meeting->meetingtypecode_id = $input['meetingtypecode_id'];
        $meeting->billable_yn = $input['billable_yn'];
        $meeting->start_date_time = $input['start_date_time'];
        $meeting->end_date_time = $input['end_date_time'];
        $meeting->purpose_of_meeting = $input['purpose_of_meeting'];
        $meeting->other_details = $input['other_details'];
        $meeting->save();
        $meeting->staffs()->sync($input['staff']);
        return response()->json($meeting);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\meeting $meeting
     * @return \Illuminate\Http\Response
     */
    public function destroy(meeting $meeting)
    {
        return response()->json($meeting->delete());
    }
}
