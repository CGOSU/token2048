<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgendaResource;
use App\Models\Agenda;

class AgendaController extends BaseController
{
    public function index()
    {
        $data = Agenda::all();
        return $this->ok_response(AgendaResource::collection($data));
    }
}
