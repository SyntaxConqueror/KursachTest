<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toogleLike (Request $request) {

        $like = Like::where('post_id', $request->post_id)
            ->where('user_id', $request->user_id)
            ->first();

        $post = Post::where('id', $request->post_id)->withCount('likes')->get();

        if ($like) {
            $like->delete();
            return response()->json([
                'action' => 'removed',
                'post' => $post[0],
                'message' => 'Like removed successfully'
            ]);
        } else {
            Like::create( ['user_id'=>$request->user_id, 'post_id'=>$request->post_id] );
            return response()->json([
                'action' => 'added',
                'post' => $post[0],
                'message' => 'Like added successfully'
            ]);
        }
    }

}
