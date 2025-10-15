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
        Schema::create("page_content", function (Blueprint $table) {
            $table->id();
            $table->bigInteger("page_id")->unsigned();
            $table->string("name")->comment("内容名称");
            $table->timestamp("start")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
