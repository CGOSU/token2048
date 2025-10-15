<?php

namespace App\Http\Controllers;

use App\Models\PowerBy;
use Illuminate\Http\Request;

class PowerByController extends BaseController
{
    public function index()
    {
        $power_by = PowerBy::all()->select(["id","name","img"]);
        return $this->ok_response($power_by);
    }
    public function create(Request $request)
    {
        $name=$request->get("name");
        $model=PowerBy::query()->where("name",$name)->first();
        if (!empty($model))
        {
            return $this->bad_response("已经存在");
        }
        $power_by=PowerBy::create($request->all());
        if (!empty($power_by)){
            return $this->ok_response();
        }
        return $this->bad_response();
    }
    public function edit(Request $request)
    {
        $model=PowerBy::query()->where("id",$request->get("id"))->first();
        if (!empty($model)){
            $model->update($request->all());
            return $this->ok_response();
        }
        return $this->bad_response();
    }
    public function delete(Request $request)
    {
        $model=PowerBy::query()->where("id",$request->get("id"))->first();
        if (!empty($model)){
            $model->delete();
            return $this->ok_response();
        }
        return $this->bad_response("删除失败");
    }
}
