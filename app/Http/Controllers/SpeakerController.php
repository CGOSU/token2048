<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSpeakerRequest;
use App\Models\Speaker;
use Illuminate\Http\Request;


class SpeakerController extends BaseController
{
    public function index(Request $request)
    {
        $page=$request->get('page', 1);
        $perPage=$request->get('page_size', 10);
        $total=Speaker::query()->count();
        $model=Speaker::query()->select(["id","name","avatar","company","x","linkedin","job_title"])
            ->offset(($page-1)*$perPage)
            ->limit($perPage)
            ->orderBy("id","desc")
            ->get();

        return $this->ok_response(["list"=>$model,"total"=>$total]);
    }
    public function list(Request $request)
    {
        $model=Speaker::query()->select(["id","name"])->get();
        return $this->ok_response($model);
    }

    public function add(StoreSpeakerRequest $request){
        $data=$request->validated();
        if (!Speaker::create($data)){
            return $this->bad_response();
        }
        return $this->ok_response();
    }


    public function edit(Request $request){
        $speaker=Speaker::query()->select(["id","name","avatar","company","x","linkedin","job_title"])->findOrFail($request["id"]);
        if ($request->isMethod('GET')){

            return $this->ok_response($speaker->toArray());
        }
        if($speaker->update($request->except("id"))){
            return $this->ok_response();
        }
        return $this->bad_response("未更新");
    }
    public function delete(Request $request){
        $speaker=Speaker::query()->findOrFail($request["id"]);
        if ($speaker->delete()){
            return $this->ok_response();
        }
        return $this->bad_response();
    }
}
