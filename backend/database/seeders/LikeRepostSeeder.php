<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Post;
use App\Models\Repost;
use App\Models\User;
use Database\Factories\LikeFactory;
use Faker\Generator as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeRepostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $faker = new Faker();
        $posts = Post::all();
        $userIds = User::pluck('id')->toArray();

        foreach ($posts as $post) {
            $like_amount = $faker->numberBetween(0, 100);
            $repost_amount = $faker->numberBetween(0, 100);

            for($i = 0; $i < $like_amount; $i++){
                Like::factory()->state(function () use ($post, $userIds, $i) {
                    return [
                        'user_id' => $userIds[$i],
                        'post_id' => $post->id,
                    ];
                })->create();
            }

            for($i = 0; $i < $repost_amount; $i++) {
                Repost::factory()->state(function () use ($post, $userIds, $i) {
                    return [
                        'user_id' => $userIds[$i],
                        'post_id' => $post->id,
                    ];
                })->create();
            }
        }
    }
}
