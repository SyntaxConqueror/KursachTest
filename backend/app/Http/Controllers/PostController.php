<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Repost;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function getPosts(): \Illuminate\Http\JsonResponse
    {
        $posts = Post::withCount(['likes', 'reposts', 'comments'])
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate(25);

        $reposts = Repost::with([
            'post' => function ($query) {
                $query->with('user')->get();
            }, 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate(25);

        $mergedPosts = $posts->merge($reposts)->sortByDesc('created_at')->map(function ($item) {
            return $item->toArray();
        })->values()->all();

        return response()->json($mergedPosts);
    }

    public function getUserPosts($user_id){

        $posts = Post::withCount(['likes', 'reposts', 'comments'])
            ->with(['user'])
            ->where('user_id', $user_id)
            ->paginate(25);

        $reposts = Repost::with([
            'post' => function ($query) use ($user_id) {
                $query->with('user')->get();
            },
            'user'
        ])->where('user_id', $user_id)->paginate(25);;

        $mergedPosts = $posts->merge($reposts)->sortByDesc('created_at')->map(function ($item) {
            return $item->toArray();
        })->values()->all();

        return response()->json($mergedPosts);
    }

    public function getMostPosts ($param): \Illuminate\Http\JsonResponse
    {
        $mostPosts = Post::withCount(['likes', 'reposts', 'comments'])
            ->orderBy($param.'_count', 'desc')
            ->with(['user'])
            ->take(2)
            ->get();

        return response()->json($mostPosts);
    }

    public function createPost(Request $request) {
        $postData = [
            'user_id'=> $request->user_id,
            'content' => $request->input('content'),
        ];

        $post = Post::create($postData);
        $post->load('user');
        $post->loadCount(['likes', 'reposts', 'comments']);

        return response()->json([
            'post' => $post,
            'message' => 'Post is successfully created!'
        ]);
    }
}
