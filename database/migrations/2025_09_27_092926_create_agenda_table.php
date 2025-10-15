<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agenda', function (Blueprint $table) {
            $table->id();
            $table->comment("单议程表");
            $table->bigInteger("category_id")->default(0)->unsigned();
            $table->json("speaker_ids")->nullable()->comment("参会人员 id");
            $table->bigInteger("moderator_id")->nullable()->default(0)->comment("主持人 id");
            $table->timestamps();
            $table->bigInteger("highlight_id")->default(0)->comment("加密方");
            $table->bigInteger("powered_by_id")->default(0)->comment("");
            $table->string("start_end");
            $table->string("event_type");
            $table->string("title")->comment("议程名称");
            $table->string("duration")->nullable()->comment("时长");
            $table->string("card_time")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agenda');
    }
};
