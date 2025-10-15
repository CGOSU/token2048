<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{
    public function register(Request $request)
    {
        $model=User::query()->where("username",$request->get('username'))->first();
        if (!empty($model)) {
            return $this->bad_response("用户名已经存在");
        }
        $user = User::create([
            'username'     => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $model=User::query()->where("username",$credentials['username'])->first();
        if (!$model or !Hash::check($credentials['password'],$model->password)){
            return $this->bad_response("密码或者用户错误",null);
        }
        return $this->ok_response(['token' =>auth()->login($model),"id"=>auth()->id()]);
    }


    public function me()
    {
        return $this->ok_response(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return $this->ok_response();
    }


    public function refresh()
    {
        return response()->json(['token' => auth()->refresh()]);
    }
    public function index()
    {
        return $this->ok_response(User::all()->select(["id","name","username"]));
    }
    public function edit(Request $request)
    {
        $model = User::query()->where("id",$request->get("id"))->first();
        if (empty($model)){
            return $this->bad_response("更新失败");
        }
        $model->update([
            'name' => $request->get("name"),
            'username' => $request->get("username"),
            'password' => Hash::make($request->get("password")),
        ]);
        return $this->ok_response();
    }
    public function delete(Request $request)
    {
        $model=User::query()->where("id",$request->get("id"))->first();
        if (!empty($model)){
            $model->delete();
            return $this->ok_response();
        }
        return $this->bad_response("删除失败");
    }
}
