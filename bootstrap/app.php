<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->validateCsrfTokens(except: [
            "api/*"
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions){
        $exceptions->render(function (NotFoundHttpException $e,Request $request){
            return response()->json([
                "message" =>$e->getMessage(),
                "code"=>404,
                "data"=>[]
            ], Response::HTTP_OK);
        });
    })
    ->withExceptions(function (Exceptions $exceptions):void {
        $exceptions->respond(function (Response $response)  {
            if ($response->getStatusCode() === Response::HTTP_UNAUTHORIZED) {
                return response()->json([
                    "message" =>"请登录！",
                    "code"=>Response::HTTP_UNAUTHORIZED,
                    "data"=>[]
                ], Response::HTTP_UNAUTHORIZED);
            }
            if ($response->getStatusCode() !== 200 and $response->getStatusCode() !== 401  and !env("APP_DEBUG")) {
                return response()->json([
                    "message" =>$response->getContent(),
                    "code"=>$response->getStatusCode(),
                    "data"=>[]
                ], Response::HTTP_OK);
            }
            return $response;
        });
    })
    ->create();
