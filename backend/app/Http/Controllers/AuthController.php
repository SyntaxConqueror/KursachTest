<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;
use function Laravel\Prompts\password;

class AuthController extends Controller
{
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['token' => $token, 'message' => 'Authorization is successful!']);
    }

    public function register(Request $request) {
        try{
            $request->validate([
                'name'=>'required|string|max:100|min:6',
                'nickname' => 'required|unique:users|max:100|min:3',
                'email' => 'required|email|unique:users',
                'password'=>'required|string|min:6',
            ]);
        } catch (\Exception $err) { return response()->json(['message' => 'Some problem with user data!']); }

        $avatar_url = '';
        if($request->file('avatar_file')){
            $avatar_url = $request->file('avatar_file')->store('avatars', 'public');
        }

        $userData = [
            'name' => $request->name,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar_url' => $avatar_url,
        ];

        $user = User::create($userData);
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token,
        ], 200);

    }

    public function getAccount()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60 //mention the guard name inside the auth fn
        ]);
    }

}
