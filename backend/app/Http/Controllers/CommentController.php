<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getCommentsByPostId ($post_id) {
        $comments = Comment::where('post_id', $post_id)->with('user')->orderBy('created_at', 'desc')->get();
        return $comments;
    }

    public function createComment(Request $request) {
        $commentData = [
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'content' => $request->input('content'),
        ];
        $comment = Comment::create($commentData);
        $comment->load('user');

        return response()->json($comment);
    }
}
