<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{vue_capture}', function () {
    return view('welcome');
})->where('vue_capture', '^(?!storage|login|register|home).*$'); //exclude from web route

Auth::routes();

Route::get('/home/{vue_capture?}', 'HomeController@index')->where('vue_capture', '^(?!storage).*$')->name('home');
