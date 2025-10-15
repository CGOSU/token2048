<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends BaseController
{
    public function index(Request $request)
    {
        $file = $request->file('file');
        if ($request->isMethod("post") and $file->isValid()) {
            $name=Str::finish(Str::random(32),".".$file->getClientOriginalExtension());
            Upload::create([
                "name" => $name,
            ]);
            $path=$file->storeAs("upload",$name);
            return $this->ok_response(Storage::url($path));
        }
        return $this->bad_response("上传失败");
    }

}
