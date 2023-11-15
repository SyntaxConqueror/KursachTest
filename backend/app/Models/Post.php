<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $guarded = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function reposts() {
        return $this->hasMany(Repost::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
