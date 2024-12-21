/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Medal, Target, Trophy } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const dummyData = {
  username: "CodeMaster42",
  profilePicture: "https://picsum.photos/200",
  ranking: 10542,
  totalSolved: 543,
  easySolved: 203,
  mediumSolved: 254,
  hardSolved: 86,
  acceptanceRate: 67.8,
  contestRating: 1856,
  contestRanking: 15234,
  totalSubmissions: 1205,
  submissionDistribution: [
    { language: "Python", count: 450 },
    { language: "JavaScript", count: 350 },
    { language: "Java", count: 250 },
    { language: "C++", count: 155 },
  ],
};

export default function LeetCodeStatsCard() {
  return (
    <Card className="w-full max-w-3xl mt-8 mx-auto overflow-hidden bg-gradient-to-br from-[#f59e0b] via-[#f97316] to-[#ea580c] text-white shadow-xl">
      <div className="p-6 md:p-8 backdrop-blur-sm bg-white/10">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={dummyData.profilePicture}
            alt={dummyData.username}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{dummyData.username}</h2>
            <p className="text-xl opacity-90">Rank: #{dummyData.ranking}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatItem
            icon={<Check />}
            label="Total Solved"
            value={dummyData.totalSolved}
          />
          <StatItem
            icon={<Target />}
            label="Acceptance Rate"
            value={`${dummyData.acceptanceRate}%`}
          />
          <StatItem
            icon={<Trophy />}
            label="Contest Rating"
            value={dummyData.contestRating}
          />
          <StatItem
            icon={<Medal />}
            label="Contest Ranking"
            value={`#${dummyData.contestRanking}`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <ProblemTypeCard
              type="Easy"
              solved={dummyData.easySolved}
              total={455}
              bgColor="bg-[#00b8a3]"
            />
            <ProblemTypeCard
              type="Medium"
              solved={dummyData.mediumSolved}
              total={999}
              bgColor="bg-[#ffc01e]"
            />
            <ProblemTypeCard
              type="Hard"
              solved={dummyData.hardSolved}
              total={399}
              bgColor="bg-[#ff375f]"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Contest Progress</h3>
          <Progress value={dummyData.contestRating / 30} className="h-4" />
          <p className="text-sm mt-2 text-center">
            Current: {dummyData.contestRating} / Next Badge: 2000
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Submission Distribution
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyData.submissionDistribution}>
                <XAxis dataKey="language" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Bar dataKey="count" fill="#ffc01e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
      <div className="mr-3 text-2xl">{icon}</div>
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function ProblemTypeCard({
  type,
  solved,
  total,
  bgColor,
}: {
  type: string;
  solved: number;
  total: number;
  bgColor: string;
}) {
  const percentage = (solved / total) * 100;
  return (
    <div className={`${bgColor} rounded-lg p-3 text-white`}>
      <h4 className="font-semibold mb-1">{type}</h4>
      <p className="text-2xl font-bold mb-1">
        {solved}/{total}
      </p>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
