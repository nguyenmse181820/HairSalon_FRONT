import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGift, faTicket } from '@fortawesome/free-solid-svg-icons';
import RewardBanner from '../assets/Reward/reward_banner.png';

export default function RewardPage() {
    return (
        <div className="reward-page bg-white font-sans">
            {/* Header Section */}
            <div className="flex relative w-full h-auto sm:h-48 md:h-64 lg:h-auto">
                <img
                    src={RewardBanner}
                    alt="Reward Banner"
                    className="object-cover w-full h-auto"
                />
                <div className="flex absolute inset-0 justify-center items-center">
                    <h1 className="absolute inset-0 text-gray-600 flex items-center 
                    font-semibold italic justify-center text-2xl sm:text-3xl md:text-5xl font-montserrat w-full uppercase text-center">
                        reward
                    </h1>
                </div>
            </div>

            {/* Ways to Earn Rewards Section */}
            <div className="my-8 text-center">
                <h2 className="text-2xl font-semibold uppercase">Ways to Earn Rewards</h2>
                <p className="mt-4">Become a member for rewards: <strong>100 points</strong></p>
                <p>Place an order: <strong>10 points</strong> for every $1 spent</p>
            </div>

            {/* What Can Be Redeemed Section */}
            <div className="my-8 text-center">
                <h2 className="text-2xl font-semibold uppercase">What Can Be Redeemed</h2>
                <p className="mt-4">1000 points = $10 off</p>
                <p>2000 points = $20 off</p>
                <p>3000 points = $30 off</p>
            </div>

            {/* Detailed Instructions */}
            <div className="my-8 px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
                    <FontAwesomeIcon icon={faUser} className="text-4xl mb-2 text-blue-500" />
                    <h3 className="text-lg font-semibold">Become a member</h3>
                    <p className="mt-2 text-gray-600">Join our Tribe Rewards program by clicking the “Rewards” star icon at the bottom of the screen. Get 100 points just for signing up!</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
                    <FontAwesomeIcon icon={faGift} className="text-4xl mb-2 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Earn Rewards</h3>
                    <p className="mt-2 text-gray-600">Earn points effortlessly! Collect 10 points for every $1 you spend. Need help? Contact us at support@harmony.com.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
                    <FontAwesomeIcon icon={faTicket} className="text-4xl mb-2 text-red-500" />
                    <h3 className="text-lg font-semibold">Access Voucher</h3>
                    <p className="mt-2 text-gray-600">Already have an account? Sign in to check your points and keep earning while you shop. Create an account to start earning rewards!</p>
                </div>
            </div>
        </div>
    );
}
