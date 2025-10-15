<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSpeakerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(){
        return [
            "name"=>"required",
            "avatar"=>"required",
            "company"=>"max:255",
            "x"=>"max:255",
            "linkedin"=>"max:255",
            "job_title"=>"required",
        ];
    }
    public function attributes()
    {
        return [
            "name"=>"姓名",
            "avatar"=>"头像",
            "company"=>"公司",
            "x"=>"推特",
            "job_title"=>"职位",
            "linkedin"=>"领英"
        ];
    }
}
