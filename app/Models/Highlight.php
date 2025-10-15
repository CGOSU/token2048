<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Highlight extends Model
{
    protected $table="highlight";
    protected $fillable=["name","img"];
}
