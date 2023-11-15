<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RepostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::get('getPosts', [PostController::class, 'getPosts']);
Route::get('getMostPosts/{param}', [PostController::class, 'getMostPosts']);



Route::middleware(
    ['auth:api']
)->group(function() {
    Route::get('getAccount', [AuthController::class, 'getAccount']);
    Route::get('getUserPosts/{user_id}', [PostController::class, 'getUserPosts']);

    Route::post('createPost', [PostController::class, 'createPost']);

    Route::get('logout', [AuthController::class, 'logout']);

    Route::post('like', [LikeController::class, 'toogleLike']);
    Route::post('repost', [RepostController::class, 'toogleRepost']);

    Route::get('getComments/{post_id}', [CommentController::class, 'getCommentsByPostId']);
    Route::post('comment', [CommentController::class, 'createComment']);
});
