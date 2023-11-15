<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersPostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(100)->create();
        foreach($users as $user) {
            Post::factory()->count(5)->state([
                'user_id'=>$user->id
            ])->create();
        }
    }
}
