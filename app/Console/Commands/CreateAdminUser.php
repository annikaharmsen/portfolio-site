<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {--first_name=} {--last_name=} {--email=} {--password=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating a new admin user...');

        $firstName = $this->option('first_name') ?? $this->ask('First name');
        $lastName = $this->option('last_name') ?? $this->ask('Last name');
        $email = $this->option('email') ?? $this->ask('Email');
        $password = $this->option('password') ?? $this->secret('Password');
        $passwordConfirmed = false;

        // Get password confirmation
        while (! $passwordConfirmed) {
            $passwordConfirmed = $this->secret('Confirm Password') === $password;
        }

        $validator = Validator::make([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'password' => $password,
        ], [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Password::defaults()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return Command::FAILURE;
        }

        try {
            $user = User::create([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]);

            $this->info("Admin user '{$user->first_name} {$user->last_name}' created successfully!");
            $this->line("Email: {$user->email}");
            $this->line('You can now log in with these credentials.');

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('Failed to create user: '.$e->getMessage());

            return Command::FAILURE;
        }
    }
}
