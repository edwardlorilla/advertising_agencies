<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/siccodes/search', 'SiccodeController@search');
    Route::get('/agencies/search', 'AgencyController@search');
    Route::get('/clients/search', 'ClientController@search');
    Route::get('/invoices/search', 'InvoiceController@search');
    Route::get('/invoice-status/search', 'InvoiceStatusController@search');
    Route::get('/meetingoutcomes/search', 'MeetingOutcomeController@search');
    Route::get('/meetingtypes/search', 'MeetingTypeController@search');
    Route::get('/staffs/search', 'StaffController@search');
    Route::apiResources([
        '/agencies' => 'AgencyController',
        '/siccodes' => 'SiccodeController',
        '/clients' => 'ClientController',
        '/invoices' => 'InvoiceController',
        '/invoice-status' => 'InvoiceStatusController',
        '/payments' => 'PaymentController',
        '/meetingoutcomes' => 'MeetingOutcomeController',
        '/meetingtypes' => 'MeetingTypeController',
        '/meetings' => 'MeetingController',
        '/staffs' => 'StaffController',
    ]);
});
