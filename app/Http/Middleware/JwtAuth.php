<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            return $next($request);
        }
        return response()->json([
            "message" => "Unauthenticated.",
            "code" => Response::HTTP_UNAUTHORIZED,
            "data" => null
        ],401);
    }
}
