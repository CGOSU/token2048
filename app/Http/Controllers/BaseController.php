<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;

class BaseController extends Controller
{
    protected function ok_response($data = null)
    {
        return response()->json([
            "data" => $data,
            "code" => 200,
            "message" => "OK"
        ], Response::HTTP_OK);
    }
    protected function bad_response($message="",$data = null,$status=400){
        return response()->json([
            "data" => $data,
            "code" => $status,
            "message" =>$message,
        ], Response::HTTP_OK);
    }
}
