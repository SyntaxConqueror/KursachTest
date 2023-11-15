<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Repost>
 */
class RepostFactory extends Factory
{
    public $user_id;
    public $post_id;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->user_id,
            'post_id' => $this->post_id,
        ];
    }
}
