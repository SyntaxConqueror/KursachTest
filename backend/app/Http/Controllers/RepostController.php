<?php

namespace App\Http\Controllers;

use App\Models\Repost;
use Illuminate\Http\Request;

class RepostController extends Controller
{
    public function toogleRepost (Request $request){
        $repost = Repost::where('post_id', $request->post_id)
            ->where('user_id', $request->user_id)
            ->first();

        if ($repost) {
            $repost->delete();

            return response()->json([
                'action' => 'removed',
                'repost' => $repost,
                'message' => 'Repost removed successfully'
            ]);
        } else {
            $repost = Repost::create( ['user_id'=>$request->user_id, 'post_id'=>$request->post_id] );
            $repost->load(['post' => function ($query) {
                $query->with('user')->get();
            }, 'user']);

            return response()->json([
                'action' => 'added',
                'repost' => $repost,
                'message' => 'Repost added successfully'
            ]);
        }
    }
}
