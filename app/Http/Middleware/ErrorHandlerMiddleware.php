<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ErrorHandlerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $next($request);
        }catch (\Exception $exception){
            return response()->json([
                "code"=>$exception->getCode(),
                "message"=>$exception->getMessage(),
                "data"=>[]],Response::HTTP_OK);

        }
        return $next($request);
    }
}
