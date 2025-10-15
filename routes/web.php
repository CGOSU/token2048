<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return \Illuminate\Support\Facades\Response::json([
        "message" => "Hello World!", "data" => [], "code" => 200
        ]
    );
});
Route::post('/api/user/login',    [UserController::class, 'login']);
Route::get('/api/user/register',    [UserController::class, 'register']);
Route::prefix('/api')
    ->middleware([\App\Http\Middleware\JwtAuth::class])
    ->group(function () {
        Route::post("/upload", [\App\Http\Controllers\UploadController::class, 'index']);
        Route::prefix("/user")->group(function () {
            Route::any("/me", [UserController::class, 'me']);
            Route::any("/list", [UserController::class, 'index']);
            Route::any("/add", [UserController::class, 'register']);
            Route::any("/edit", [UserController::class, 'edit']);
            Route::any("/create", [UserController::class, 'create']);
            Route::any("/delete", [UserController::class, 'delete']);
            Route::get("/logout", [UserController::class, 'logout']);
            Route::post("/refresh", [UserController::class, 'refresh']);
        });
        Route::get('/speaker', [SpeakerController::class, 'index']);
        Route::get('/speaker/list', [SpeakerController::class, 'list']);
        Route::post('/speaker/add', [SpeakerController::class, 'add']);
        Route::post('/speaker/delete', [SpeakerController::class, 'delete']);
        Route::any('/speaker/edit', [SpeakerController::class, 'edit']);
        Route::get('/agenda/list', [AgendaController::class, 'index']);

        $tables = ['power_by', 'highlight']; // 通用表名称表列表
        $collection_tables=\Illuminate\Support\Collection::make($tables);
        $collection_tables->map(function ($table) {
            $name = \Illuminate\Support\Str::studly($table);
            $controller="App\Http\Controllers\\".$name.'Controller';
            Route::post("/$table/add", ["$controller", 'create']);
            Route::get("/$table/list", ["$controller",'index']);
            Route::post("/$table/delete", ["$controller", 'delete']);
            Route::post("/$table/edit", ["$controller", 'edit']);
        });

});
