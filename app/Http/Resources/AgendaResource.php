<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgendaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "category"=>optional($this->category)->title,
            "power_by"=>optional($this->powerBy)->id,
            "title"=>$this->title,
            "highlight"=>optional($this->highlight)->id,
            "speakers"=>$this->speaker_ids,
            "event_type"=>$this->event_type,
            "start_end"=>$this->start_end,
            "card_time"=>$this->card_time,
            "duration"=>$this->duration,
            "moderator"=>optional($this->moderator)->name,
        ];
    }
}
