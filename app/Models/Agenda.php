<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Agenda extends Model
{
    protected $table = "agenda";


    public function speakerIds():Attribute
    {
        return Attribute::make(
            get: function ($value){
                if (!empty($value)){
                    return Speaker::query()->whereIn("id",json_decode($value))->pluck("name");

                }
                return [];
            },
            set: function ($value){
                if (empty($value)){
                    return [];
                }
                return json_decode($value);
        }
        );
    }
    public function powerBy():HasOne
    {
        return $this->hasOne(PowerBy::class,"id","power_by_id")->withDefault();
    }
    public function moderator():HasOne
    {
        return $this->hasOne(Speaker::class,"id","moderator_id");
    }
    public function highlight():HasOne
    {
        return $this->hasOne(Highlight::class,"id","highlight_id")
            ->select("name");
    }
    public function power_by():Attribute{
        return Attribute::make(
            get: function ($value){
                if (!empty($value)){
                    return $this->powerBy->name;
                }
                return "";
            }
        );

    }
    public function category():HasOne{
        return $this->hasOne(Category::class,"id","category_id")->withDefault();
    }
}
