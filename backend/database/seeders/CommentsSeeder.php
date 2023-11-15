<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $posts = Post::all();

        foreach ($posts as $post){
            $postData = Post::with('likes')->find($post->id);
            $users_likes = $postData->likes->pluck('user_id');

            foreach ($users_likes as $user_id){
                Comment::factory()->state([
                    'user_id'=>$user_id,
                    'post_id'=>$post->id
                ])->create();
            }
        }

    }
}
