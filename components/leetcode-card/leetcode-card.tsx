/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Medal, Trophy, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { UserData } from "@/lib/types";
import { Button } from "../ui/button";

export default function LeetCodeStatsCard({ data }: { data: UserData | null }) {
  const handleDownload = () => {
    const cardElement = document.getElementById("card-content");

    if (cardElement) {
      html2canvas(cardElement, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
        logging: true,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, "LeetCode_Stats_Card.png");
          } else {
            console.error("Failed to generate image blob");
          }
        });
      });
    }
  };
  return (
    <>
      {data ? (
        <>
          <Card
            id="card-content"
            className="w-full rounded-none max-w-3xl mt-8 mx-auto overflow-hidden bg-gradient-to-br from-[#f59e0b] via-[#f97316] to-[#ea580c] text-white shadow-xl"
          >
            <div className="p-6 md:p-8 backdrop-blur-sm bg-white/10">
              {/* Profile Section */}
              <CardHeader className="flex flex-col md:flex-row items-center mb-6 p-0">
                <img
                  src={data.profilePicture}
                  alt={data.username}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6"
                />
                <div className="text-center md:text-left">
                  <CardTitle className="text-3xl font-bold mb-2">
                    {data.username}
                  </CardTitle>
                  <CardDescription className="text-xl text-white opacity-90">
                    Rank: #{data.ranking}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Problem Solving Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6 text-center">
                  <ProblemTypeCard
                    type="Total"
                    solved={data.totalSolved}
                    total={3395}
                    bgColor="bg-[#3182ce]"
                  />
                  <ProblemTypeCard
                    type="Easy"
                    solved={data.easySolved}
                    total={844}
                    bgColor="bg-[#00b8a3]"
                  />
                  <ProblemTypeCard
                    type="Medium"
                    solved={data.mediumSolved}
                    total={1771}
                    bgColor="bg-[#ffc01e]"
                  />
                  <ProblemTypeCard
                    type="Hard"
                    solved={data.hardSolved}
                    total={780}
                    bgColor="bg-[#ff375f]"
                  />
                </div>
              </div>

              {/* Contest Performance */}
              {data.userContestRanking && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Contest Performance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <StatItem
                      icon={<Users />}
                      label="Contests Attended"
                      value={data.userContestRanking.attendedContestsCount}
                    />
                    <StatItem
                      icon={<Trophy />}
                      label="Contest Rating"
                      value={data.userContestRanking.rating}
                    />
                    <StatItem
                      icon={<Medal />}
                      label="Global Ranking"
                      value={`#${data.userContestRanking.globalRanking}`}
                    />
                    <StatItem
                      icon={<Users />}
                      label="Top Percentage"
                      value={`${data.userContestRanking.topPercentage}%`}
                    />
                  </div>
                </div>
              )}

              {/* Submission Distribution */}
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Submission Distribution
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.submissionDistribution}>
                      <XAxis dataKey="language" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Bar dataKey="count" fill="#ffc01e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
          <div>
            <Button className="fixed right-10 top-10" onClick={handleDownload}>
              Download card
            </Button>
          </div>
        </>
      ) : (
        <Card className="max-w-3xl w-full mx-auto mt-6">
          <CardHeader>
            <CardTitle>Enter your user name</CardTitle>
            <CardDescription>
              When you enter username only then we will be able to fetch your
              data.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
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
