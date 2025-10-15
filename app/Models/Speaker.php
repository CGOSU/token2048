<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Casts\Attribute;
class Speaker extends Model
{
    protected $table = 'speaker';
    protected $fillable=["name","avatar","company","x","linkedin","job_title"];
    public function avatar():Attribute
    {
        return Attribute::make(
            get: fn($value)=>str_replace('\\', '/', URL::to($value))
        );
    }
}
